// const User = require("../Models/UserModel");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");

// module.exports.userVerification = async (req, res) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false });
//   }
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.json({ status: false });
//     } else {
//       const user = await User.findById(data.id).select('-password -otp -otpExpires'); // Exclude sensitive fields
//       if (user) return res.json({ status: true, user });
//       else return res.json({ status: false });
//     }
//   });
// };


// file: middlewares/AuthMiddleware.js
// const jwt = require('jsonwebtoken');
// const User = require('../Models/UserModel');

// module.exports.userVerification = async (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.status(401).json({ status: false, message: 'Unauthorized' });
//   }
  
//   jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
//     if (err) {
//       return res.status(401).json({ status: false, message: 'Unauthorized' });
//     }

//     const user = await User.findById(data.id).select('-password -otp -otpExpires'); // Exclude sensitive fields
//     if (user) {
//       req.user = user;
//       next();
//     } else {
//       res.status(401).json({ status: false, message: 'Unauthorized' });
//     }
//   });
// };
const jwt = require('jsonwebtoken');
const User = require('../Models/UserModel');

module.exports.userVerificationWithInfo = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ status: false, message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.status(401).json({ status: false, message: 'Unauthorized' });
    }

    try {
      const user = await User.findById(data.id).select('-password -otp -otpExpires'); // Exclude sensitive fields

      if (!user) {
        return res.status(401).json({ status: false, message: 'Unauthorized' });
      }

      req.user = user;

      // Continue to the next middleware or route handler
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: 'Internal server error' });
    }
  });
};

module.exports.userVerification = async (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }

    try {
      const user = await User.findById(data.id).select('-password -otp -otpExpires'); // Exclude sensitive fields

      if (!user) {
        return res.json({ status: false });
      }

      return res.json({ status: true, user });
    } catch (error) {
      console.error(error);
      res.json({ status: false });
    }
  });
};
