import { Module } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { ProblemsController } from './problems.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Problem } from '../entities/problem.entity';
import { UserEntity } from '../entities/user.entity';
import { TenantEntity } from '../entities/tenant.entity';
import { AuthModule } from 'src/authentication/auth.module';
import { UsersService } from 'src/users/users.service';
import { BoardMemberEntity } from '../entities/board-member.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Problem,
      UserEntity,
      TenantEntity,
      BoardMemberEntity,
    ]),
    AuthModule,
    HttpModule,
  ],
  controllers: [ProblemsController],
  providers: [ProblemsService, UsersService],
})
export class ProblemsModule {}
