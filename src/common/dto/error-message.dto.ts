import { StatusCodeError } from '../http-exception/http-exception.type';

export class ErrorMessageDto {
  status: StatusCodeError;
  error: {
    message: string;
    code: string;
  };
}
