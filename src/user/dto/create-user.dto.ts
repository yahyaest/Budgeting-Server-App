import { IsEmail, IsInt, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
  
  @IsInt()
  phone:number
}
