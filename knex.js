import knex from "knex";
import knexConfig from "./knexfile.js"; // Ensure this path is correct

const db = knex(knexConfig.development); // Use "development" settings

export default db;
