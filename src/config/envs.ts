import "dotenv/config";

const envs = {
  PORT: process.env.PORT || "",
  DB_NAME: process.env.DB_NAME || "",
  DB_USER: process.env.DB_USER || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "",
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
  JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES || "1h",
  JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES || "7d",
};

export default envs;
