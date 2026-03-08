const express = require("express");
const router = express.Router();

const Biodata = require("../models/Biodata");
const authMiddleware = require("../middleware/authMiddleware");


/*
CREATE BIODATA
POST /api/biodata
*/
router.post("/", authMiddleware, async (req, res) => {

  try {

    const biodata = new Biodata({
      userId: req.userId,
      ...req.body
    });

    await biodata.save();

    res.status(201).json({
      message: "Biodata created",
      biodata
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
GET ALL BIODATA OF LOGGED USER
GET /api/biodata
*/
router.get("/", authMiddleware, async (req, res) => {

  try {

    const biodata = await Biodata.find({
      userId: req.userId
    });

    res.json(biodata);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
GET SINGLE BIODATA
GET /api/biodata/:id
*/
router.get("/:id", authMiddleware, async (req, res) => {

  try {

    const biodata = await Biodata.findById(req.params.id);

    if (!biodata) {
      return res.status(404).json({
        message: "Biodata not found"
      });
    }

    res.json(biodata);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
UPDATE BIODATA
PUT /api/biodata/:id
*/
router.put("/:id", authMiddleware, async (req, res) => {

  try {

    const biodata = await Biodata.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!biodata) {
      return res.status(404).json({
        message: "Biodata not found"
      });
    }

    res.json({
      message: "Biodata updated",
      biodata
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
DELETE BIODATA
DELETE /api/biodata/:id
*/
router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const biodata = await Biodata.findByIdAndDelete(
      req.params.id
    );

    if (!biodata) {
      return res.status(404).json({
        message: "Biodata not found"
      });
    }

    res.json({
      message: "Biodata deleted"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;