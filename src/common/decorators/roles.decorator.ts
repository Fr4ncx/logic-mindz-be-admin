import { SetMetadata } from '@nestjs/common';

import { RequestPermission } from '../../utils/models/RequestPermission';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RequestPermission[]) => SetMetadata(ROLES_KEY, roles);
