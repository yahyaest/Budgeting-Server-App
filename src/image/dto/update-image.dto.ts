import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateImageDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  url: string;

  @IsInt()
  @IsOptional()
  userId: number;
}
