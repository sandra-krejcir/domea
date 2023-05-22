export class ProblemEntity {
  id?: number;
  file?: string;
  constructor(
    public problemDepartment: string,
    public subject: string,
    public description: string,
    public photoDisplayURL: string,
    public createdAt: Date
  ) {}
}
