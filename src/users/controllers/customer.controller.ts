import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { CustomerService } from '../services/customer.service';
import { CreateCustomerDto, UpdateCustomerDto } from '../dtos/customer.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Order } from '../entities/order.entity';

@ApiTags('customers')
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) { }

  @Get()
  getAll() {
    return this.customerService.findAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateCustomerDto) {
    return this.customerService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCustomerDto) {
    return this.customerService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.customerService.remove(+id);
  }
}
