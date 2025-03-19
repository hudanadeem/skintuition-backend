/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("ingredients", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
    table.enum("category", ["Beneficial", "Irritant", "Harmful"]).notNullable();
    table.text("description");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("ingredients");
}
