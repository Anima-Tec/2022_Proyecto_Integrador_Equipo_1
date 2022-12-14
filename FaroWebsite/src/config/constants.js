const fetchVariable = (varName, defaultValue) => {
  if (!process.env[varName] && typeof defaultValue === "undefined") {
    throw new Error(`Mandatory environment variable ${varName} is not set.`);
  }
  return process.env[varName] || defaultValue;
};

const nodeEnv = fetchVariable("NODE_ENV");
const environment = {
  isDevelopment: nodeEnv === "development",
  isProduction: nodeEnv === "production",
};

export const constants = {
  apiBaseURL: fetchVariable("REACT_APP_API_BASE_URL", "http://10.1.0.211:7000"),
  environment,
};
