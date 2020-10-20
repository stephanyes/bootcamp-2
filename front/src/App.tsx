import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import BuildDynamicTable from "./components/Table/Table";
import AddPassenger from "./components/Passengers/Passenger";
import AddPackage from "./components/Packages/Package";
import PassengerInfo from "./components/PassengerInfo/Passenger_info";
import NotFound from "./components/404/NotFound";

function App() {
  return (
    <div className="App">
      <h1>Bootcamp 2</h1>
      <Switch>
        <Route exact path="/" component={BuildDynamicTable} />
        <Route exact path="/add-passenger" component={AddPassenger} />
        <Route exact path="/add-package" component={AddPackage} />
        <Route exact path="/passenger/:passengerId" component={PassengerInfo} />
        <Route path="*" component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
