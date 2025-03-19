/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex("products").del();
  await knex("products").insert([
    {
      name: "Product A",
      ingredient_list: "Hyaluronic Acid, Parabens",
      recommended_alternative: "Product B",
    },
  ]);
}
