import { TenantController } from './../tenant/tenant.controller';
import { Module } from '@nestjs/common';
import { DatabaseModule } from '@src/database/database.module';
import { TenantModule } from '@src/tenant/tenant.module';
import { TenantService } from '@src/tenant/tenant.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [DatabaseModule, TenantModule, UserModule],
  controllers: [AppController, TenantController],
  providers: [AppService, TenantService],
})
export class AppModule {}
