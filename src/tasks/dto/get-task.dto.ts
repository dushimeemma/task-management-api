import { IsEnum, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class GetTaskDto {
  @IsOptional()
  @IsString()
  search: string;
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
