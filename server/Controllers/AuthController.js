// const User = require("../Models/UserModel");
// const crypto = require('crypto');
// const { createSecretToken } = require("../util/SecretToken");
// const bcrypt = require("bcryptjs");
// const transporter = require('../util/nodemailer');

// module.exports.Signup = async (req, res) => {
//   try {
//     const { email, password, username, dateOfBirth, bio, userType, contactNumber, city, hospital, createdAt } = req.body;
//     const profilePicture = req.files.profilePicture ? req.files.profilePicture[0].path : null;
//     const certificate = userType === 'Doctor' ? (req.files.certificate ? req.files.certificate[0].path : null) : null;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user with plain text password
//     const user = await User.create({
//       email,
//       password, // Store the plain text password
//       username,
//       dateOfBirth,
//       bio,
//       userType,
//       profilePicture,
//       contactNumber,
//       city,
//       hospital,
//       certificate,
//       createdAt
//     });

//     // Generate and set a token
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });

//     // Handle different user types
//     if (userType === 'Common') {
//       // Generate OTP for common users
//       const otp = crypto.randomBytes(3).toString('hex');
//       const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//       // Update the user with OTP and expiration
//       user.otp = otp;
//       user.otpExpires = otpExpires;
//       await user.save(); // Save the OTP to the database

//       // Send OTP email
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: email,
//         subject: 'Verify your account',
//         text: `Your OTP is ${otp}. It will expire in 10 minutes.`
//       };

//       await transporter.sendMail(mailOptions);
//       return res.status(201).json({ message: 'User created successfully. Please verify your OTP.' });
      
//     } else if (userType === 'Doctor') {
//       // Notify admin for doctor verification
//       const adminEmail = process.env.EMAIL_USER;
//       const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: adminEmail,
//         subject: 'Doctor Verification Required',
//         text: `A new doctor has signed up. Please review and verify the doctor.\n\nName: ${username}\nEmail: ${email}\nCity: ${city}\nHospital: ${hospital}`
//       };

//       await transporter.sendMail(mailOptions);
//       return res.status(201).json({ message: 'Doctor user created successfully. Awaiting admin approval.' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// module.exports.verifyOtp = async (req, res) => {
//   const { email, otp } = req.body;

//   try {
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(400).json({ error: 'User not found.' });
//     }

//     if (user.otp !== otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ error: 'Invalid or expired OTP.' });
//     }

//     user.isVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     await user.save();

//     res.status(200).json({ message: 'Account verified successfully.' });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



// module.exports.Login = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: 'Incorrect password or email' });
//     }

//     // Compare the provided password with the stored plain text password
//     if (password !== user.password) {
//       console.log('input: ',password);
//       console.log('output: ',password);
//       return res.status(400).json({ message: 'Incorrect password or email' });
//     }

//     if (!user.isVerified) {
//       return res.status(400).json({ error: 'Please verify your account first.' });
//     }

//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });
//     res.status(200).json({ message: "User logged in successfully", success: true });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
// module.exports.getUserInfo = async (req, res) => {
//   try {
//     const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
//     const user = await User.findById(userId).select("-password -otp -otpExpires"); // Exclude sensitive fields

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ success: true, user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

// const User = require("../Models/UserModel");
// const crypto = require('crypto');
// const { createSecretToken } = require("../util/SecretToken");
// const transporter = require('../util/nodemailer');

// module.exports.Signup = async (req, res) => {
//   try {
//     const { email, password, username, dateOfBirth, bio, userType, contactNumber, city, hospital, createdAt } = req.body;
//     const profilePicture = req.files.profilePicture ? req.files.profilePicture[0].path : null;

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     // Create a new user with plain text password
//     const user = await User.create({
//       email,
//       password, // Store the plain text password
//       username,
//       dateOfBirth,
//       bio,
//       userType,
//       profilePicture,
//       contactNumber,
//       city,
//       hospital,
//       createdAt
//     });

//     // Generate and set a token
//     const token = createSecretToken(user._id);
//     res.cookie("token", token, {
//       withCredentials: true,
//       httpOnly: false,
//     });

//     // Generate OTP for both doctor and common users
//     const otp = crypto.randomBytes(3).toString('hex');
//     const otpExpires = Date.now() + 10 * 60 * 1000; // 10 minutes

//     // Update the user with OTP and expiration
//     user.otp = otp;
//     user.otpExpires = otpExpires;
//     await user.save(); // Save the OTP to the database

//     // Send OTP email
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: 'Verify your account',
//       text: `Your OTP is ${otp}. It will expire in 10 minutes.`
//     };

//     await transporter.sendMail(mailOptions);
//     return res.status(201).json({ message: 'User created successfully. Please verify your OTP.' });

//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };

const User = require("../Models/UserModel");
const crypto = require('crypto');
const { createSecretToken } = require("../util/SecretToken");
const transporter = require('../util/nodemailer');
const { bucket } = require('../config/firebase');

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, dateOfBirth, bio, userType, contactNumber, city, hospital, createdAt } = req.body;
    const profilePicture = req.files.profilePicture ? req.files.profilePicture[0] : null;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    let profilePictureUrl = null;

    if (profilePicture) {
      try {
        const fileName = `profile-pictures/${Date.now()}_${profilePicture.originalname}`;
        const fileUpload = bucket.file(fileName);

        if (!profilePicture.buffer) {
          return res.status(400).json({ error: 'Failed to read the uploaded profile picture.' });
        }

        await fileUpload.save(profilePicture.buffer, {
          metadata: {
            contentType: profilePicture.mimetype,
          },
        });

        await fileUpload.makePublic();
        profilePictureUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } catch (uploadError) {
        console.error('Error uploading profile picture:', uploadError);
        return res.status(500).json({ error: 'Failed to upload profile picture.' });
      }
    }

    // Determine if the user is a doctor
    const isDoctor = userType === 'Doctor';

    // Create a new user with plain text password and profile picture URL
    const user = await User.create({
      email,
      password, 
      username,
      dateOfBirth,
      bio,
      userType,
      profilePicture: profilePictureUrl,
      contactNumber,
      city,
      hospital,
      createdAt,
      isDoctor, // Set the isDoctor field based on userType
    });

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });

    const otp = crypto.randomBytes(3).toString('hex');
    const otpExpires = Date.now() + 10 * 60 * 1000; 

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify your account',
      text: `Your OTP is ${otp}. It will expire in 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);
    return res.status(201).json({ message: 'User created successfully. Please verify your OTP.' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: 'User not found.' });
    }

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ error: 'Invalid or expired OTP.' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    res.status(200).json({ message: 'Account verified successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Incorrect password or email' });
    }

    // Compare the provided password with the stored plain text password
    if (password !== user.password) {
      console.log('input: ',password);
      console.log('output: ',password);
      return res.status(400).json({ message: 'Incorrect password or email' });
    }

    if (!user.isVerified) {
      return res.status(400).json({ error: 'Please verify your account first.' });
    }

    const token = createSecretToken(user._id);
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res.status(200).json({ message: "User logged in successfully", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};
module.exports.getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id; // Assuming the user ID is passed as a URL parameter
    const user = await User.findById(userId).select("-password -otp -otpExpires"); // Exclude sensitive fields

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};