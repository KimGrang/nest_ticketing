import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Show } from '../../show/entities/show.entity';
import { User } from '../../user/entities/user.entity';

@Entity({
  name: 'tickets',
})
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  message: string;

  @ManyToOne(() => User, (user) => user.ticket)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ type: 'bigint', name: 'user_id' })
  user_id: number;

  @ManyToOne(() => Show, (show) => show.ticket, {
    onDelete: 'CASCADE',
  })
  show: Show;

  @Column({ type: 'bigint', name: 'show_id' })
  show_id: number;
}
