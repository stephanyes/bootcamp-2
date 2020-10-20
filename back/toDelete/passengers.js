const seed = (knex) => {
  // Deletes ALL existing entries
  return knex.schema.hasTable('passengers').then((exists) => {
		if (exists) {
      return knex('airport_deposit').insert([
        {uuid: 1, uuid_code: 'XXX01', first_name: "John", last_name: "Cacona", pick_up_time: "18/20/2020"},
        {uuid: 2, uuid_code: 'XXX02', first_name: "Beby", last_name: "Caca", pick_up_time: "18/20/2020"},
        {uuid: 3, uuid_code: 'XXX03', first_name: "El", last_name: "Risas", pick_up_time: "18/20/2020"},
        {uuid: 4, uuid_code: 'XXX04', first_name: "Jacky", last_name: "Sieras", pick_up_time: "18/20/2020"},
        {uuid: 5, uuid_code: 'XXX05', first_name: "Fresh", last_name: "Prince", pick_up_time: "18/20/2020"},
        {uuid: 6, uuid_code: 'XXX06', first_name: "Nene", last_name: "Malo", pick_up_time: "18/20/2020"}
      ]);
		}
	});
};

module.exports = {
  seed
}
