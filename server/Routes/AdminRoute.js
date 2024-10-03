// const { login, logout,verifyDoctor,discardDoctor,getDoctors} = require('../Controllers/AdminController');
// const { userVerification } = require('../Middlewares/AuthMiddleware');
// const router = require('express').Router();

// // Admin login
// router.post('/login', login);

// // Admin logout
// router.get('/logout', logout);

// // Apply authentication middleware to the following routes
// router.use(userVerification);

// // Verify doctor
// router.put('/verify/:userId', verifyDoctor);

// // Discard doctor
// router.delete('/discard/:userId', discardDoctor);

// // Fetch doctors
// router.get('/doctors', getDoctors);

// module.exports = router;

const { login, logout, verifyDoctor, discardDoctor, getDoctors } = require('../Controllers/AdminController');
const router = require('express').Router();

// Admin login
router.post('/login', login);

// Admin logout
router.get('/logout', logout);

// Verify doctor
router.put('/verify/:userId', verifyDoctor);

// Discard doctor
router.delete('/discard/:userId', discardDoctor);

// Fetch doctors
router.get('/doctors', getDoctors);

module.exports = router;
