import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardMemberEntity } from '../entities/board-member.entity';
import { TenantEntity } from '../entities/tenant.entity';
import { UserEntity } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { Role } from './Role';
import { BoardMemberDto } from './dto/boardMember.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(TenantEntity)
    private tenantRepository: Repository<TenantEntity>,
    @InjectRepository(BoardMemberEntity)
    private boardMemberRepository: Repository<BoardMemberEntity>,
  ) {}

  async findUserById(id: number): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { id: id } });
  }

  async findOne(username: string): Promise<UserEntity> {
    const result = await this.userRepository.findOne({
      where: { username: username },
      relations: ['tenant', 'tenant.problem'],
    });
    console.log('findOne user service', result);

    return result;
  }

  async findAdmins(): Promise<UserEntity[]> {
    const result = await this.userRepository.find({
      where: { role: Role.Admin },
      relations: ['boardMember'],
    });
    console.log('found many admins', result);

    return result;
  }

  async create(username: string, password: string): Promise<User> {
    return this.userRepository.save({ username, password });
  }

  async create_tenant(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
  ): Promise<TenantEntity> {
    const user: User = { username, password, role: Role.User };

    const savedUser = await this.userRepository.save(user);
    const tenant = { firstname, lastname, phone, user: savedUser };
    const savedTenant = await this.tenantRepository.save(tenant);

    return savedTenant;
  }

  async create_board_member(
    username: string,
    password: string,
    firstname: string,
    lastname: string,
    phone: string,
    address: string,
    zipCode: number,
    city: string,
  ): Promise<BoardMemberEntity> {
    const boardMemberDto = new BoardMemberDto(
      firstname,
      lastname,
      phone,
      address,
      zipCode,
      city,
    );

    const user: User = { username, password, role: Role.Admin };

    boardMemberDto.user = await this.userRepository.save(user);
    /*  const boardMember = { phone, address, zipCode, city, user: savedUser }; */
    const savedBoardMember = await this.boardMemberRepository.save(
      boardMemberDto,
    );

    return savedBoardMember;
  }
}
