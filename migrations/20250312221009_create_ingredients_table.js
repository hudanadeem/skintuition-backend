/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
    table
      .enum("category", ["Beneficial", "Potential Irritant", "Harmful"])
      .notNullable();
    table.text("description");
    table.string("suitable_for").notNullable().defaultTo("all");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTableIfExists("ingredients");
}
