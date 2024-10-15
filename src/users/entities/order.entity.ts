import { User } from './users.entity';
import { Product } from '../../products/entities/product.entity';
import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';
import { Customer } from './customer.entity';
import { OrderProducts } from './order-product.entity';

import { Exclude, Expose } from 'class-transformer';
import { isRegularExpressionLiteral } from 'typescript';
import { ApiExpectationFailedResponse } from '@nestjs/swagger';


@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @Exclude()
  @OneToMany(() => OrderProducts, (orderProducts) => orderProducts.order)
  orderProducts: OrderProducts[];

  @Expose()
  get Products() {
    if (this.orderProducts) {
      return this.orderProducts
        .filter((orderProduct) => !!orderProduct)
        .map((orderProduct) => ({
          ...orderProduct.product,
          quantity: orderProduct.quantity,
          productId: orderProduct.product.id
        }));
    }

    return [];
  }

  @Expose()
  get total() {
    if (this.orderProducts) {
      return this.orderProducts
        .filter((orderProduct) => !!orderProduct)
        .reduce((total, orderProduct) => {
          const totalProduct = orderProduct.product.price * orderProduct.quantity;
          return total + totalProduct;
        }, 0);

    }

    return 0;

  }
}
