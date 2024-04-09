export const getApiUrl = (): string => {
  const env = process.env.NODE_ENV;
  const apiUrlDev = process.env.API_URL_DEVELOPMENT;
  const apiUrlProd = process.env.API_URL_PRODUCTION;

  if (env === "development") {
    if (!apiUrlDev) {
      throw new Error("API_URL_DEVELOPMENT is not set in the .env file.");
    }
    return apiUrlDev;
  }

  if (env === "production") {
    if (!apiUrlProd) {
      throw new Error("API_URL_PRODUCTION is not set in the .env file.");
    }
    return apiUrlProd;
  }

  throw new Error("Development/production mode is not set in the package.json startup script.");
};
