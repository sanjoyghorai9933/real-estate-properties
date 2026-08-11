import mysql from "mysql2/promise";

const globalForDb = globalThis as unknown as {
  mysqlPool?: mysql.Pool;
};

export function getDb(): mysql.Pool {
  if (globalForDb.mysqlPool) {
    return globalForDb.mysqlPool;
  }

  const required = [
    "DB_HOST",
    "DB_PORT",
    "DB_NAME",
    "DB_USER",
    "DB_PASSWORD",
  ] as const;

  for (const key of required) {
    if (process.env[key] === undefined) {
      throw new Error(`Missing database environment variable: ${key}`);
    }
  }

  globalForDb.mysqlPool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    // Keep the pool deliberately small for shared cPanel MySQL hosting.
    connectionLimit: 2,
    maxIdle: 1,
    idleTimeout: 60_000,
    queueLimit: 0,
    connectTimeout: 10_000,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: "utf8mb4",
  });

  return globalForDb.mysqlPool;
}
