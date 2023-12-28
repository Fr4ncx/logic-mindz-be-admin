import appConfig from '../utils';
import { sendQuery, validateResponse } from '../utils/request-helper';
import { ReqResponse } from '../utils/types';

describe('HealthCheck endpoint', () => {
  const schemaFile = 'health-check.schema.json';
  let response: ReqResponse;
  beforeAll(async () => {
    response = await sendQuery(appConfig.urls.healthCheck);
  });

  it(`should return status 200`, () => {
    expect(response.status).toBe(200);
  });

  it('should return valid response structure', () => {
    validateResponse(schemaFile, response.data);
  });
});
