import mysql from "mysql2/promise";
import bcrypt from "bcryptjs";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

try {
  process.loadEnvFile?.(".env.local");
} catch {
  // The script will report missing DB variables below if the env file is unavailable.
}

const required = ["DB_HOST", "DB_PORT", "DB_NAME", "DB_USER", "DB_PASSWORD"];
for (const key of required) {
  if (process.env[key] === undefined) {
    console.error(`Missing ${key} in .env.local`);
    process.exit(1);
  }
}

const rl = createInterface({ input, output });

try {
  const username = (await rl.question("Admin username: ")).trim();
  const password = await rl.question("Admin password: ", { hideEchoBack: true });

  if (!username || password.length < 8) {
    throw new Error("Username is required and password must be at least 8 characters.");
  }

  const db = await mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    charset: "utf8mb4",
  });

  const passwordHash = await bcrypt.hash(password, 12);
  await db.execute(
    "INSERT INTO admins (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)",
    [username, passwordHash],
  );

  await db.end();
  console.log(`Admin '${username}' is ready.`);
} catch (error) {
  console.error(error instanceof Error ? error.message : "Failed to create admin.");
  process.exitCode = 1;
} finally {
  rl.close();
}
