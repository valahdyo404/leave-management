import { IsNotEmpty, IsString, IsDateString } from 'class-validator';

export class CreateLeaveDto {
  @IsNotEmpty()
  @IsString()
  reason: string;

  @IsNotEmpty()
  @IsDateString()
  startDate: string;

  @IsNotEmpty()
  @IsDateString()
  endDate: string;
}
