import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table: Knex.TableBuilder) => {
    table.increments("id").primary();
    table.string("name", 255).notNullable();
    table.text("pict");
    table.float("price").notNullable().defaultTo(0);
    table.timestamp('created_at').defaultTo(knex.fn.now()).alter();
    table.timestamp('start_rent').nullable().alter();
    table.timestamp('finish_rent').nullable().alter();
})
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.alterTable('cars', function(table) {
    table.dropColumn('created_at');
    table.dropColumn('start_rent');
    table.dropColumn('finish_rent');
  });
}