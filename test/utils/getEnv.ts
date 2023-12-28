function getEnvironment() {
  return process.env.ENVIRONMENT === undefined ? 'local' : process.env.ENVIRONMENT;
}

export { getEnvironment };
