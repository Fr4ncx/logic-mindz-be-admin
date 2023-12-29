import { ApiProperty } from "@nestjs/swagger";
import {IsNumber, IsOptional} from "class-validator";

export class GetAllInvoiceDto {
    @ApiProperty()
    @IsOptional()
    @IsNumber()
    pageIndex?: number;

    @ApiProperty()
    @IsOptional()
    @IsNumber()
    pageSize?: number;
}