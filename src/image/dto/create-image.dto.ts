import { IsInt, IsString } from 'class-validator';

export class CreateImageDto {
  @IsString()
  title: string;

  @IsString()
  url: string;

  @IsInt()
  userId: number;
}
