import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';

@Controller('categories')
export class CategoriasController {
  constructor(private categoryService: CategoryService) { }
  @Get()
  getAll() {
    return this.categoryService.findAll();
  }
  @Post()
  create(@Body() payload: CreateCategoryDto) {
    return this.categoryService.create(payload);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.categoryService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCategoryDto) {
    return this.categoryService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
