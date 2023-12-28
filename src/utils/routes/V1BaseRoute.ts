/**
 * Base Route
 *
 * @abstract BaseRoute
 */

import { BaseRoute } from './BaseRoute';

export abstract class V1BaseRoute extends BaseRoute {
  public static API_VERSION = 'v1/management';
}
