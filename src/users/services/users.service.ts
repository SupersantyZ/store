import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pg';

import { User } from '../entities/users.entity';
import { Order } from '../entities/order.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ProductService } from '../../products/services/product.service';
import { CustomerService } from './customer.service';
@Injectable()
export class UsersService {
  constructor(
    private productService: ProductService,
    private configService: ConfigService,
    @Inject('PG') private clientPg: Client,
    @InjectRepository(User) private userRepository: Repository<User>,
    private customerService: CustomerService
  ) { }

  // private counterId = 1;
  // private users: User[] = [
  //   {
  //     id: 0,
  //     name: 'string',
  //     email: 'string',
  //     password: 'string',
  //   },
  // ];

  findAll() {
    const apiKey = this.configService.get('API_KEY');
    const dbName = this.configService.get('DATABASE_NAME');
    console.log(apiKey, dbName,);

    return this.userRepository.find({
      relations: ['customer'],
    });
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    } else {
      return user;
    }

  }

  async create(data: CreateUserDto) {
    const newUser = this.userRepository.create(data);
    if (data.customerId) {
      const customer = await this.customerService.findOne(data.customerId);
      newUser.customer = customer;
    }
    return this.userRepository.save(newUser);
  }

  async update(id: number, payload: UpdateUserDto) {
    const user = await this.findOne(id);
    if (user) {
      const updateUser = this.userRepository.merge(user, payload);
      return this.userRepository.save(updateUser);
    } else {
      throw new NotFoundException(`User #${id} not found`);
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
  async getOrderByUser(id: number) {
    const user = this.findOne(id);
    return {
      date: new Date(),
      user,
      products: await this.productService.findAll(),
    };
  }
  getTasks() {
    return new Promise((resolve, reject) => {
      this.clientPg.query('SELECT * FROM tasks', (err, res) => {
        if (err) {
          console.error('Error en la consulta:', err);
          reject(err);
        } else {
          console.log('Resultado de la consulta:', res);
          resolve(res?.rows);
        }
      })
    })
  }
}
