export class Course {
  constructor(
    public id: number,
    public title: string,
    public duration: number,
    public description: string,
    public topRated: boolean,
    public creationDate?: any
  ) {
    this.id = id || null;
    this.creationDate = creationDate || new Date();
  }
}


