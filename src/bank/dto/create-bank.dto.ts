import {ApiProperty} from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class CreateBankDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  iban: string;

  @ApiProperty()
  @IsString()
  bic: string;
}

