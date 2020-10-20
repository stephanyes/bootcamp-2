const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passenger_routes = require('./routes/routes')
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: '100kb' }));
// routes
app.use('/', passenger_routes);

app.listen(3001, () => {
  console.log("You are in server 3001!");
})