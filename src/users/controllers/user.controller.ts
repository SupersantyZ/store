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
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/users.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { Order } from '../entities/order.entity';

@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private userService: UsersService) { }

  @Get()
  getAll() {
    return this.userService.findAll();
  }

  @Get('tasks')
  getTasks() {
    return this.userService.getTasks();
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(+id);
  }

  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getOrderByUser(+id);
  }
  @Post()
  create(@Body() payload: CreateUserDto) {
    return this.userService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateUserDto) {
    return this.userService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
