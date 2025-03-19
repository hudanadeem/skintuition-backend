/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("name").nullable();
    table.string("email").unique().notNullable();
    table.string("password_hash").notNullable();
    table
      .enum("skin_type", ["Dry", "Oily", "Combination", "Sensitive", "Normal"])
      .nullable();
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("users");
}
