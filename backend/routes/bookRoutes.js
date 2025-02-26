const express = require("express");
const bookController = require("../controllers/bookController");

const router = express.Router();

router.post("/", bookController.createBook);
router.get("/", bookController.getAllBooks);
router.put("/:id", bookController.updateBook);
router.put("/delete/:id", bookController.softDeleteBook);

module.exports = router;
