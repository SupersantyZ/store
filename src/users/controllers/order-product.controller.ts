import { Controller, Get, Param, Post, Body, Put, Delete } from '@nestjs/common';

import { OrderProductService } from '../services/order-product.service';
import { CreateOrderProductDto, UpdateOrderProductDto } from "../dtos/order-Product.dto";
import { OrdersService } from '../services/orders.service';

@Controller('order-product')
export class OrderProductController {
  constructor(
    private orderProductService: OrderProductService,
    private OrdersService: OrdersService

  ) { }

  @Get()
  findAll() {
    return 'This action returns all order-product';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a #${id} order-product`;
  }

  @Post()
  create(@Body() payload: CreateOrderProductDto) {
    return this.orderProductService.create(payload);
  }
}
