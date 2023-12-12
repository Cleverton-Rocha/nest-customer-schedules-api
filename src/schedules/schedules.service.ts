import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateScheduleDto } from './dto/create-schedule.dto';
import { UpdateScheduleDto } from './dto/update-schedule.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Schedule } from './entities/schedule.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SchedulesService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async createSchedule(
    createScheduleDto: CreateScheduleDto,
  ): Promise<Schedule> {
    const newSchedule = this.scheduleRepository.create(createScheduleDto);
    return this.scheduleRepository.save(newSchedule);
  }

  async findAll(): Promise<Schedule[]> {
    const schedules = this.scheduleRepository.find({
      order: { id: 'ASC' },
    });

    if (!schedules) {
      throw new NotFoundException('Schedules not found.');
    }

    return schedules;
  }

  async findOne(id: number): Promise<Schedule> {
    const schedule = await this.scheduleRepository.findOne({ where: { id } });
    if (!schedule) {
      throw new NotFoundException('Schedule not found.');
    }

    return schedule;
  }

  async updateSchedule(
    id: number,
    newData: UpdateScheduleDto,
  ): Promise<Schedule> {
    const scheduleToUpdate = await this.findOne(id);
    if (!scheduleToUpdate) {
      throw new NotFoundException('Schedule not found');
    }

    this.scheduleRepository.merge(scheduleToUpdate, newData);

    await this.scheduleRepository.save(scheduleToUpdate);
    return scheduleToUpdate;
  }

  async deleteSchedule(id: number): Promise<Schedule> {
    const scheduleToDelete = await this.findOne(id);

    if (!scheduleToDelete) {
      throw new NotFoundException('Schedule not found.');
    }

    await this.scheduleRepository.remove(scheduleToDelete);
    return scheduleToDelete;
  }
}
