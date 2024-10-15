import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { BrandService } from '../services/brand.service';
import { CreateBrandDto, UpdateBrandDto } from '../dtos/Brand.dto';

@Controller('brand')
export class BrandController {
  constructor(private brandsService: BrandService) { }

  @Get('brands')
  getBrando() {
    return 'sacalacatunga';
  }

  @Get()
  getBrands() {
    return this.brandsService.findAll();
  }

  @Get(':id')
  getBrand(@Param('id') id: string) {
    return this.brandsService.findOne(+id);
  }

  @Post()
  create(@Body() payload: CreateBrandDto) {
    return this.brandsService.create(payload);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateBrandDto) {
    return this.brandsService.update(+id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.brandsService.remove(+id);
  }
}
