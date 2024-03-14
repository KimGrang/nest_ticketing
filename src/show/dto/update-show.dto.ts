import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class UpdateShowDto {
  @IsString()
  @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: '공연에 대한 소개를 입력해주세요.' })
  description: string;

  @IsNumber()
  @IsNotEmpty({ message: '공연 가격을 입력해주세요.' })
  price: number;
}
