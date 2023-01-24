import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @Post()
  async insertIntoDB(@Body() payload: User): Promise<User> {
    return this.service.insertIntoDB(payload);
  }
}
