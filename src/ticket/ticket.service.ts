import _ from 'lodash';
import { Repository } from 'typeorm';

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Ticket } from './entities/ticket.entity';
import { Show } from 'src/show/entities/show.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
  ) {}

  async getTicketByShowId(showId: number) {
    return await this.ticketRepository.findBy({
      show_id: showId,
    });
  }

  async createTicket(showId: number, userId: number) {
    const show = await this.showRepository.findOne({
      where: {
        id: showId,
      },
    });
    if (!show) {
      throw new NotFoundException('해당 ID의 공연을 찾을 수 없습니다.');
    }

    const showPrice = show.price;
    if (showPrice > 50000) {
      throw new Error('공연 가격은 5만 포인트 이하여야 합니다.');
    }

    const user = await this.userRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new NotFoundException('해당 ID의 유저를 찾을 수 없습니다.');
    }

    const userPoints = user.point;
    if (userPoints < showPrice) {
      throw new Error('유저의 포인트가 공연 가격보다 부족합니다.');
    }

    await this.ticketRepository.save({
      show: show,
      user: user,
      show_price: showPrice.toString(),
    });
  }

  async updateTicket(id: number, userId: number) {
    await this.verifyTicket(id, userId);
    await this.ticketRepository.update({ id }, {});
  }

  async deleteTicket(id: number, userId: number) {
    await this.verifyTicket(id, userId);
    await this.ticketRepository.delete({ id });
  }

  private async verifyTicket(id: number, userId: number) {
    const ticket = await this.ticketRepository.findOneBy({
      id,
    });

    if (_.isNil(ticket) || ticket.user_id !== userId) {
      throw new NotFoundException(
        '공연을 찾을 수 없거나 수정/삭제할 권한이 없습니다.',
      );
    }
  }
}
