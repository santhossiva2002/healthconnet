// const Admin = require('../Models/admin');
// const User = require('../Models/UserModel');
// const transporter = require('../util/nodemailer');
// const { createSecretToken } = require("../util/SecretToken");

// module.exports.login = async (req, res) => {
//     const { email, password } = req.body;
  
//     try {
//         const admin = await Admin.findOne({ email });
//         if (!admin || !(await admin.comparePassword(password))) {
//             return res.status(401).json({ message: 'Invalid credentials' });
//         }
//         const token = createSecretToken(admin._id); // Corrected: Use `admin` instead of `user`
//         res.cookie("token", token, {
//             httpOnly: true, // Consider setting httpOnly to true for security
//             secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
//             sameSite: 'strict', // Prevent cross-site request forgery
//         });
//         res.status(200).json({ message: "Admin logged in successfully", success: true });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports.logout = (req, res) => {
//     res.clearCookie('token', {
//         httpOnly: true, // Consider setting httpOnly to true for security
//         secure: process.env.NODE_ENV === 'production', // Secure cookies only in production
//         sameSite: 'strict', // Prevent cross-site request forgery
//     });
//     res.status(200).json({ message: 'Logout successful' });
// };

// module.exports.verifyDoctor = async (req, res) => {
//     if (!req.user || req.user.userType !== 'Admin') {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     try {
//         const { userId } = req.params;
//         const user = await User.findById(userId);
  
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
  
//         user.isVerified = true;
//         await user.save();
  
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: 'Verification Successful',
//             text: 'You are now verified and can log in.',
//         };
  
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ message: 'Error sending email' });
//             }
//             console.log('Email sent: ' + info.response);
//         });
  
//         res.status(200).json({ message: 'User verified successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };
  
// module.exports.discardDoctor = async (req, res) => {
//     if (!req.user || req.user.userType !== 'Admin') {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     try {
//         const { userId } = req.params;
//         const { reason } = req.body;
//         const user = await User.findById(userId);
  
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
  
//         const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: 'Verification Failed',
//             text: `Your verification has been discarded due to the following reason: ${reason}`,
//         };
  
//         transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//                 console.error('Error sending email:', error);
//                 return res.status(500).json({ message: 'Error sending email' });
//             }
//             console.log('Email sent: ' + info.response);
//         });
  
//         await user.deleteOne();
  
//         res.status(200).json({ message: 'User discarded successfully' });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// };

// module.exports.getDoctors = async (req, res) => {
//     if (!req.user || req.user.userType !== 'Admin') {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }
  
//     try {
//         const doctors = await User.find({ userType: 'Doctor' });
//         res.status(200).json(doctors);
//     } catch (err) {
//         console.error('Error fetching doctors:', err);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };


const Admin = require('../Models/admin');
const User = require('../Models/UserModel');
const transporter = require('../util/nodemailer');
const { createSecretToken } = require("../util/SecretToken");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = createSecretToken(admin._id);
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: "Admin logged in successfully", success: true });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports.logout = (req, res) => {
    res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
    });

    res.status(200).json({ message: 'Logout successful' });
};

module.exports.verifyDoctor = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.isVerified = true;
        await user.save();

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verification Successful',
            text: 'You are now verified and can log in.',
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending verification email:', error);
                return res.status(500).json({ message: 'Error sending verification email' });
            }
            console.log('Verification email sent: ' + info.response);
        });

        res.status(200).json({ message: 'User verified successfully' });
    } catch (err) {
        console.error('Verification error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports.discardDoctor = async (req, res) => {
    try {
        const { userId } = req.params;
        const { reason } = req.body;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: 'Verification Failed',
            text: `Your verification has been discarded due to the following reason: ${reason}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending discard email:', error);
                return res.status(500).json({ message: 'Error sending discard email' });
            }
            console.log('Discard email sent: ' + info.response);
        });

        await user.deleteOne();

        res.status(200).json({ message: 'User discarded successfully' });
    } catch (err) {
        console.error('Discard error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};

module.exports.getDoctors = async (req, res) => {
    try {
        const doctors = await User.find({ userType: 'Doctor' });
        res.status(200).json(doctors);
    } catch (err) {
        console.error('Fetching doctors error:', err);
        res.status(500).json({ message: 'Internal server error', error: err.message });
    }
};
