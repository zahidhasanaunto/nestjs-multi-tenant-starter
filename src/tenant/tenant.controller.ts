import { Body, Controller, Get, Post } from '@nestjs/common';
import { Tenant } from './tenant.entity';
import { TenantService } from './tenant.service';

@Controller('tenants')
export class TenantController {
  constructor(private readonly service: TenantService) {}

  @Get()
  async findAll(): Promise<Tenant[]> {
    return this.service.findAll();
  }

  @Post()
  async insertIntoDB(@Body() payload: Tenant): Promise<Tenant> {
    return this.service.insertIntoDB(payload);
  }
}
