const express = require('express');
const axios = require('axios');
const router = express.Router();

// Load environment variables
require('dotenv').config();

// Define your NHS API key and base URL
const NHS_API_KEY = process.env.NHS_API_KEY;
const NHS_API_BASE_URL = process.env.NHS_API_URL;

// Define the route to fetch condition details
router.get('/:condition', async (req, res) => {
  const condition = req.params.condition;
  try {
    // Make a request to the NHS API with subscription key in headers
    const response = await axios.get(`${NHS_API_BASE_URL}/conditions/${condition}`, {
      headers: {
        'Content-Type': 'application/json',
        'subscription-key': NHS_API_KEY  // Ensure this is correct as per the API documentation
      }
    });
    
    // Send the data back to the client
    res.json(response.data);
  } catch (error) {
    console.error(error);
    // Provide a more informative error response
    if (error.response) {
      // The request was made and the server responded with a status code
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res.status(500).send('No response received from NHS API');
    } else {
      // Something happened in setting up the request
      res.status(500).send('Error setting up request to NHS API');
    }
  }
});

// Log environment variables for debugging
console.log('NHS_API_URL:', NHS_API_BASE_URL);
console.log('NHS_API_KEY:', NHS_API_KEY);

module.exports = router;
