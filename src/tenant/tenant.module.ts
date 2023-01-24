import {
  BadRequestException,
  MiddlewareConsumer,
  Module,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from '@src/ENV';
import { Connection, createConnection, getConnection } from 'typeorm';
import { User } from './../app/modules/user/user.entity';
import { DB_CONNECTION } from './tenant.constants';
import { Tenant } from './tenant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [
    {
      provide: DB_CONNECTION,
      inject: [REQUEST, Connection],
      scope: Scope.REQUEST,
      useFactory: async (request, connection) => {
        const tenant: Tenant = await connection
          .getRepository(Tenant)
          .findOne({ where: { host: request.headers.host } });
        return getConnection(tenant.dbConnectionName);
      },
    },
  ],
  exports: [DB_CONNECTION],
})
export class TenantModule {
  constructor(private readonly connection: Connection) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(async (req, res, next) => {
        const tenant: Tenant = await this.connection
          .getRepository(Tenant)
          .findOne({ where: { host: req.headers.host } });

        if (!tenant) {
          throw new BadRequestException(
            'Database Connection Error',
            'There is a Error with the Database!',
          );
        }

        try {
          getConnection(tenant.dbConnectionName);
          next();
        } catch (e) {
          const createdConnection: Connection = await createConnection({
            name: tenant.dbConnectionName,
            type: ormConfig.type,
            host: ormConfig.host,
            port: ormConfig.port,
            username: ormConfig.username,
            password: ormConfig.password,
            database: tenant.dbName,
            entities: [User],
            synchronize: true,
          });

          if (createdConnection) {
            next();
          } else {
            throw new BadRequestException(
              'Database Connection Error',
              'There is a Error with the Database!',
            );
          }
        }
      })
      .forRoutes('*');
  }
}
