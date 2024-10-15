import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UserController } from './controllers/user.controller';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from './services/customer.service';
import { User } from './entities/users.entity';
import { Customer } from './entities/customer.entity';

import { Order } from './entities/order.entity';
import { OrderProducts } from './entities/order-product.entity';

import { ProductsModule } from '../products/products.module';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { OrderProductController } from './controllers/order-product.controller';
import { OrderProductService } from './services/order-product.service';
@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customer, User, Order, OrderProducts])
  ],
  controllers: [
    UserController,
    CustomerController,
    OrdersController,
    OrderProductController
  ],
  providers: [
    UsersService,
    CustomerService,
    OrdersService,
    OrderProductService
  ],
})
export class UsersModule { }
