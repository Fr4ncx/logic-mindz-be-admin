import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators, Type } from '@nestjs/common';
import { PaginatedResponseDto } from '../dto/paginated.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(model: TModel) => {
  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              status: {
                type: 'string',
              },
              total: {
                type: 'number',
              },
              page: {
                type: 'object',
                properties: {
                  size: {
                    type: 'number',
                  },
                  index: {
                    type: 'number',
                  },
                  items: {
                    type: 'array',
                    items: { $ref: getSchemaPath(model) },
                  },
                },
              },
            },
          },
        ],
        examples: {
          example1: {
            message: 'an example hereeeeeeee',
          },
          example2: {
            message: 'an example hereeeeeeee',
          },
        },
      },
    }),
  );
};
