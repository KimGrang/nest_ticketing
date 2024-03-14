import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { property } from 'lodash';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService) {}
  getHello(): string {
    return `Hello World! ${this.configService.get('SERVER_PORT')}`;
  }
}
