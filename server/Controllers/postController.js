// const Post = require('../Models/PostModel'); // Import your Post model
// const Donation = require('../Models/DonationModel'); // Import your Donation model
// const BloodBank = require('../Models/BloodBankModel'); // Import your BloodBank model

// // Create a new generic post
// exports.createPost = async (req, res) => {
//   try {
//     console.log('File:', req.file); // Check if file is uploaded
//     console.log('Body:', req.body); // Check if form data is received

//     if (!req.file) {
//       return res.status(400).json({ status: false, message: 'No file uploaded' });
//     }

//     const { content } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const newPost = new Post({
//       content,
//       image,
//       author: req.user._id, // Assuming req.user contains the authenticated user
//     });

//     await newPost.save();
//     res.json({ status: true, message: 'Post created successfully' });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all posts for the authenticated user
// exports.getUserPosts = async (req, res) => {
//   try {
//     // Fetch the user's posts from the database
//     const posts = await Post.find({ author: req.user._id })
//       .sort({ createdAt: -1 }) // Optional: sort posts by creation date in descending order
//       .populate('author', 'username profilePicture') // Populate author details if necessary
//       .exec(); // Execute the query
    
//     // Respond with the posts
//     res.json({ status: true, posts });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all posts from the collection
// exports.getAllPosts = async (req, res) => {
//   try {
//     // Fetch all posts from the database
//     const posts = await Post.find()
//       .sort({ createdAt: -1 }) // Optional: sort posts by creation date in descending order
//       .populate('author', 'username profilePicture') // Populate author details if necessary
//       .exec(); // Execute the query

//     // Respond with the posts
//     res.json({ status: true, posts });
//   } catch (error) {
//     console.error('Error fetching all posts:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Create a new donation promotion post
// exports.createDonationPromotion = async (req, res) => {
//   try {
//     const { content, goal, deadline, beneficiary, paymentDetails } = req.body;
//     const image = req.file ? req.file.filename : null;

//     const missingFields = validateFields(req.body, ['content', 'goal', 'deadline']);
//     if (missingFields) {
//       return res.status(400).json({ status: false, message: `Missing fields: ${missingFields.join(', ')}` });
//     }

//     const newDonation = new Donation({
//       content,
//       image,
//       goal,
//       deadline,
//       beneficiary,
//       paymentDetails,
//       author: req.user._id,
//     });

//     await newDonation.save();
//     res.json({ status: true, message: 'Donation promotion created successfully' });
//   } catch (error) {
//     console.error('Error creating donation promotion:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all donation promotions sorted by deadline
// exports.getAllDonationPromotions = async (req, res) => {
//   try {
//     // Fetch donation promotions from the database and sort by deadline
//     const donations = await Donation.find()
//       .populate('author', 'username profilePicture') // Populate author details if necessary
//       .sort({ deadline: 1 }) // Sort by deadline in ascending order (earliest deadline first)
//       .exec(); // Execute the query

//     // Respond with the sorted donation promotions
//     res.json({ status: true, donations });
//   } catch (error) {
//     console.error('Error fetching donation promotions:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };


// exports.createBloodBankRequest = async (req, res) => {
//   try {
//     const {
//       content, bloodGroup, location, contactInfo, urgency, hospitalName, doctorContact, bloodUnitsRequired, donorEligibility
//     } = req.body;

//     const missingFields = validateFields(req.body, ['content', 'bloodGroup', 'location', 'contactInfo', 'urgency']);
//     if (missingFields) {
//       return res.status(400).json({ status: false, message: `Missing fields: ${missingFields.join(', ')}` });
//     }

//     const newBloodBank = new BloodBank({
//       content,
//       bloodGroup,
//       location,
//       contactInfo,
//       urgency,
//       hospitalName,
//       doctorContact,
//       bloodUnitsRequired,
//       donorEligibility,
//       author: req.user._id,
//     });

//     await newBloodBank.save();
//     res.json({ status: true, message: 'Blood bank request created successfully' });
//   } catch (error) {
//     console.error('Error creating blood bank request:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all blood bank requests sorted by urgency
// exports.getAllBloodBankRequests = async (req, res) => {
//   try {
//     // Define custom sort order for urgency levels
//     const urgencyOrder = {
//       Immediate: 1,
//       'Within 24 Hours': 2,
//       'Within 3 Days': 3,
//     };

//     // Fetch blood bank requests from the database and sort by custom urgency order
//     const bloodBanks = await BloodBank.find()
//       .populate('author', 'username profilePicture') // Populate author details if necessary
//       .exec(); // Execute the query

//     // Sort blood bank requests by urgency levels using the defined order
//     bloodBanks.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

//     // Respond with the sorted blood bank requests
//     res.json({ status: true, bloodBanks });
//   } catch (error) {
//     console.error('Error fetching blood bank requests:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };


// // Utility function for field validation
// const validateFields = (body, requiredFields) => {
//   const missingFields = [];
//   requiredFields.forEach(field => {
//     if (!body[field]) {
//       missingFields.push(field);
//     }
//   });
//   return missingFields.length > 0 ? missingFields : null;
// };

// const Post = require('../Models/PostModel'); // Import your Post model
// const Donation = require('../Models/DonationModel'); // Import your Donation model
// const BloodBank = require('../Models/BloodBankModel'); // Import your BloodBank model
// const { bucket } = require('../config/firebase'); // Adjust path as needed


// exports.createPost = async (req, res) => {
//   try {
//     const { content } = req.body;
//     const image = req.file ? req.file : null; // Ensure `req.file` is used

//     let imageUrl = null;

//     // Upload image to Firebase Storage if it exists
//     if (image) {
//       try {
//         const fileName = `posts/${Date.now()}_${image.originalname}`;
//         const fileUpload = bucket.file(fileName);

//         if (!image.buffer) {
//           return res.status(400).json({ error: 'Failed to read the uploaded image.' });
//         }

//         await fileUpload.save(image.buffer, {
//           metadata: {
//             contentType: image.mimetype,
//           },
//         });

//         await fileUpload.makePublic();
//         imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//       } catch (uploadError) {
//         console.error('Error uploading image:', uploadError);
//         return res.status(500).json({ error: 'Failed to upload image.' });
//       }
//     }

//     const newPost = new Post({
//       content,
//       image: imageUrl,
//       author: req.user._id, // Assuming req.user contains the authenticated user
//     });

//     await newPost.save();
//     res.status(201).json({ status: true, message: 'Post created successfully', post: newPost });
//   } catch (error) {
//     console.error('Error creating post:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all posts for the authenticated user
// exports.getUserPosts = async (req, res) => {
//   try {
//     const posts = await Post.find({ author: req.user._id })
//       .sort({ createdAt: -1 })
//       .populate('author', 'username profilePicture')
//       .exec();

//     res.json({ status: true, posts });
//   } catch (error) {
//     console.error('Error fetching posts:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all posts
// exports.getAllPosts = async (req, res) => {
//   try {
//     const posts = await Post.find()
//       .sort({ createdAt: -1 })
//       .populate('author', 'username profilePicture') // Populating author details
//       .exec();

//     res.json({ status: true, posts });
//   } catch (error) {
//     console.error('Error fetching all posts:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Create a new donation promotion post
// exports.createDonationPromotion = async (req, res) => {
//   try {
//     const { content, goal, deadline, beneficiary, paymentDetails } = req.body;
//     const image = req.file ? req.file : null; // Ensure `req.file` is used

//     let imageUrl = null;

//     // Upload image to Firebase Storage if it exists
//     if (image) {
//       try {
//         const fileName = `donations/${Date.now()}_${image.originalname}`;
//         const fileUpload = bucket.file(fileName);

//         if (!image.buffer) {
//           return res.status(400).json({ error: 'Failed to read the uploaded image.' });
//         }

//         await fileUpload.save(image.buffer, {
//           metadata: {
//             contentType: image.mimetype,
//           },
//         });

//         await fileUpload.makePublic();
//         imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
//       } catch (uploadError) {
//         console.error('Error uploading image:', uploadError);
//         return res.status(500).json({ error: 'Failed to upload image.' });
//       }
//     }

//     const newDonation = new Donation({
//       content,
//       image: imageUrl,
//       goal,
//       deadline,
//       beneficiary,
//       paymentDetails,
//       author: req.user._id,
//     });

//     await newDonation.save();
//     res.status(201).json({ status: true, message: 'Donation promotion created successfully', donationPromotion: newDonation });
//   } catch (error) {
//     console.error('Error creating donation promotion:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };
// // Fetch all donation promotions sorted by deadline
// exports.getAllDonationPromotions = async (req, res) => {
//   try {
//     const donations = await Donation.find()
//       .populate('author', 'username profilePicture')
//       .sort({ deadline: 1 })
//       .exec();

//     res.json({ status: true, donations });
//   } catch (error) {
//     console.error('Error fetching donation promotions:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Create a new blood bank request
// exports.createBloodBankRequest = async (req, res) => {
//   try {
//     const {
//       content, bloodGroup, location, contactInfo, urgency, hospitalName, doctorContact, bloodUnitsRequired, donorEligibility
//     } = req.body;

//     const missingFields = validateFields(req.body, ['content', 'bloodGroup', 'location', 'contactInfo', 'urgency']);
//     if (missingFields) {
//       return res.status(400).json({ status: false, message: `Missing fields: ${missingFields.join(', ')}` });
//     }

//     const newBloodBank = new BloodBank({
//       content,
//       bloodGroup,
//       location,
//       contactInfo,
//       urgency,
//       hospitalName,
//       doctorContact,
//       bloodUnitsRequired,
//       donorEligibility,
//       author: req.user._id,
//     });

//     await newBloodBank.save();
//     res.status(201).json({ status: true, message: 'Blood bank request created successfully', bloodBankRequest: newBloodBank });
//   } catch (error) {
//     console.error('Error creating blood bank request:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };

// // Fetch all blood bank requests sorted by urgency
// exports.getAllBloodBankRequests = async (req, res) => {
//   try {
//     const urgencyOrder = {
//       Immediate: 1,
//       'Within 24 Hours': 2,
//       'Within 3 Days': 3,
//     };

//     const bloodBanks = await BloodBank.find()
//       .populate('author', 'username profilePicture')
//       .exec();

//     bloodBanks.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

//     res.json({ status: true, bloodBanks });
//   } catch (error) {
//     console.error('Error fetching blood bank requests:', error);
//     res.status(500).json({ status: false, message: 'Server error' });
//   }
// };
// // Utility function for field validation
// const validateFields = (body, requiredFields) => {
//   const missingFields = [];
//   requiredFields.forEach(field => {
//     if (!body[field]) {
//       missingFields.push(field);
//     }
//   });
//   return missingFields.length > 0 ? missingFields : null;
// };

const Post = require('../Models/PostModel'); // Import your Post model
const Donation = require('../Models/DonationModel'); // Import your Donation model
const BloodBank = require('../Models/BloodBankModel'); // Import your BloodBank model
const { bucket } = require('../config/firebase'); // Adjust path as needed
const {io} = require('../index');


exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const image = req.file ? req.file : null; // Ensure `req.file` is used

    let imageUrl = null;

    // Upload image to Firebase Storage if it exists
    if (image) {
      try {
        const fileName = `posts/${Date.now()}_${image.originalname}`;
        const fileUpload = bucket.file(fileName);

        if (!image.buffer) {
          return res.status(400).json({ error: 'Failed to read the uploaded image.' });
        }

        await fileUpload.save(image.buffer, {
          metadata: {
            contentType: image.mimetype,
          },
        });

        await fileUpload.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    }

    const newPost = new Post({
      content,
      image: imageUrl,
      author: req.user._id, // Assuming req.user contains the authenticated user
    });

    await newPost.save();
    req.io.emit('new-post', newPost);
    res.status(201).json({ status: true, message: 'Post created successfully', post: newPost });
  
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

// Fetch all posts for the authenticated user
exports.getUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user._id })
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePicture')
      .exec();

    res.json({ status: true, posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

// Fetch all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate('author', 'username profilePicture') // Populating author details
      .exec();

    res.json({ status: true, posts });
  } catch (error) {
    console.error('Error fetching all posts:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

// Create a new donation promotion post
exports.createDonationPromotion = async (req, res) => {
  try {
    const { content, goal, deadline, beneficiary, paymentDetails } = req.body;
    const image = req.file ? req.file : null; // Ensure `req.file` is used

    let imageUrl = null;

    // Upload image to Firebase Storage if it exists
    if (image) {
      try {
        const fileName = `donations/${Date.now()}_${image.originalname}`;
        const fileUpload = bucket.file(fileName);

        if (!image.buffer) {
          return res.status(400).json({ error: 'Failed to read the uploaded image.' });
        }

        await fileUpload.save(image.buffer, {
          metadata: {
            contentType: image.mimetype,
          },
        });

        await fileUpload.makePublic();
        imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      } catch (uploadError) {
        console.error('Error uploading image:', uploadError);
        return res.status(500).json({ error: 'Failed to upload image.' });
      }
    }

    const newDonation = new Donation({
      content,
      image: imageUrl,
      goal,
      deadline,
      beneficiary,
      paymentDetails,
      author: req.user._id,
    });

    await newDonation.save();
    req.io.emit('new-donation', newDonation);
    res.status(201).json({ status: true, message: 'Donation promotion created successfully', donationPromotion: newDonation });
     // Emit a notification to all connected clients
  
  } catch (error) {
    console.error('Error creating donation promotion:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
// Fetch all donation promotions sorted by deadline
exports.getAllDonationPromotions = async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate('author', 'username profilePicture')
      .sort({ deadline: 1 })
      .exec();

    res.json({ status: true, donations });
  } catch (error) {
    console.error('Error fetching donation promotions:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

exports.createBloodBankRequest = async (req, res) => {
  try {
    const {
      content, bloodGroup, location, contactInfo, urgency, hospitalName, doctorContact, bloodUnitsRequired, donorEligibility
    } = req.body;

    // Validate required fields
    const missingFields = validateFields(req.body, ['content', 'bloodGroup', 'location', 'contactInfo', 'urgency']);
    if (missingFields) {
      return res.status(400).json({ status: false, message: `Missing fields: ${missingFields.join(', ')}` });
    }

    const newBloodBank = new BloodBank({
      content,
      bloodGroup,
      location,
      contactInfo,
      urgency,
      hospitalName,
      doctorContact,
      bloodUnitsRequired,
      donorEligibility,
      author: req.user._id,
    });

    await newBloodBank.save();

    // Emit using req.io
    req.io.emit('new-bloodbank', newBloodBank);
    res.status(201).json({ status: true, message: 'Blood bank request created successfully', bloodBankRequest: newBloodBank });
  } catch (error) {
    console.error('Error creating blood bank request:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};

// Fetch all blood bank requests sorted by urgency
exports.getAllBloodBankRequests = async (req, res) => {
  try {
    const urgencyOrder = {
      Immediate: 1,
      'Within 24 Hours': 2,
      'Within 3 Days': 3,
    };

    const bloodBanks = await BloodBank.find()
      .populate('author', 'username profilePicture')
      .exec();

    bloodBanks.sort((a, b) => urgencyOrder[a.urgency] - urgencyOrder[b.urgency]);

    res.json({ status: true, bloodBanks });
  } catch (error) {
    console.error('Error fetching blood bank requests:', error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
};
// Utility function for field validation
const validateFields = (body, requiredFields) => {
  const missingFields = [];
  requiredFields.forEach(field => {
    if (!body[field]) {
      missingFields.push(field);
    }
  });
  return missingFields.length > 0 ? missingFields : null;
};