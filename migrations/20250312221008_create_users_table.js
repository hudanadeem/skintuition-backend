/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email").unique().notNullable();
    table.string("password_hash").notNullable();
    table
      .enum("skin_type", ["Dry", "Oily", "Combination", "Sensitive", "Normal"])
      .notNullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
