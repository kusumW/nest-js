import { IsNotEmpty } from 'class-validator';

export class CreateDepartmentDto {
  id: number;

  @IsNotEmpty()
  department: string;
}
