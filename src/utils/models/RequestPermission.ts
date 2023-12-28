/**
 * Enum for Request Permission
 * @enum {string}
 */

export enum RequestPermission {
  enabledUsers = 'enabledUsers',
  installer = 'installer',
  installerAdmin = 'installerAdmin',
  techAdmin = 'techAdmin',
  organizationManager = 'organizationManager',
  parkingOwner = 'parkingOwner',
  divisionSupervisor = 'divisionSupervisor',
  baManager = 'baManager',
  buSupervisor = 'buSupervisor',
  divisionManager = 'divisionManager',
  localBUSupervisor = 'localBUSupervisor',
  merchant = 'merchant',
  clerk = 'clerk',
  device = 'device',
  jpOperator = 'jpOperator',
  userJp = 'userJp',
  userSa = 'userSa',
  sat = 'sat',
  headSat = 'headSat',
  headSatGlobal = 'headSatGlobal',
  engineeringSupervisor = 'engineeringSupervisor',
  factorySetup = 'factorySetup',

  //this role is used to check the route coming from another backend such as jw or ecommerce middleware
  backendSystemUser = 'backendSystemUser',
}
