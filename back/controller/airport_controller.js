//Traerte el servicio
const { AirportService } = require('../service/airport_service');
class AirportController {

  async addPassenger(req, res, next) {
    try {
      const service = new AirportService();
      const { first_name, last_name, uuid_code, category } = req.body;
      const passenger_data = {
        first_name: first_name,
        last_name: last_name,
        uuid_code: uuid_code,
        category: category
      };
      const {bool, items_added} = await service.addPassenger(passenger_data);
      if(bool) {
        res.status(200).json({success: "Passenger succesfully added", items_added: items_added});
      } else {
        res.status(400).json({failure: "Passenger already registered"});
      }
    } catch (e) {
      return next(e);
    }
  }

  async addNewPackage(req, res, next) {
    try {
      const service = new AirportService();
      const { passengerId, category } = req.body;
      const package_data = {
        passenger_uuid: passengerId,
        type: category,
      };
      const {bool, rounds} = await service.addNewPackage(package_data);
      if(bool) {
        res.status(200).json({success: "Package succesfully added", items_added: rounds});
      } else {
        if(rounds < 0) {
          res.status(404).json({failure: "Passenger is not registered."});
        } else {
          res.status(400).json({failure: "Passenger has 3 items already", items_added: rounds});
        }
      }
    } catch (e) {
      return next(e);
    }
  }
  
  async getAllPassengers(req, res, next) {
    try {
    const service = new AirportService();
    const result = await service.getAllPassengers("passengers");

    res.status(200).json(result);
    } catch (e) {
      return next(e)
    }
  }

  async getPassengerById(req, res, next) {
    try {
      const service = new AirportService();
      const search_id = req.params.search_id;
      const [result] = await service.getPassengerById(parseInt(search_id), "passengers");
      const packages = await service.getPassengersPackages(parseInt(search_id));

      res.status(200).json({result, packages})
    } catch (e) {
      return next(e)
    }
  }

  async removePassengerById(req, res, next) {
    try {
      const service = new AirportService();
      const search_id = req.params.search_id;
      await service.removePassengerById(search_id, "passengers");
      res.status(200).json({success: "Passenger checked out, thanks :)"});
    } catch (e) {
      return next(e)
    }
  }
}

module.exports = {
	AirportController,
};