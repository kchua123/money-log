const router = require('express').Router()
const Expense = require('../db/models/Expense')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const expenses = await Expense.findAll()
    res.send(expenses)
  } catch (err) {
    next(err)
  }
})

router.post("/", async (req, res, next) => {
  try {
    res.send(await Expense.create(req.body));
  } catch (error) {
    next(error);
  }
});