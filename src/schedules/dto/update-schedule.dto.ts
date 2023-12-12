import { PartialType } from '@nestjs/mapped-types';
import { CreateScheduleDto } from './create-schedule.dto';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateScheduleDto extends PartialType(CreateScheduleDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  customerName?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  service?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  price?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  day?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  month?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  year?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  hour?: string;
}
