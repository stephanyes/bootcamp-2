module.exports = {
  development: {
    client:"postgresql",
    connection: 'postgres://postgres:password@localhost:5432/airport_deposit',
    migrations: {
      directory: __dirname + "/migrations"
    },
    seeds: {
      directory: __dirname + "/seeds"
    }
  }
}