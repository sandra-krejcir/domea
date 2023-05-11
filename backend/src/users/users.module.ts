import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardMemberEntity } from '../entities/board-member.entity';
import { TenantEntity } from '../entities/tenant.entity';
import { UserEntity } from '../entities/user.entity';
import { UsersService } from './users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([TenantEntity]),
    TypeOrmModule.forFeature([BoardMemberEntity]),
  ],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
