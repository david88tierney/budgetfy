const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const controller = require('./app/controllers/team.controller');
const app = express();

//Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');

//Sets handlebars configurations (we will go through them later on)
app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts',
  }));

  app.use(express.static('public'));

  app.get('/', (req, res) => {
    //Serves the body of the page aka "main.handlebars" to the container //aka "index.handlebars"
    res.render('main', {layout : 'index'});
    });

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('Hello World !'));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to budgetfy application." });
});

const db = require("./app/models");
// db.sequelize.sync();

const run = async () => {
  const team1 = await controller.createTeam({
    name: "David's Team"
  });

  const team2 = await controller.createTeam({
    name: "Second Team"
  });

  const bill1 = await controller.createBill(team1.id, {
    billName: "Water Bill",
    billAmount: 0
  });

  await controller.createBill(team1.id, {
    billName: "Car Bill",
    billAmount: 500
  });

  const bill2 = await controller.createBill(team2.id, {
    billName: "Rent Bill",
    billAmount: 900
  });

  await controller.createBill(team2.id, {
    billName: "Electric Bill",
    billAmount: 150
  });


  const team1Data = await controller.findTeamById(team1.id);
  console.log(
    ">> Team id=" + team1Data.id,
    JSON.stringify(team1Data, null, 2)
  );

  const team2Data = await controller.findTeamById(team2.id);
  console.log(
    ">> Team id=" + team2Data.id,
    JSON.stringify(team2Data, null, 2)
  );

  const bill1Data = await controller.findBillById(bill1.id);
  console.log(
    ">> Bill id=" + bill1.id,
    JSON.stringify(bill1Data, null, 2)
  );

  const bill2Data = await controller.findBillById(bill2.id);
  console.log(
    ">> Bill id=" + bill2.id,
    JSON.stringify(bill2Data, null, 2)
  );

  const teams = await controller.findAll();
  console.log(">> All teams", JSON.stringify(teams, null, 2));
};

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
    run();
  });

// set port, listen for requests

require("./app/routes/team.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});