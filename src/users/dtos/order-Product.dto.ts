import { IsNotEmpty, IsPositive } from "class-validator";
import { ApiProperty, PartialType } from "@nestjs/swagger";


export class CreateOrderProductDto {

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The id of the order' })
  readonly orderId: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The quantity of the product' })
  readonly quantity: number;

  @IsNotEmpty()
  @IsPositive()
  @ApiProperty({ description: 'The price of the product' })
  readonly productId: number;
}

export class UpdateOrderProductDto extends PartialType(CreateOrderProductDto) { }