export class Message {
  public _id!: string;
  public id!: string;

  constructor(
    public sender: string,
    public subject: string,
    public msgText: string
  ) {}
}