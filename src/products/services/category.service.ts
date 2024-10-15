import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Category } from '../entities/category.entity';
import { CreateCategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { BrandService } from './brand.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    private brandService: BrandService
  ) { }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['products'],
    });

    if (category) {
      return category;
    } else {
      console.log("esto no existe");
      throw new NotFoundException(`category #${id} not found`);
    }
  }

  async create(data: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(data);
    // const newcategory = new category();
    // newcategory.name = data.name;
    // newcategory.description = data.description;
    // newcategory.price = data.price;
    // newcategory.stock = data.stock;
    // newcategory.image = data.image;

    return this.categoryRepository.save(newCategory);
  }
  remove(id: number) {
    const category = this.findOne(id);
    if (!category) {
      throw new NotFoundException(`category #${id} not found`);
    } else {
      return this.categoryRepository.delete(id);
    }

  }

  async update(id: number, changes: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOne(id);
    this.categoryRepository.merge(category, changes);
    return this.categoryRepository.save(category);
  }
}
