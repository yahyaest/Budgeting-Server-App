import { IsDate, IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateTransactionDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsDate()
  @IsOptional()
  date: Date;

  @IsInt()
  @IsOptional()
  amount: number;

  @IsInt()
  @IsOptional()
  userId: number;

  @IsInt()
  @IsOptional()
  categoryId: number;

  @IsInt()
  @IsOptional()
  imageId: number;
}
