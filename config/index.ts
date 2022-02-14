import merge from 'lodash/merge';
import commonConfig from './common';

const ENV_MAP = {
  local: 'local',
  qa: 'qa',
  uat: 'uat',
  production: 'production',
};

const LOCAL_DEV_ENVIRONMENTS = [ENV_MAP.local, ENV_MAP.qa, ENV_MAP.production];
const env = process.env.NODE_ENV ?? '';

export const isLocalDev = () => LOCAL_DEV_ENVIRONMENTS.includes(env);
export const isProduction = () => [ENV_MAP.production].includes(env);
export const isDevelop = () => [ENV_MAP.qa].includes(env);

const getConfig = () => {
  const environment = isLocalDev() ? ENV_MAP.local : env;
  const envConfig = require(`./${environment}`).default;

  const merged = merge(envConfig, commonConfig);

  return merged;
};

let config = getConfig();

export default config;
