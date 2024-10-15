import {
  IsNumber,
  IsUrl,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsPositive,

} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the brand' })
  readonly name: string;

  @IsUrl()
  @IsNotEmpty()
  @ApiProperty({ description: 'The image of the brand' })
  readonly image: string;
}

export class UpdateBrandDto extends PartialType(CreateBrandDto) { }
