

const express = require('express');
const router = express.Router();

const { userVerificationWithInfo } = require('../Middlewares/AuthMiddleware'); // Import your auth middleware
const postController = require('../Controllers/postController'); // Import the post controller
const multer = require('multer');

// Configure multer to handle file uploads
const storage = multer.memoryStorage(); // Use memory storage to get file buffer
const upload = multer({ storage: storage });
// Route to create a generic post
router.post('/post', userVerificationWithInfo, upload.single('image'), postController.createPost);

// Route to fetch all posts for the authenticated user
router.get('/posts', userVerificationWithInfo, postController.getUserPosts);

// Route to fetch all posts from the collection
router.get('/all-posts', postController.getAllPosts);

// Route to create a new donation promotion
router.post('/donation', userVerificationWithInfo, upload.single('image'), postController.createDonationPromotion);

// Route to fetch all donation promotions
router.get('/all-donations', postController.getAllDonationPromotions); // Fixed function name

// Route to fetch all blood bank requests
router.get('/all-bloodbanks', postController.getAllBloodBankRequests); // Fixed function name

// Route to create a new blood bank request
router.post('/bloodbank', userVerificationWithInfo, postController.createBloodBankRequest);

module.exports = router;
