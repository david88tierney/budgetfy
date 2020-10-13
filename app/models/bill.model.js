module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define("bill", {
      billName: {
        type: DataTypes.STRING
      },
      billAmount: {
        type: DataTypes.INTEGER
      }
    //   Will need to add dueDate
    //   dueDate: {
    //       type: DataTypes.DATE
    //   }
    });
    return Bill;
  };