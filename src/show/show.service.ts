import _ from 'lodash';
import { Repository } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UpdateShowDto } from './dto/update-show.dto';
import { Show } from './entities/show.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/types/userRole.type';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(Show)
    private readonly showRepository: Repository<Show>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<Show[]> {
    return await this.showRepository.find({
      select: ['id', 'name'],
    });
  }

  async findOne(id: number) {
    return await this.verifyShowById(id);
  }

  async create(data: any[]) {
    if (!data) {
      throw new BadRequestException('No data was provided.');
    }

    const createShowPromises = data.map(async (data) => {
      // Check required fields
      if (
        !data.name ||
        !data.description ||
        !data.dates ||
        !data.place ||
        !data.seatInformation ||
        !data.price ||
        !data.image ||
        !data.category
      ) {
        throw new BadRequestException('Missing item exists.');
      }

      const newShow = this.showRepository.create({
        name: data.name,
        description: data.description,
        dates: data.dates,
        place: data.place,
        seatInformation: data.seatInformation, // Corrected typo
        price: data.price,
        category: data.category,
        image: data.image || null,
      });

      await this.showRepository.save(newShow);
      return newShow;
    });
  }

  async update(id: number, updateShowDto: UpdateShowDto) {
    await this.verifyShowById(id);
    await this.showRepository.update({ id }, updateShowDto);
  }

  async delete(id: number) {
    await this.verifyShowById(id);
    await this.showRepository.delete({ id });
  }

  private async verifyShowById(id: number) {
    const show = await this.showRepository.findOne({
      where: {
        id,
      },
    });
    if (_.isNil(show)) {
      throw new NotFoundException('존재하지 않는 공연입니다.');
    }

    return show;
  }
}
