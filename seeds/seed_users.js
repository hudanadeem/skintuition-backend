/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  await knex("users").del();
  await knex("users").insert([
    { email: "user1@example.com", password_hash: "hashedpassword123", skin_type: "Dry" },
    { email: "user2@example.com", password_hash: "hashedpassword456", skin_type: "Oily" },
  ]);
}

