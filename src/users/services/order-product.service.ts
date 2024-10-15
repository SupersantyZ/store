import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateOrderProductDto, UpdateOrderProductDto } from '../dtos/order-Product.dto';
import { OrderProducts } from '../entities/order-product.entity';
import { Order } from '../entities/order.entity';
import { Product } from '../../products/entities/product.entity';

@Injectable()
export class OrderProductService {

  constructor(
    @InjectRepository(OrderProducts) private orderProductRepo: Repository<OrderProducts>,
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>
  ) { }

  async create(data: CreateOrderProductDto) {
    const order = await this.orderRepo.findOne(data.orderId);
    const product = await this.productRepo.findOne(data.productId);
    const orderProducts = new OrderProducts();
    orderProducts.order = order;
    orderProducts.product = product;
    orderProducts.quantity = data.quantity;
    return this.orderProductRepo.save(orderProducts);
  }
}