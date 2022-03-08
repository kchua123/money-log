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

router.get("/:id", async (req, res, next) => {
  try {
    const category = await Category.findByPk(req.params.id);
    res.json(category);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log("REQ.BODY: ", req.body)
    res.send(await Category.create(req.body));
  } catch (error) {
    next(error);
  }
});