module.exports = {
	appName: 'Airport Deposit',

	server: {
		ip: '127.0.0.1',
		port: 3001,
		poolSize: 64,
	},

	/* DATABASE INFORMATION */
	database: {
		dbClient: 'pg',
		dbHost: '127.0.0.1',
		dbUser: 'postgres',
		dbPassword: '',
		dbName: 'airport_deposit',
		dbPort: 5432,
	},
};
