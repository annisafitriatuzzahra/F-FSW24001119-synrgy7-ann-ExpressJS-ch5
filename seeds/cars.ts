import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("cars").del();

    // Inserts seed entries
    await knex("cars").insert([
        { name: "avanza", pict: null, price: 200000, start_rent: null, finish_rent: null, created_at: null},
        { name: "xenia", pict: null, price: 250000, start_rent: null, finish_rent: null, created_at: null},
    ]);
};
