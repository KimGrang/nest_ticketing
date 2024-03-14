import { User } from 'src/user/entities/user.entity';

import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserInfo } from '../utils/userInfo.decorator';
import { TicketService } from './ticket.service';

@UseGuards(AuthGuard('jwt'))
@Controller('Ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @Get(':showId')
  async getAllTickets(@Param('showId') showId: number) {
    return await this.ticketService.getTicketByShowId(showId);
  }

  @Post(':showId')
  async createTicket(@UserInfo() user: User, @Param('showId') showId: number) {
    await this.ticketService.createTicket(showId, user.id);
  }

  @Patch(':id')
  async updateTicket(@UserInfo() user: User, @Param('id') id: number) {
    await this.ticketService.updateTicket(id, user.id);
  }

  @Delete(':id')
  async deleteTicket(@UserInfo() user: User, @Param('id') id: number) {
    await this.ticketService.deleteTicket(id, user.id);
  }
}
