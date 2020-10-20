// exports.up = async function(knex, Promise) {
// 	return knex.schema.hasTable('articles').then(async (exists) => {
// 		if (!exists) {
// 			await knex.schema.createTable('articles', (table) => {
// 				table.increments('uuid_articles').unsigned().primary();
//         table.integer('passenger_id').unsigned().index().references("uuid").inTable("passengers");
//         table.integer('type').unsigned().references("uuid").inTable("types");
//       });
// 		}
// 	});
// };

// exports.down = async function(knex) {
// 	return knex.schema.hasTable('articles').then(async (exists) => {
// 		if (exists) return await knex.schema.dropTable('articles');
// 	});
// };