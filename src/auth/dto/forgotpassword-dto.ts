import { IsNotEmpty } from 'class-validator';

export class forgotPassworDto {
  @IsNotEmpty()
  email: string;
}
