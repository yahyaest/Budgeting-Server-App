import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateImageDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsInt()
  @IsOptional()
  userId: number;
}
