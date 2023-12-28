import { Controller } from '@nestjs/common';

export function VersionedJsonController(version: string, route: string): Function {
  return function (target: Function): void {
    Controller('/' + version + route)(target);
  };
}
