import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Brand } from '../entities/brand.entity';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/Brand.dto';

@Injectable()
export class BrandService {

  constructor(
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>
  ) { }

  async findAll(): Promise<Brand[]> {
    return await this.brandRepository.find();
  }

  async findOne(id: number) {
    const brand = await this.brandRepository.findOne({
      relations: ['products'],
    });

    if (brand) {
      return brand;
    } else {
      console.log("esto no existe");
      throw new NotFoundException(`brand #${id} not found`);
    }
  }

  create(data: CreateBrandDto) {
    const newbrand = this.brandRepository.create(data);
    // const newbrand = new brand();
    // newbrand.name = data.name;
    // newbrand.description = data.description;
    // newbrand.price = data.price;
    // newbrand.stock = data.stock;
    // newbrand.image = data.image;
    return this.brandRepository.save(newbrand);
  }
  remove(id: number) {
    const brand = this.findOne(id);
    if (!brand) {
      throw new NotFoundException(`brand #${id} not found`);
    } else {
      return this.brandRepository.delete(id);
    }

  }

  async update(id: number, changes: UpdateBrandDto) {
    const brand = await this.brandRepository.findOne(id);
    this.brandRepository.merge(brand, changes);
    return this.brandRepository.save(brand);
  }
}
