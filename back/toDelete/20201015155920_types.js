// exports.up = async function(knex, Promise) {
// 	return knex.schema.hasTable('types').then(async (exists) => {
// 		if (!exists) {
// 			await knex.schema.createTable('types', (table) => {
// 				table.increments('uuid').unsigned().primary();
// 				table.string('type_name').notNullable();
//       });
// 		}
// 	});
// };

// exports.down = async function(knex) {
// 	return knex.schema.hasTable('types').then(async (exists) => {
// 		if (exists) return await knex.schema.dropTable('types');
// 	});
// };

