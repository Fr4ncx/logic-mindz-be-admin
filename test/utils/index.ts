import { getEnvironment } from './getEnv';
import { ConfigApp } from './types';

function getConfig() {
  return require(`../config/${getEnvironment()}.config.json`);
}

const configApp = getConfig();

export default configApp as ConfigApp;
