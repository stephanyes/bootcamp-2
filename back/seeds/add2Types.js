
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('types').del()
    .then(function () {
      // Inserts seed entries
      return knex('types').insert([
        {uuid: 1, type_name: "Big"},
        {uuid: 2, type_name: "Small"},
        {uuid: 3, type_name: "Clothes"},
      ]);
    });
};
