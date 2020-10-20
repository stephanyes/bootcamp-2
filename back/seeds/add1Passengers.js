
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('passengers').del()
    .then(function () {
      // Inserts seed entries
      return knex('passengers').insert([
        {uuid: 1, uuid_code: 'JC123', first_name: "John", last_name: "Cacona", pick_up_time: null},
        {uuid: 2, uuid_code: 'BC123', first_name: "Beby", last_name: "Caca", pick_up_time: new Date()},
        {uuid: 3, uuid_code: 'ER457', first_name: "El", last_name: "Risas", pick_up_time: null},
        {uuid: 4, uuid_code: 'JS666', first_name: "Jacky", last_name: "Sieras", pick_up_time: null},
        {uuid: 5, uuid_code: 'FP999', first_name: "Fresh", last_name: "Prince", pick_up_time: new Date()},
        {uuid: 6, uuid_code: 'NM548', first_name: "Nene", last_name: "Malo", pick_up_time: null}
      ]);
    });
};
