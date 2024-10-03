const User = require('../Models/UserModel');

// module.exports.getUserProfile = async (req, res) => {
//   try {
//     // The user ID should be available from the middleware (userVerification)
//     const userId = req.userId; // Ensure that you store the user ID in req.userId in your middleware

//     // Fetch the user data from the database
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Send the user data to the frontend
//     res.status(200).json({
//       username: user.username,
//       email: user.email,
//       dateOfBirth: user.dateOfBirth,
//       bio: user.bio,
//       userType: user.userType,
//       contactNumber: user.contactNumber,
//       city: user.city,
//       hospital: user.hospital,
//       certificate: user.certificate,
//       profilePicture: user.profilePicture,
//       createdAt: user.createdAt,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };
