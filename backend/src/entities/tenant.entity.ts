import { Problem } from './problem.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class TenantEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  birthday: Date;

  @OneToMany(() => Problem, (problem) => problem.tenant)
  problem: Problem;
}
