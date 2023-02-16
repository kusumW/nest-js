import { IsNotEmpty, IsString } from 'class-validator';

export class UserPhoto {
  @IsNotEmpty()
  @IsString()
  readonly firstName: string;

  @IsNotEmpty()
  @IsString()
  readonly lastName: string;
}