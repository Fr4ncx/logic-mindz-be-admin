import Ajv from 'ajv';
import * as fs from 'fs';
import fetch, { RequestInit } from 'node-fetch';
import * as path from 'path';
import { ReqResponse } from './types';

function readSchemaFile(filePath: string): Record<string, string> {
  return JSON.parse(fs.readFileSync(path.join(__dirname, '../specs/schemas/', filePath), 'utf8'));
}

async function sendQuery(url: string, options?: RequestInit): Promise<ReqResponse> {
  let headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (options != null && options.headers != null) {
    headers = Object.assign(headers, options.headers);
  }

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });
  const jsonBody = await response.json();
  return {
    data: jsonBody,
    status: response.status,
    headers: response.headers,
    errors: jsonBody.errors,
    success: !Object.prototype.hasOwnProperty.call(jsonBody, 'errors'),
  };
}

async function sendPreparedQuery(token: string, url: string): Promise<ReqResponse> {
  return await sendQuery(url, {
    headers: { Authorization: `Bearer ${token}`, accept: 'application/json' },
  });
}

function validateResponseAgainstSchema(schema: Record<string, string>, response: Record<string, string>) {
  const ajv = new Ajv({
    schemas: [],
  });

  const valid = ajv.validate(schema, response);
  if (!valid) {
    console.log('response: ' + JSON.stringify(response));
    console.log(ajv.errors);
    return ajv.errors;
  }
  return valid;
}

function validateResponse(schemaFile: string, responseData: Record<string, string>): void {
  const schema = readSchemaFile(schemaFile);
  const result = validateResponseAgainstSchema(schema, responseData);
  expect(result).toBe(true);
}

async function postCall(url: string, body: any, options?: RequestInit) {
  let headers = {
    accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (options != null && options.headers != null) {
    headers = Object.assign(headers, options.headers);
  }

  const response = await fetch(url, {
    method: 'post',
    body: JSON.stringify(body),
    headers: headers,
  });
  const data = await response.json();

  return data;
}

export { sendQuery, sendPreparedQuery, validateResponse, postCall };
