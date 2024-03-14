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

    const createShowPromises = data.map(async (dataItem) => {
      if (
        !dataItem.name ||
        !dataItem.description ||
        !dataItem.dates ||
        !dataItem.place ||
        !dataItem.seatInformation ||
        !dataItem.price ||
        !dataItem.image ||
        !dataItem.category
      ) {
        throw new BadRequestException('Missing item exists.');
      }

      const newShow = this.showRepository.create({
        name: dataItem.name,
        description: dataItem.description,
        dates: dataItem.dates,
        place: dataItem.place,
        seatInformation: dataItem.seatInformation,
        price: dataItem.price,
        category: dataItem.category,
        image: dataItem.image || null,
      });

      await this.showRepository.save(newShow);
      return newShow;
    });
    await Promise.all(createShowPromises);
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
