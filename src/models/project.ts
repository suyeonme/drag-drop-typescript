// Project Type
export enum ProjectStatus {
  Active, // 0
  Finished, // 1
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}
