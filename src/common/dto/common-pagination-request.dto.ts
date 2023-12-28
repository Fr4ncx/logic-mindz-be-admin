import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CommonPaginationRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  readonly page: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Number)
  readonly pageSize: number;
}
