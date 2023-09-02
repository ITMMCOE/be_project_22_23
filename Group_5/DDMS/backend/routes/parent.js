const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { isLoggedIn, isFacultyOrAdmin, validateUser } = require("../middleware");
const { Parent } = require("../models/parents");

router.route("/:id").put(
  catchAsync(async (req, res) => {
    const result = await Parent.update(
      { ...req.body },
      { where: { StudentUserId: req.params.id } }
    );
    res.send({ status: "success", objects: null, err: null });
  })
);

module.exports = router;
