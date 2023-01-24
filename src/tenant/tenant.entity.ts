import { Column, Entity, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['host'])
export class Tenant {
  @PrimaryColumn()
  host: string;

  @Column()
  dbName: string;

  @Column()
  dbConnectionName: string;
}
