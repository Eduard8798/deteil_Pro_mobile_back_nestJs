export default () => ({
  port: process.env.PORT || '3000',
  db_port: process.env.DB_PORT,
  db_host: process.env.DB_HOST,
  db_user: process.env.DB_USER,
  db_password: process.env.DB_PASSWORD,
  db_name: process.env.DB_NAME,
  secret_jwt: process.env.PRIVATE_KEY,
  refresh_jwt: process.env.REFRESH_PRIVATE_KEY,
  api_version:
    process.env.API_VERSION || process.env.npm_package_version || '0.0.1',
});
