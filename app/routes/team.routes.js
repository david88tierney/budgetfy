module.exports = app => {
    const teams = require("../controllers/team.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Teams
    router.post("/", teams.create);
  
    // Retrieve all Teams
    // Don't need now but may want to have a list of teams to choose in the future if you live in multiple houses?
    router.get("/", teams.findAll);
  
    // Retrieve all published Teams
    // Don't need now but may want to have a list of teams to choose in the future if you live in multiple houses?
    // router.get("/published", teams.findAllPublished);
  
    // Retrieve a single Team with id
    router.get("/:id", teams.findOne);
  
    // Update a Team with id
    router.put("/:id", teams.update);
  
    // Delete a Team with id
    router.delete("/:id", teams.delete);
  
    app.use('/api/teams', router);
  };