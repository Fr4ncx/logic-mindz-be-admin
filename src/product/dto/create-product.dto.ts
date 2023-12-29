import {ApiProperty} from '@nestjs/swagger';
import {IsNumber, IsString} from 'class-validator';
import {ProductType} from "../schemas/product.schema";

export class CreateProductDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: ProductType;

  @ApiProperty()
  @IsString()
  sku: string;

  @ApiProperty()
  @IsString()
  category: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsNumber()
  price: number;
}

