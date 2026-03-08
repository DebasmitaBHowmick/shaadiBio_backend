const express = require("express");
const router = express.Router();

const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const authMiddleware = require("../middleware/authMiddleware");



/*
REGISTER
POST /api/auth/register
*/
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;


    // check missing fields
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields required"
      });
    }


    // check existing user
    const existingUser = await User.findOne({
      email
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }


    // hash password
    const hashedPassword = await bcrypt.hash(
      password,
      10
    );


    // create user
    const user = new User({
      name,
      email,
      password: hashedPassword
    });


    await user.save();


    res.status(201).json({
      message: "User registered successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
LOGIN
POST /api/auth/login
*/
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;


    const user = await User.findOne({
      email
    });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }


    // compare password
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }


    // create token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "10d"
      }
    );


    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});



/*
GET CURRENT USER
GET /api/auth/me
*/
router.get("/me", authMiddleware, async (req, res) => {

  try {

    const user = await User.findById(
      req.userId
    ).select("-password");


    res.json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});


module.exports = router;