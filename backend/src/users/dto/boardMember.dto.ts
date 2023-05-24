import { UserEntity } from 'src/entities/user.entity';

export class BoardMemberDto {
  user: UserEntity;

  constructor(
    public firstname: string,
    public lastname: string,
    public phone: string,
    public address: string,
    public zipCode: number,
    public city: string,
  ) {}
}
