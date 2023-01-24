import { Inject } from '@nestjs/common';
import { TenantService } from '@src/decorators/tenant.decorators';
import { Connection, Repository } from 'typeorm';
import { DB_CONNECTION } from './../../../tenant/tenant.constants';
import { User } from './user.entity';

@TenantService()
export class UserService {
  repo: Repository<User>;

  constructor(@Inject(DB_CONNECTION) private connection: Connection) {
    this.repo = this.connection.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    const users = await this.repo.find();
    return users;
  }

  async insertIntoDB(payload: User): Promise<User> {
    const user = await this.repo.save(payload);
    return user;
  }
}
