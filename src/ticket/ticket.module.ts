import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Ticket } from './entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';
import { Show } from 'src/show/entities/show.entity';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
@Module({
  imports: [TypeOrmModule.forFeature([Ticket, User, Show])],
  providers: [TicketService],
  controllers: [TicketController],
})
export class TicketModule {}
