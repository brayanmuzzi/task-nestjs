import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { FindAllParameters, TaskDto, TaskRouteParameters } from './task.dto';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/auth/auth.guard';
import {
  ApiOperation,
  ApiOkResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @ApiOperation({ summary: 'Create task in database' })
  @ApiOkResponse({ description: 'Task was created.' })
  @ApiNotFoundResponse({ description: 'Task cannot be created.' })
  @Post()
  async create(@Body() task: TaskDto): Promise<TaskDto> {
    return await this.taskService.create(task);
  }

  @ApiOperation({ summary: 'Find task by id' })
  @ApiOkResponse({ description: 'Task was found.' })
  @ApiNotFoundResponse({ description: 'Task cannot be found.' })
  @Get('/:id')
  async findById(@Param('id') id: string): Promise<TaskDto> {
    return this.taskService.findById(id);
  }

  @ApiOperation({ summary: 'Find all tasks by id' })
  @ApiOkResponse({ description: 'All tasks was found.' })
  @ApiNotFoundResponse({ description: 'Tasks cannot be found.' })
  @Get()
  async findAll(@Query() params: FindAllParameters): Promise<TaskDto[]> {
    return this.taskService.findAll(params);
  }

  @ApiOperation({ summary: 'Update task by id' })
  @ApiOkResponse({ description: 'Task was updated.' })
  @ApiNotFoundResponse({ description: 'Tasks cannot be updated.' })
  @Put('/:id')
  async update(@Param() params: TaskRouteParameters, @Body() task: TaskDto) {
    await this.taskService.update(params.id, task);
  }

  @ApiOperation({ summary: 'Delete task by id' })
  @ApiOkResponse({ description: 'Task was deleted.' })
  @ApiNotFoundResponse({ description: 'Tasks cannot be deleted.' })
  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
