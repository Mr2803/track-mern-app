const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const requireAuth = require("../../middlewares/requireAuth");

const Track = require("../../models/Track");

//every route is private
router.use(requireAuth);

// @route   GET api/tracks
// @desc    get all tracks
// @access  private
router.get("/", async (req, res) => {
  const tracks = await Track.find({ userId: req.user._id });

  res.send(tracks);
});

// @route   Post api/tracks
// @desc    create a track
// @access  private

router.post("/", async (req, res) => {
  const { name, locations } = req.body;

  if (!name || !locations) {
    res.status(422).send({ error: "Devi inserire un nome e un luogo" });
  }

  try {
    const track = new Track({
      name,
      locations,
      userId: req.user._id,
    });
    await track.save();

    res.send(track);
  } catch (error) {
    res.status(422).send({ error: error.message });
  }
});

module.exports = router;
