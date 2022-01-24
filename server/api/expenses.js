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

router.put("/", async (req, res, next) => {
  try {
    console.log("*** REQ.BODY FROM PUT REQUEST: ", req.body);
    const expense = await Expense.findByPk(req.body.id);
    await expense.update(req.body);

    res.status(200).send(expense);
  } catch (error) {
    next(error);
  }
});

router.get("/:year/:month", async (req, res, next) => {
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
