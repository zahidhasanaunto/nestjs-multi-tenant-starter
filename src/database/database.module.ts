import { Tenant } from './../tenant/tenant.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@src/ENV';

@Module({
  imports: [TypeOrmModule.forRoot({ ...ormConfig, entities: [Tenant] })],
})
export class DatabaseModule {}
