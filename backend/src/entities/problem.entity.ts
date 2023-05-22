import { TenantEntity } from './tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

@Entity()
export class Problem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @Column()
  subject: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @Column()
  createdAt: Date;

  @ManyToOne(() => TenantEntity, (tenant) => tenant.problem)
  tenant: TenantEntity;
}
