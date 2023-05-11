import { TenantEntity } from './tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.problem)
  tenant: TenantEntity;
}
