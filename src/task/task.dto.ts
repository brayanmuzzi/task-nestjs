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
  @ApiProperty({
    type: String,
    description: `Task id`,
    example: ['id'],
  })
  @IsOptional()
  id: string;

  @IsString()
  @MinLength(3)
  @ApiProperty({
    type: String,
    description: `Task title`,
    example: ['title'],
  })
  @MaxLength(256)
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    description: `A description for a task`,
    example: ['This is a task'],
  })
  @MinLength(3)
  @MaxLength(256)
  description: string;

  @IsEnum(TaskStatusEnum)
  @ApiProperty({
    type: String,
    description: `A status for tasks that can be TO_DO, IN_PROGRESS and DONE.`,
    example: ['TO_DO'],
  })
  @IsOptional()
  status: string;

  @IsDateString()
  @ApiProperty({
    type: Date,
    description: `Time for task expires or be finished`,
    example: ['Date'],
  })
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
