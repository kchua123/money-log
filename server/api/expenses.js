const router = require("express").Router();
const Expense = require("../db/models/Expense");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const expenses = await Expense.findAll({
      order: [
        ["year", "DESC"],
        ["month", "DESC"],
        ["day", "DESC"],
      ],
    });
    res.send(expenses);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    res.json(expense);
  } catch (error) {
    next(error);
  }
});


router.put("/:id", async (req, res, next) => {
  try {
    console.log("*** REQ.BODY FROM PUT REQUEST: ", req.params.id);
    const updatedExpense = await Expense.findByPk(req.params.id);
    res.send(await updatedExpense.update(req.body));
  } catch (error) {
    next(error);
  }
});

router.get("/monthly/:year/:month", async (req, res, next) => {
  try {
    console.log("***REQ.PARAMS FROM MONTH ROUTE: ", req.params);
    const expenses = await Expense.findAll({
      where: {
        year: req.params.year,
        month: req.params.month,
      },
      order: [["day", "DESC"]],
    });
    res.send(expenses);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.send(await Expense.create(req.body));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const expense = await Expense.findByPk(req.params.id);
    await expense.destroy();
    res.send(expense);
  } catch (error) {
    next(error);
  }
});

