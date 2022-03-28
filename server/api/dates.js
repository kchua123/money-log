const router = require("express").Router();
const Month = require("../db/models/Month");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const months = await Month.findAll({
      order: [
        ["year", "DESC"],
        ["month", "DESC"],
      ],
    });
    res.send(months);
  } catch (err) {
    next(err);
  }
});


router.post("/", async (req, res, next) => {
  try {
    res.send(await Month.create(req.body));
  } catch (error) {
    next(error);
  }
});

