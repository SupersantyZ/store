import {
  IsNumber,
  IsUrl,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsPositive,
  IsArray,
  Min,
  ValidateIf
} from 'class-validator';

import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the product' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The description of the product' })
  readonly description: string;
  @IsNumber()
  @IsPositive()
  @ApiProperty({ description: 'The price of the product' })
  @IsNotEmpty()
  readonly price: number;
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  @ApiProperty({ description: 'The stock of the product' })
  readonly stock: number;
  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'The image of the product' })
  readonly image: string;

  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the brand' })
  @IsPositive()
  readonly brandId: number;

  @IsNotEmpty()
  @ApiProperty({ description: 'The id of the category' })
  @IsArray()
  readonly categoryIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) { }


export class FilterProductsDto {

  @IsOptional()
  @IsPositive()
  limit: number;

  @IsOptional()
  @Min(0)
  offset: number;


  @IsOptional()
  @IsPositive()
  minPrice: number;


  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}