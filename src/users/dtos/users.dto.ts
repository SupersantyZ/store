import {
  IsString,
  IsNotEmpty,
  IsEmail,
  IsNumber,
  IsPositive,
  IsOptional
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The name of the user' })
  readonly name: string;
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ description: 'The email of the user' })
  readonly email: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The password of the user' })
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: 'The last name of the user' })
  readonly lastName: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'The phone of the user' })
  readonly phone: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ description: 'The address of the user' })
  readonly role: string;

  @IsOptional()
  @IsPositive()
  @ApiProperty({ description: 'The id of the user' })
  readonly customerId: number;

}

export class UpdateUserDto extends PartialType(CreateUserDto) { }
