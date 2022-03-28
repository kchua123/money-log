const Sequelize = require("sequelize");
const db = require("../db");

const Month = db.define("month", {
  month: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  year: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Month;
