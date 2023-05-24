import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from './user.entity';

@Entity()
export class BoardMemberEntity {
  @PrimaryGeneratedColumn() id: number;

  @Column() firstname: string;

  @Column() lastname: string;

  @Column() phone: string;

  @Column() address: string;

  @Column() zipCode: number;

  @Column() city: string;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
