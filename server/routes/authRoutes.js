const jwt = require("jsonwebtoken");

const express = require("express");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

const User = require("../models/User");

const router = express.Router();


router.post("/register", async (req, res)=> {
    try {
        
        const {
            name,
            email,
            password
        } = req.body;

        const existingUser = await User.findOne({email});

        if (existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "User registered successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});

router.post("/login", async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid Credentials"
      });
    }

    const token = jwt.sign(
      {
        userId: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({
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


router.get("/profile",authMiddleware,async (req, res) => {
    res.json({
      message:"Protected Route",
      user: req.user
    });
  }
);

router.get("/me",authMiddleware,async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).select("-password");
      if (!user) {
        return res.status(404).json({message: "User not found"});
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({message: error.message});
    }
  }
);

module.exports = router;
