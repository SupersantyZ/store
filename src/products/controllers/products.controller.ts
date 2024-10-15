import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
  // ParseIntPipe,
} from '@nestjs/common';
import { ParseIntPipe } from '../../common/parse-int/parse-int.pipe';
import { Response } from 'express';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto
} from '../dtos/products.dto';

@ApiTags('products')
@Controller('products')
export class ProductsController {
  constructor(private productService: ProductService) { }
  @Get()
  @ApiOperation({ summary: 'Get all products' })
  getProducts(
    @Query()
    params: FilterProductsDto,
  ) {
    // return `listado de productos - limit: ${limit}, offset: ${offset}, brand: ${brand}`;
    return this.productService.findAll(params);
  }
  @Get('filtro')
  @ApiOperation({ summary: 'Get all products' })
  getProductFilter() {
    return `yo soy un filtro`;
  }

  @Get(':productId')
  @ApiOperation({ summary: 'Get product by id' })
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('productId', ParseIntPipe) productId: number) {
    return this.productService.findOne(productId);
  }
  //   @Res() response: Response,

  //   ) {
  //   const product = this.productService.findOne(+productId);
  //   if (product) {
  //     return response.status(HttpStatus.ACCEPTED).json(product);
  //   } else {
  //     return response
  //       .status(HttpStatus.NOT_FOUND)
  //       .json({ message: 'Product not found' });
  //   }
  // }

  @Post()
  @ApiOperation({ summary: 'Create product' })
  create(@Body() payload: CreateProductDto) {
    return this.productService.create(payload);
  }

  @Put(':id/category/:categoryId')
  @ApiOperation({ summary: 'Add category for product' })
  addCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryByProduct(id, categoryId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product' })
  update(@Param('id') id: number, @Body() payload: UpdateProductDto) {
    return this.productService.update(+id, payload);
  }
  @Put(':id/category/:categoryId')
  @ApiOperation({ summary: 'Update category for product' })
  updateCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.addCategoryByProduct(id, categoryId);
  }
  @Delete(':id')
  @ApiOperation({ summary: 'Delete product' })
  delete(@Param('id') id: number) {
    return this.productService.remove(id);
  }

  @Delete(':id/category/:categoryId')
  @ApiOperation({ summary: 'Delete category for product' })
  deleteCategoryByProduct(
    @Param('id', ParseIntPipe) id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productService.removeCategoryByProduct(id, categoryId);
  }
}
