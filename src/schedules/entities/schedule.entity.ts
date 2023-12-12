import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  customerName: string;

  @Column()
  service: string;

  @Column()
  price: string;

  @Column()
  day: string;

  @Column()
  month: string;

  @Column()
  year: string;

  @Column()
  hour: string;
}
