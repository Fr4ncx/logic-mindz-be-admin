import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class CreateCustomerDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @IsString()
    address: string;

    @ApiProperty()
    @IsString()
    vatNumber: string;
}

