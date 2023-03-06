import { IsOptional, IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsOptional()
  @IsString()
  name: string;
  
  @IsString()
  @IsOptional()
  description: string;
}
