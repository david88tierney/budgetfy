const db = require("../models");
const Team = db.teams;
const Op = db.Sequelize.Op;

// Create and Save a new Team
exports.create = (req, res) => {
    // Validate request
    // console.log(req.body.name);
    if (!req.body.name) {
      res.status(400).send({
        // alert: 'What is your teams name?',
        message: "What is your teams name?"
      });
      return;
    }
  
    // Create a Team
    const team = {
      name: req.body.name
    };
  
    // Save Tutorial in the database
    Team.create(team)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Team."
        });
      });
  };

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
    const name = req.query.name;
    var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
    Team.findAll({ where: condition })
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving team."
        });
      });
  };

// Find a single Team with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Team.findByPk(id)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving Team with id=" + id
        });
      });
  };

// Update a Team name by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;
  
    Team.update(req.body, {
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Team was updated successfully."
          });
        } else {
          res.send({
            message: `Cannot update Team with id=${id}. Maybe Team was not found or req.body is empty!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Team with id=" + id
        });
      });
  };

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;
  
    Team.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "Team was deleted successfully!"
          });
        } else {
          res.send({
            message: `Cannot delete Team with id=${id}. Maybe Team was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete Team with id=" + id
        });
      });
  };
  
//                                          DO NOT NEED BUT GOOD FOR FUTURE REFERENCE
// // Delete all Team from the database.
// exports.deleteAll = (req, res) => {
//     Team.destroy({
//       where: {},
//       truncate: false
//     })
//       .then(nums => {
//         res.send({ message: `${nums} Teams were deleted successfully!` });
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while removing all teams."
//         });
//       });
//   };


//                                          DO NOT NEED BUT GOOD FOR FUTURE REFERENCE
// Find all published Tutorials
// exports.findAllPublished = (req, res) => {
//     Tutorial.findAll({ where: { published: true } })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving tutorials."
//         });
//       });
//   };