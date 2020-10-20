const { DataBasePlugin } = require('../database/airport_database');

class AirportService {
	constructor() {
		this.dataBasePlugin = new DataBasePlugin();
  }
  
  async addPassenger(passenger) {
    const result = await this.dataBasePlugin.addPassenger(passenger, 'passengers');
		return result;
  }

  async addNewPackage(package_data) {
    // Agregar bultos para un pasajero (sin exceder el máximo).
    const result = await this.dataBasePlugin.addNewPackage(package_data, 'articles');
		return result;
  }
  
  async getAllPassengers() {
    const all_passengers = await this.dataBasePlugin.getAllPassengers('passengers');
    return all_passengers;
  }

  async getPassengerById(search_id) {
    const passenger = await this.dataBasePlugin.getPassengerById(search_id);
    return passenger;
  }

  async getPassengersPackages(search_id) {
    const packages = await this.dataBasePlugin.getPassengersPackages(search_id);
    return packages;
  }

  async removePassengerById(search_id) {
    await this.dataBasePlugin.removePassengerById(search_id, 'passengers');
    return;
  }
}



module.exports = {
	AirportService,
};