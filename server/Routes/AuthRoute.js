const { Signup, Login,verifyOtp } = require('../Controllers/AuthController');
const { userVerification } = require('../Middlewares/AuthMiddleware');
const router = require('express').Router();
const multer = require('multer');

// Configure multer with memory storage to handle files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/signup',upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'certificate', maxCount: 1 }]) ,Signup);
router.post('/login', Login);
router.post('/verifyOtp', verifyOtp);
router.post('/', userVerification, (req, res) => {
  res.json({ status: true, user: req.user.username });

});


// AuthRoute.js
// Profile route
router.get('/profile', userVerification, (req, res) => {
  if (req.body.status) {
    res.json({ status: true, username: req.body.user });
  } else {
    res.status(401).json({ status: false, message: 'Unauthorized' });
  }
});



module.exports = router;
