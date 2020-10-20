const pgtools = require('pgtools');
const { database } = require('../config/settings');
const knex = require('knex');
const process = require('process');
const { up, down } = require("../db/migrations_file");
//const {seed} = require("../seeds/passengers");

const db_config = {
	client: database.dbClient,
	connection: {
		host: database.dbHost,
		database: database.dbName,
		user: database.dbUser,
		password: database.dbPassword,
		port: database.dbPort,
	},
	pool: {
		min: 2,
		max: 10,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};

const pgConfig = {
  user: database.dbUser,
  host: database.dbHost,
  password: database.dbPassword,
  port: database.dbPort,
};

// Knex
const db = knex(db_config);
pgtools.createdb(pgConfig, database.dbName, async function (err, res) {
  if (err) {
    if(err.name === "duplicate_database") {
      await pgtools.dropdb(pgConfig, database.dbName, function (err, res) {
        if (err) {
          console.error(err);
          process.exit();
        }
        console.log(res);
        console.log(`${database.dbName} was deleted, run script again`)
      });
    }
    process.exit();
  }
  console.log(res);
  console.log(`${database.dbName} was created :)`)
    try {
    await up(db);
    console.log("Passengers table up!");
    process.exit();
  } catch (error) {
    console.log(error)
    await down(db);
    console.log(`Table passengers droped`);
    console.log(`Error ${error.name}`)
  }
});
