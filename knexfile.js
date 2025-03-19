import "dotenv/config";

const knexConfig = {
  development: {
    client: "mysql2", // Ensure this is not undefined
    connection: {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    },
    migrations: {
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default knexConfig;
