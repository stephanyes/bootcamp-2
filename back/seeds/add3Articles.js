
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('articles').del()
    .then(function () {
      // Inserts seed entries
      return knex('articles').insert([
        {uuid_articles: 1, passenger_uuid: '2', type: 1},
        {uuid_articles: 3, passenger_uuid: '2', type: 3},
        {uuid_articles: 4, passenger_uuid: '3', type: 1},
        {uuid_articles: 5, passenger_uuid: '3', type: 2},
        {uuid_articles: 7, passenger_uuid: '4', type: 1},
        {uuid_articles: 9, passenger_uuid: '5', type: 2},
        {uuid_articles: 10, passenger_uuid: '5', type: 3},
        {uuid_articles: 11, passenger_uuid: '6', type: 1},
      ]);
    });
};
