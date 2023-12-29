import {ApiProperty} from '@nestjs/swagger';
import {IsBoolean, IsDate, IsNumber, IsString} from 'class-validator';

export class CreateInvoiceDto {
  @ApiProperty()
  customerId: ObjectId;

  @ApiProperty()
  @IsDate()
  invoiceDate: Date;

  @ApiProperty()
  @IsDate()
  dueDate: Date;

  @ApiProperty()
  @IsString()
  status: string;

  @ApiProperty()
  @IsString()
  referenceNumber: string;

  @ApiProperty()
  @IsBoolean()
  recurring: boolean;

  @ApiProperty()
  productId: ObjectId;

  @ApiProperty()
  @IsNumber()
  qty: number

  @ApiProperty()
  taxId: ObjectId;

  @ApiProperty()
  companyBank: ObjectId;
}

