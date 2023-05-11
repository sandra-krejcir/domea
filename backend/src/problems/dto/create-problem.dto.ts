import { TenantEntity } from '../../entities/tenant.entity';

export class CreateProblemDto {
  tenant: TenantEntity;

  constructor(
    public subject: string,
    public description: string,
    public image: string,
  ) {}
}
