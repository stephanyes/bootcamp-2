const { database } = require('../config/settings')

const config = {
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
		max: 50,
	},
	migrations: {
		tableName: 'knex_migrations',
	},
};

const knex = require('knex')(config);

class DataBasePlugin {
	constructor() {
		this.knex = knex;
  }

  async addPassenger(passenger, table) {
    const db = this.knex;
    const {first_name, last_name, uuid_code, category} = passenger
    const person_exist = await this.getPassengerById(uuid_code, "uuid_code");
    if(person_exist) return {bool:false};
    const [ uuid ] = await db(table).returning('uuid').insert({first_name, last_name, uuid_code});
    if(category.length > 0) {
      await this.addNewPackage({passenger_uuid: uuid, type: category}, "articles");
    }

		return {bool:true, items_added: category.length};
  }

  async addNewPackage(package_data, table) {
    const db = this.knex;
    let rounds = 0;
    const { passenger_uuid , type } = package_data;
    const packages = type.length;
    const is_person_in_db = await this.getPassengerById(passenger_uuid, "uuid");

    if(!is_person_in_db) return {bool: false, rounds:-1}
    const [arr] = await db('articles').count('passenger_uuid as count').where({passenger_uuid: passenger_uuid});
    const {count} = arr;

    if(count >= '3') {
      console.log("no quiero entrar aca")
      return {bool: false, rounds:rounds};
    } 
    if(count === '2') {
      rounds++;
      await db(table).insert({
        passenger_uuid: passenger_uuid, 
        type: type[packages - 1]
      });
    } 
    if (count === '1') {
      for(let i = 0; i < 2; i++) {
        if(!type[i]) return;
        rounds++;
        await db(table).insert({
          passenger_uuid: passenger_uuid, 
          type: type[i]
        });
      }
    } 
    if (count === '0') {
      for(let i = 0; i < packages; i++) {
        if(!type[i]) return;
        rounds++;
        await db(table).insert({
          passenger_uuid: passenger_uuid, 
          type: type[i]
        });
      }
    }

    await db.raw('SELECT setval(\'articles_uuid_articles_seq\', (SELECT MAX(uuid_articles) from "articles"));')
    return {bool: true, rounds:rounds};
  }
  
  async getAllPassengers(table) {
    const db = this.knex;
    const query = await db.select('*').from(table).orderBy("uuid", "ASC");
    if (!query.length) return null;
    
		return query;
  }

  async getPassengerById(search_id, column = "uuid") {
    const db = this.knex;
    const query = await db.select('*').from("passengers").where(column, parseInt(search_id));
    if (!query.length) return null;
    
		return query;
  }

  async getPassengersPackages(search_id) {
    const db = this.knex;
    const query = await db.select('*').from("articles").where("passenger_uuid", parseInt(search_id));
    if (!query.length) return null;
    
		return query;
  }

  async removePassengerById(search_id, table) {
    const db = this.knex;
    const query = await db(table).update({
      pick_up_time: new Date(),
    }).where('uuid', search_id);

    if (!query.length) return null;
    
		return query;
  }
}

module.exports = {
  DataBasePlugin
}