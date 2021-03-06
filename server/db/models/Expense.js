const Sequelize = require("sequelize");
const db = require("../db");

const Expense = db.define("expense", {
  cost: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  day: {
    type: Sequelize.STRING,
  },
  month: {
    type: Sequelize.STRING,
  },
  year: {
    type: Sequelize.STRING,
  },
  category: {
    type: Sequelize.STRING,
    allowNull: false,
    defaultValue: "Other",
  },
  vendor: {
    type: Sequelize.STRING,
  },
});

module.exports = Expense;
