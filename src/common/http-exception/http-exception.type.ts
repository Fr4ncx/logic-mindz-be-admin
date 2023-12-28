export type StatusCodeOk = 'ok';
export type StatusCodeError = 'fail' | 'error';

export type HttpExceptionFunctionType = {
  getStatus: Function;
  getResponse: Function;
};
