import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { SchedulesService } from './schedules.service';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

@Controller('schedules')
export class SchedulesController {
  constructor(private readonly schedulesService: SchedulesService) {}

  @Post('create')
  async createSchedule(@Body() createScheduleDto: CreateScheduleDto) {
    return await this.schedulesService.createSchedule(createScheduleDto);
  }

  @Get('all')
  async getSchedule(): Promise<Schedule[]> {
    return await this.schedulesService.findAll();
  }

  @Get('id/:id')
  async getOneSchedule(@Param('id') id: number): Promise<Schedule> {
    return await this.schedulesService.findOne(id);
  }

  @Get('day/:day')
  async getByDay(@Param('day') day: string): Promise<Schedule> {
    return await this.schedulesService.findByDay(day);
  }

  @Get('hour/:hour')
  async getByHour(@Param('hour') hour: string): Promise<Schedule> {
    return await this.schedulesService.findByHour(hour);
  }

  @Put('update/:id')
  async updateSchedule(
    @Param('id') id: number,
    @Body() newData: UpdateScheduleDto,
  ): Promise<Schedule> {
    return await this.schedulesService.updateSchedule(id, newData);
  }

  @Delete('delete/:id')
  async deleteSchedule(@Param('id') id: number): Promise<Schedule> {
    return await this.schedulesService.deleteSchedule(id);
  }
}
