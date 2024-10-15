import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumberString,
  IsNumber,
  IsPositive,
  IsOptional
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {

  @ApiProperty({ description: 'The name of the customer' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'The email of the customer' })
  @IsString()
  @IsNotEmpty()
  lastName: string;


}

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) { }