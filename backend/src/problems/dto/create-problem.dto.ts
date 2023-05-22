import { TenantEntity } from '../../entities/tenant.entity';

export class CreateProblemDto {
  tenant: TenantEntity;

  constructor(
    public department: string,
    public subject: string,
    public description: string,
    public image: string,
    public createdAt: Date,
  ) {}
}
