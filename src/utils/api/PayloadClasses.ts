import { IsNotEmpty, IsNumber, IsPositive } from 'class-validator';

export class PageInfo {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  pageSize: number;
}
