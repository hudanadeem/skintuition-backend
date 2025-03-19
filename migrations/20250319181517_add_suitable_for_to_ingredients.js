/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.alterTable("ingredients", (table) => {
      table.string("suitable_for").notNullable().defaultTo("all");
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.alterTable("ingredients", (table) => {
      table.dropColumn("suitable_for");
    });
  }
  