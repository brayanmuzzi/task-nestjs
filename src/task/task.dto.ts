import { ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
  IsDateString,
} from 'class-validator';
export enum TaskStatusEnum {
  TO_DO = 'TO_DO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class TaskDto {
  @IsUUID()
  @ApiProperty()
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @ApiProperty()
  @MaxLength(256)
  title: string;

  @IsString()
  @ApiProperty()
  @MinLength(3)
  @MaxLength(256)
  description: string;

  @IsEnum(TaskStatusEnum)
  @ApiProperty()
  @IsOptional()
  status: string;

  @IsDateString()
  @ApiProperty()
  expirationDate: Date;
}

export interface FindAllParameters {
  title: string;
  status: string;
}

export class TaskRouteParameters {
  @IsUUID()
  id: string;
}
