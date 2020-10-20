exports.up = async function(knex, Promise) {
	return knex.schema.hasTable('passengers').then((exists) => {
		if (!exists) {
			return knex.schema.createTable('passengers', (table) => {
				table.increments('uuid').unsigned().primary();
				table.string('uuid_code').notNullable();
				table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string("pick_up_time");
        table.timestamp('created_at').defaultTo(knex.fn.now());
			})
			.createTable('types', (table) => {
				table.increments('uuid').unsigned().primary();
				table.string('type_name').notNullable();
			})
			.createTable('articles', (table) => {
				table.increments('uuid_articles').unsigned().primary();
        table.integer('passenger_uuid').notNullable().references("uuid").inTable("passengers").onDelete("cascade");
        table.integer('type').notNullable().references("uuid").inTable("types").onDelete("cascade");
      });
		}
	});
};

exports.down = async function(knex) {
	return knex.schema.dropTable('articles').dropTable('passengers').dropTable('types');
};

