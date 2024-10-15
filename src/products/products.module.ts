import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductsController } from './controllers/products.controller';
import { ProductService } from './services/product.service';
import { Product } from './entities/product.entity';
import { CategoryService } from './services/category.service';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from './services/brand.service';
import { Category } from './entities/category.entity';
import { Brand } from './entities/brand.entity';
import { CategoriasController } from './controllers/categorias.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Brand, Category])],
  controllers: [ProductsController, CategoriasController, BrandController],
  providers: [ProductService, CategoryService, BrandService],
  exports: [ProductService, TypeOrmModule],
})
export class ProductsModule { }
