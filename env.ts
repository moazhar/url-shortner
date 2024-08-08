import { cleanEnv, str, port, url, num } from 'envalid';

const env = cleanEnv(process.env, {
  NODE_ENV: str({ choices: ['development', 'staging', 'production'] }),
  PORT: port({ default: 3000 }),
  DB_URI: url(),
  JWT_SECRET_KEY: str(),
  JWT_ACCESS_TOKEN_EXPIRY: num(),
  REFRESH_ACCESS_TOKEN_EXPIRY: num(),
});

export default env;
