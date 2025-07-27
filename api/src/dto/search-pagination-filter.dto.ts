import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SearchPaginationFilterDto {
  @IsString()
  @IsNotEmpty()
  q: string;

  @IsInt()
  page: number;

  @IsInt()
  per_page: number;
}
