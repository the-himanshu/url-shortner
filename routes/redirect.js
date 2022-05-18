const express = require("express");

const router = express.Router();

const Url = require("../models/urlModel");

router.get("/:code", async (req, res) => {
  try {
    const url = await Url.findOne({
      urlCode: req.params.code,
    });
    if (url) {
      // when valid we perform a redirect
      return res.redirect(url.longUrl);
    } else {
      // else return a not found 404 status
      return res.status(404).json("No URL Found");
    }
  } catch (err) {
    // exception handler
    logger.error(err);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
