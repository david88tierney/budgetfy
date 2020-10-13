const db = require("../models");
const Team = db.teams;
const Bill = db.bills;
const Op = db.Sequelize.Op;
// This is just a single use.  need to link team to bills
// Create and Save a new Team

exports.createTeam = (team) => {
  return Team.create({
    name: team.name
  })
    .then((team) => {
      console.log(">> Created team: " + JSON.stringify(team, null, 4));
      return team;
    })
    .catch((err) => {
      console.log(">> Error while creating team: ", err);
    });
};

exports.createBill = (teamId, bill) => {
  return Bill.create({
    billName: bill.billName,
    billAmount:  bill.billAmount,
    teamId: teamId,
  })
    .then((bill) => {
      console.log(">> Bill added to team: " + JSON.stringify(bill, null, 4));
      return bill;
    })
    .catch((err) => {
      console.log(">> Error while creating a bill: ", err);
    });
};

// Get the bills for a given team
exports.findTeamById = (teamId) => {
  return Team.findByPk(teamId, { include: ["bills"] })
    .then((team) => {
      return team;
    })
    .catch((err) => {
      console.log(">> Error while finding team: ", err);
    });
};

// Get the comments for a given comment id
exports.findBillById = (id) => {
  return Bill.findByPk(id, { include: ["team"] })
    .then((bill) => {
      return bill;
    })
    .catch((err) => {
      console.log(">> Error while finding bill: ", err);
    });
};

// Get all Tutorials include comments
exports.findAll = () => {
  return Team.findAll({
    include: ["bills"],
  }).then((teams) => {
    return teams;
  });
};

// exports.create = (req, res) => {
//     // Validate request
//     // console.log(req.body.name);
//     if (!req.body.name) {
//       res.status(400).send({
//         // alert: 'What is your teams name?',
//         message: "What is your teams name?"
//       });
//       return;
//     }
  
//     // Create a Team
//     const team = {
//       name: req.body.name
//     };
  
//     // Save Tutorial in the database
//     Team.create(team)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while creating the Team."
//         });
//       });
//   };

  // exports.createTeam = (team) => {
  //   return Team.create({
  //     name: team.name
  //   })
  //     .then((team) => {
  //       // May need to look up stringify
  //       console.log(">> Created team: " + JSON.stringify(team, null, 4));
  //       return team;
  //     })
  //     .catch((err) => {
  //       console.log(">> Error while creating team: ", err);
  //     });
  // };

  // exports.createBill = (teamId, bill) => {
  //   return Bill.create({
  //     billName: bill.billName,
  //     billAmount: bill.text,
  //     teamId: teamId,
  //   })
  //     .then((bill) => {
  //       console.log(">> Bill comment: " + JSON.stringify(bill, null, 4));
  //       return bill;
  //     })
  //     .catch((err) => {
  //       console.log(">> Error while creating bill: ", err);
  //     });
  // };

// Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//     const name = req.query.name;
//     var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  
//     Team.findAll({ where: condition })
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message:
//             err.message || "Some error occurred while retrieving team."
//         });
//       });
//   };

// Find a single Team with an id
// exports.findOne = (req, res) => {
//     const id = req.params.id;
  
//     Team.findByPk(id)
//       .then(data => {
//         res.send(data);
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error retrieving Team with id=" + id
//         });
//       });
//   };

// Update a Team name by the id in the request
// exports.update = (req, res) => {
//     const id = req.params.id;
  
//     Team.update(req.body, {
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Team was updated successfully."
//           });
//         } else {
//           res.send({
//             message: `Cannot update Team with id=${id}. Maybe Team was not found or req.body is empty!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Error updating Team with id=" + id
//         });
//       });
//   };

// Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//     const id = req.params.id;
  
//     Team.destroy({
//       where: { id: id }
//     })
//       .then(num => {
//         if (num == 1) {
//           res.send({
//             message: "Team was deleted successfully!"
//           });
//         } else {
//           res.send({
//             message: `Cannot delete Team with id=${id}. Maybe Team was not found!`
//           });
//         }
//       })
//       .catch(err => {
//         res.status(500).send({
//           message: "Could not delete Team with id=" + id
//         });
//       });
//   };
  
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