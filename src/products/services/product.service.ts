import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, FindConditions } from 'typeorm';

import { Product } from '../entities/product.entity';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductsDto
} from '../dtos/products.dto';
import { BrandService } from './brand.service';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';


@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    @InjectRepository(Brand)
    private brandRepository: Repository<Brand>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>
  ) { }

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindConditions<Product> = {};
      const { limit, offset } = params;
      const { minPrice, maxPrice } = params;
      console.log(minPrice, maxPrice)
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepository.find({
        relations: ['brand', 'categories'],
        where,
        take: limit,
        skip: offset
      });
    }
    return this.productRepository.find({
      relations: ['brand']
    });
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne(id, {
      relations: ['brand', 'categories']
    });

    if (product) {
      return product;
    } else {
      console.log("esto no existe");
      throw new NotFoundException(`Product #${id} not found`);
    }
  }

  async create(data: CreateProductDto) {
    const newProduct = this.productRepository.create(data);
    if (data.brandId) {
      const brand = await this.brandRepository.findOne(data.brandId);
      newProduct.brand = brand;
    }
    if (data.categoryIds) {
      const categories = await this.categoryRepository.findByIds(data.categoryIds);
      newProduct.categories = categories;
    }
    return this.productRepository.save(newProduct);
  }
  remove(id: number) {
    const product = this.findOne(id);
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    } else {
      return this.productRepository.delete(id);
    }

  }

  async removeCategoryByProduct(ProductId: number, categoryId: number) {
    const product = await this.findOne(ProductId);
    product.categories = product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepository.save(product);
  }

  async addCategoryByProduct(ProductId: number, categoryId: number) {
    const product = await this.findOne(ProductId);
    const category = await this.categoryRepository.findOne(categoryId);
    product.categories.push(category);
    return this.productRepository.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepository.findOne(id);
    if (changes.brandId) {
      const brand = await this.brandRepository.findOne(changes.brandId);
      product.brand = brand;
    }
    if (changes.categoryIds) {
      const categories = await this.categoryRepository.findByIds(
        changes.categoryIds
      );
      product.categories = categories;
    }
    this.productRepository.merge(product, changes);
    return this.productRepository.save(product);
  }
}

