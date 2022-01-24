const router = require("express").Router();
const Category = require("../db/models/Category");
module.exports = router;

router.get("/", async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      order: [
        ["name", "ASC"],
      ],
    });
    res.send(categories);
  } catch (err) {
    next(err);
  }
});