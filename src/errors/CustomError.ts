export class CustomError extends Error {
  public readonly message: string;
  public readonly statusCode: number;
    
  constructor(status: number, message: string) {
    super(message);
    this.message = message;
    this.statusCode = status;
  }
}