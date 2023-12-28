import { CorrelationIdMiddleware } from './correlation-id.middleware';

describe('CorrelationIdMiddleware', () => {
  let correlationIdMiddleware: CorrelationIdMiddleware;
  let req: { headers: { 'x-correlation-id'?: string } };
  let res: { on: Function };
  let next: () => void;

  beforeAll(() => {
    correlationIdMiddleware = new CorrelationIdMiddleware();
    req = {
      headers: {},
    };
    res = {
      on: () => {},
    };
    next = () => {};
  });

  it('Should add x-correlation-id header', () => {
    expect(req.headers['x-correlation-id']).toBeFalsy();
    correlationIdMiddleware.use(req, res, next);
    console.log(req.headers['x-correlation-id']);
    expect(req.headers['x-correlation-id']).toBeDefined();
  });
});
