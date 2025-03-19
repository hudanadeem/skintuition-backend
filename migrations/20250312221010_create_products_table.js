/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
  return knex.schema.createTable("products", (table) => {
    table.increments("id").primary();
    table.string("name").unique().notNullable();
    table.text("ingredient_list").notNullable();
    table.string("recommended_alternative");
    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
  return knex.schema.dropTableIfExists("products");
}
