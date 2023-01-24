import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Tenant } from './tenant.entity';

@Injectable()
export class TenantService {
  repo: Repository<Tenant>;

  constructor(private connection: Connection) {
    try {
      this.repo = this.connection.getRepository(Tenant);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<Tenant[]> {
    try {
      const tenants = await this.repo.find();
      return tenants;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async insertIntoDB(payload: Tenant): Promise<Tenant> {
    const tenant = await this.repo.save(payload);
    return tenant;
  }
}
