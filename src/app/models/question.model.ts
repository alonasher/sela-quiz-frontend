export class Question {
  constructor(
    public name: string,
    public content: string,
    public createdAt?: Date,
    public id?: number
  ) {}
}
