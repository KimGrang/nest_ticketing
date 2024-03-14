import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'shows',
})
export class Show {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', unique: true, nullable: false })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'varchar', array: true, nullable: false })
  dates: Date[];

  @Column({ type: 'varchar', nullable: false })
  place: string;

  @Column({ type: 'text', nullable: false })
  seatInformation: string;

  @Column({ type: 'number', nullable: false })
  price: number;

  @Column({ type: 'varchar', nullable: true })
  image: string;

  @Column({ type: 'varchar', nullable: false })
  category: string;

  @OneToMany(() => Ticket, (ticket) => ticket.show)
  ticket: Ticket[];
}