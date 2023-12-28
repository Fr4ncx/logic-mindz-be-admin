import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
  @ApiProperty()
  index: number;
  @ApiProperty()
  size: number;

  items: TData[];
}

export class PaginatedResponseDto<TData> {
  @ApiProperty()
  status: string;

  @ApiProperty()
  page: PaginatedDto<TData>;
}
