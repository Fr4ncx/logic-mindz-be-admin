import { BadRequestException } from '@nestjs/common';
import { ErrorExceptionFilter } from './error-exception.filter';
import { ErrorMessageDto } from '../dto/error-message.dto';

describe('ErrorExceptionFilter', () => {
  let nodeEnv: string | undefined;
  let filter = new ErrorExceptionFilter();
  let host: object;

  beforeAll(() => {
    /** disable logging accessing to a readonly variable... */
    (filter as unknown as { logger: object }).logger = {
      warn: () => {},
      error: () => {},
    };

    nodeEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'dev';

    host = {
      switchToHttp: () => {
        return {
          getResponse: () => {
            return {
              status: (n: number) => {
                return {
                  send: (errorDto: ErrorMessageDto) => {
                    /*
                     * This should return a FastifyReply
                     * in this case is important to test the errorDto
                     */
                    return errorDto;
                  },
                };
              },
            };
          },
        };
      },
    };
  });

  it('Intercept bad request exception', () => {
    const ERROR_MESSAGE = 'Bad Request Message';
    const res = filter.catch(new BadRequestException(ERROR_MESSAGE), host as any);

    /* res should be a FastifyReply */
    const errorDto: ErrorMessageDto = res as any;
    expect(errorDto).toBeDefined();
    expect(errorDto.status).toBe('fail');
    expect(errorDto.error.message).toBe(ERROR_MESSAGE);
  });

  it('Intercept generic error exception', () => {
    const ERROR_MESSAGE = 'Unexpected error';
    const res = filter.catch(new Error(ERROR_MESSAGE), host as any);

    /* res should be a FastifyReply */
    const errorDto: ErrorMessageDto = res as any;
    expect(errorDto).toBeDefined();
    expect(errorDto.status).toBe('error');
    expect(errorDto.error.message).toBe(ERROR_MESSAGE);
  });

  afterAll(() => {
    process.env.NODE_ENV = nodeEnv;
  });
});
