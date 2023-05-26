export class TenantEntity {
  id?: number;
  constructor(
    public username: string,
    public password: string,
    public firstname: string,
    public lastname: string,
    public phone: string
  ) {}
}
