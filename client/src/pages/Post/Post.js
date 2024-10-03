// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Use useNavigate instead of useHistory
// import './Post.css'; // Add CSS styles for the post creation page

// const Post = () => {
//   const [content, setContent] = useState('');
//   const [image, setImage] = useState(null);
//   const navigate = useNavigate(); // Initialize useNavigate

//   const handleContentChange = (e) => {
//     setContent(e.target.value);
//   };

//   const handleImageChange = (e) => {
//     setImage(e.target.files[0]);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append('content', content);
//     if (image) {
//       formData.append('image', image);
//     }

//     try {
//       const response = await axios.post('http://localhost:4000/api/post', formData, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.status) {
//         navigate('/home'); // Use navigate instead of history.push
//       } else {
//         console.error('Failed to create post');
//       }
//     } catch (error) {
//       console.error('Error creating post:', error);
//     }
//   };

//   return (
//     <div className="post-container">
//       <h2>Create a New Post</h2>
//       <form onSubmit={handleSubmit}>
//         <textarea
//           placeholder="What's on your mind?"
//           value={content}
//           onChange={handleContentChange}
//           required
//         />
//         <input type="file" onChange={handleImageChange} />
//         <button type="submit">Post</button>
//       </form>
//     </div>
//   );
// };

// export default Post;
// import React, { useState } from 'react';
// import axios from 'axios';
// import './Post.css';

// const Post = () => {
//   // State to manage the active section and form data
//   const [activeSection, setActiveSection] = useState(null);
//   const [formData, setFormData] = useState({
//     posting: { content: '', image: null },
//     donation: { content: '', image: null, goal: '', deadline: '', beneficiary: '', paymentDetails: '' },
//     bloodBank: {
//       content: '',
//       bloodGroup: '',
//       location: '',
//       contactInfo: '',
//       urgency: '',
//       hospitalName: '',
//       doctorContact: '',
//       bloodUnitsRequired: '',
//       donorEligibility: '',
//     },
//   });

//   // Handle card clicks to show the relevant section
//   const handleCardClick = (section) => {
//     setActiveSection(section);
//   };

//   // Reset form data and close the active section
//   const handleCancelClick = () => {
//     setActiveSection(null);
//     setFormData({
//       posting: { content: '', image: null },
//       donation: { content: '', image: null, goal: '', deadline: '', beneficiary: '', paymentDetails: '' },
//       bloodBank: {
//         content: '',
//         bloodGroup: '',
//         location: '',
//         contactInfo: '',
//         urgency: '',
//         hospitalName: '',
//         doctorContact: '',
//         bloodUnitsRequired: '',
//         donorEligibility: '',
//       },
//     });
//   };

//   // Handle input changes for different sections
//   const handleInputChange = (section, field, value) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         [field]: value,
//       },
//     }));
//   };

//   // Handle image file input changes
//   const handleImageChange = (section, e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       [section]: {
//         ...prevData[section],
//         image: e.target.files[0],
//       },
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (section, e) => {
//     e.preventDefault();
//     const sectionData = formData[section];

//     // Prepare form data for submission
//     const dataToSend = new FormData();
//     Object.keys(sectionData).forEach((key) => {
//       if (sectionData[key] !== null) {
//         dataToSend.append(key, sectionData[key]);
//       }
//     });

//     try {
//       let url = '';
//       if (section === 'posting') url = 'http://localhost:4000/api/post';
//       else if (section === 'donation') url = 'http://localhost:4000/api/donation';
//       else if (section === 'bloodBank') url = 'http://localhost:4000/api/bloodbank';

//       const response = await axios.post(url, dataToSend, {
//         withCredentials: true,
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       if (response.data.status) {
//         console.log(`${section} submission successful!`);
//         handleCancelClick(); // Reset the form and close the section after submission
//       } else {
//         console.error(`Failed to create ${section}: ${response.data.message}`);
//       }
//     } catch (error) {
//       console.error(`Error creating ${section}:`, error);
//     }
//   };

//   return (
//     <div className="post-container">
//       <h2>Create a New Post</h2>
//       <div className="card-container">
//         {/* Posting Section */}
//         <div className="card" onClick={() => handleCardClick('posting')}>
//           <h3>Posting</h3>
//           {activeSection === 'posting' && (
//             <form className="input-container" onSubmit={(e) => handleSubmit('posting', e)}>
//               <textarea
//                 placeholder="What's on your mind?"
//                 value={formData.posting.content}
//                 onChange={(e) => handleInputChange('posting', 'content', e.target.value)}
//                 required
//               />
//               <input type="file" onChange={(e) => handleImageChange('posting', e)} />
//               <button type="submit">Post</button>
//               <button type="button" onClick={handleCancelClick}>Cancel</button>
//             </form>
//           )}
//         </div>

//         {/* Donation Promotion Section */}
//         <div className="card" onClick={() => handleCardClick('donation')}>
//           <h3>Donation Promotion</h3>
//           {activeSection === 'donation' && (
//             <form className="input-container" onSubmit={(e) => handleSubmit('donation', e)}>
//               <textarea
//                 placeholder="Describe the situation..."
//                 value={formData.donation.content}
//                 onChange={(e) => handleInputChange('donation', 'content', e.target.value)}
//                 required
//               />
//               <input type="file" onChange={(e) => handleImageChange('donation', e)} />
//               <input
//                 type="number"
//                 placeholder="Fundraising Goal"
//                 value={formData.donation.goal}
//                 onChange={(e) => handleInputChange('donation', 'goal', e.target.value)}
//                 required
//               />
//               <input
//                 type="date"
//                 placeholder="Deadline"
//                 value={formData.donation.deadline}
//                 onChange={(e) => handleInputChange('donation', 'deadline', e.target.value)}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Beneficiary"
//                 value={formData.donation.beneficiary}
//                 onChange={(e) => handleInputChange('donation', 'beneficiary', e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Payment Details"
//                 value={formData.donation.paymentDetails}
//                 onChange={(e) => handleInputChange('donation', 'paymentDetails', e.target.value)}
//               />
//               <button type="submit">Promote</button>
//               <button type="button" onClick={handleCancelClick}>Cancel</button>
//             </form>
//           )}
//         </div>

//         {/* Blood Bank Section */}
//         <div className="card" onClick={() => handleCardClick('bloodBank')}>
//           <h3>Blood Bank</h3>
//           {activeSection === 'bloodBank' && (
//             <form className="input-container" onSubmit={(e) => handleSubmit('bloodBank', e)}>
//               <textarea
//                 placeholder="Describe the blood need..."
//                 value={formData.bloodBank.content}
//                 onChange={(e) => handleInputChange('bloodBank', 'content', e.target.value)}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Blood Group Needed"
//                 value={formData.bloodBank.bloodGroup}
//                 onChange={(e) => handleInputChange('bloodBank', 'bloodGroup', e.target.value)}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Location"
//                 value={formData.bloodBank.location}
//                 onChange={(e) => handleInputChange('bloodBank', 'location', e.target.value)}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Contact Info"
//                 value={formData.bloodBank.contactInfo}
//                 onChange={(e) => handleInputChange('bloodBank', 'contactInfo', e.target.value)}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Urgency"
//                 value={formData.bloodBank.urgency}
//                 onChange={(e) => handleInputChange('bloodBank', 'urgency', e.target.value)}
//                 required
//               />
//               <input
//                 type="text"
//                 placeholder="Hospital Name"
//                 value={formData.bloodBank.hospitalName}
//                 onChange={(e) => handleInputChange('bloodBank', 'hospitalName', e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Doctor Contact"
//                 value={formData.bloodBank.doctorContact}
//                 onChange={(e) => handleInputChange('bloodBank', 'doctorContact', e.target.value)}
//               />
//               <input
//                 type="number"
//                 placeholder="Blood Units Required"
//                 value={formData.bloodBank.bloodUnitsRequired}
//                 onChange={(e) => handleInputChange('bloodBank', 'bloodUnitsRequired', e.target.value)}
//               />
//               <input
//                 type="text"
//                 placeholder="Donor Eligibility"
//                 value={formData.bloodBank.donorEligibility}
//                 onChange={(e) => handleInputChange('bloodBank', 'donorEligibility', e.target.value)}
//               />
//               <button type="submit">Request</button>
//               <button type="button" onClick={handleCancelClick}>Cancel</button>
//             </form>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Post;

import React, { useState } from 'react';
import axios from 'axios';
import './Post.css';
import NavBar from "../NavBar/NavBar";

const Post = () => {
  // State to manage the active section and form data
  const [activeSection, setActiveSection] = useState(null);
  const [formData, setFormData] = useState({
    posting: { content: '', image: null },
    donation: { content: '', image: null, goal: '', deadline: '', beneficiary: '', paymentDetails: '' },
    bloodBank: {
      content: '',
      bloodGroup: '',
      location: '',
      contactInfo: '',
      urgency: '',
      hospitalName: '',
      doctorContact: '',
      bloodUnitsRequired: '',
      donorEligibility: '',
    },
  });

  // Handle card clicks to show the relevant section
  const handleCardClick = (section) => {
    setActiveSection(section);
  };

  // Reset form data and close the active section
  const handleCancelClick = () => {
    setActiveSection(null);
    setFormData({
      posting: { content: '', image: null },
      donation: { content: '', image: null, goal: '', deadline: '', beneficiary: '', paymentDetails: '' },
      bloodBank: {
        content: '',
        bloodGroup: '',
        location: '',
        contactInfo: '',
        urgency: '',
        hospitalName: '',
        doctorContact: '',
        bloodUnitsRequired: '',
        donorEligibility: '',
      },
    });
  };

  // Handle input changes for different sections
  const handleInputChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  // Handle image file input changes
  const handleImageChange = (section, e) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        image: e.target.files[0],
      },
    }));
  };

  // Handle form submission
  const handleSubmit = async (section, e) => {
    e.preventDefault();
    const sectionData = formData[section];

    try {
      let url = '';
      if (section === 'posting') url = 'http://localhost:4000/api/post';
      else if (section === 'donation') url = 'http://localhost:4000/api/donation';
      else if (section === 'bloodBank') url = 'http://localhost:4000/api/bloodbank';

      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': section === 'bloodBank' ? 'application/json' : 'multipart/form-data',
        },
      };

      // Convert Blood Bank data to JSON if the section is 'bloodBank'
      const response = await axios.post(url, section === 'bloodBank' ? sectionData : createFormData(sectionData), config);

      if (response.data.status) {
        console.log(`${section} submission successful!`);
        handleCancelClick(); // Reset the form and close the section after submission
      } else {
        console.error(`Failed to create ${section}: ${response.data.message}`);
      }
    } catch (error) {
      console.error(`Error creating ${section}:`, error);
    }
  };

  // Helper function to create FormData for non-JSON sections
  const createFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (data[key] !== null) {
        formData.append(key, data[key]);
      }
    });
    return formData;
  };

  return (
    <><NavBar /><div className="post-container">
          <h2>Create a New Post</h2>
          <div className="card-container">
              {/* Posting Section */}
              <div className="card" onClick={() => handleCardClick('posting')}>
                  <h3>Posting</h3>
                  {activeSection === 'posting' && (
                      <form className="input-container" onSubmit={(e) => handleSubmit('posting', e)}>
                          <textarea
                              placeholder="What's on your mind?"
                              value={formData.posting.content}
                              onChange={(e) => handleInputChange('posting', 'content', e.target.value)}
                              required />
                          <input type="file" onChange={(e) => handleImageChange('posting', e)} />
                          <button type="submit">Post</button>
                          <button type="button" onClick={handleCancelClick}>Cancel</button>
                      </form>
                  )}
              </div>

              {/* Donation Promotion Section */}
              <div className="card" onClick={() => handleCardClick('donation')}>
                  <h3>Donation Promotion</h3>
                  {activeSection === 'donation' && (
                      <form className="input-container" onSubmit={(e) => handleSubmit('donation', e)}>
                          <textarea
                              placeholder="Describe the situation..."
                              value={formData.donation.content}
                              onChange={(e) => handleInputChange('donation', 'content', e.target.value)}
                              required />
                          <input type="file" onChange={(e) => handleImageChange('donation', e)} />
                          <input
                              type="number"
                              placeholder="Fundraising Goal"
                              value={formData.donation.goal}
                              onChange={(e) => handleInputChange('donation', 'goal', e.target.value)}
                              required />
                          <input
                              type="date"
                              placeholder="Deadline"
                              value={formData.donation.deadline}
                              onChange={(e) => handleInputChange('donation', 'deadline', e.target.value)}
                              required />
                          <input
                              type="text"
                              placeholder="Beneficiary"
                              value={formData.donation.beneficiary}
                              onChange={(e) => handleInputChange('donation', 'beneficiary', e.target.value)} />
                          <input
                              type="text"
                              placeholder="Payment Details"
                              value={formData.donation.paymentDetails}
                              onChange={(e) => handleInputChange('donation', 'paymentDetails', e.target.value)} />
                          <button type="submit">Promote</button>
                          <button type="button" onClick={handleCancelClick}>Cancel</button>
                      </form>
                  )}
              </div>

              {/* Blood Bank Section */}
              <div className="card" onClick={() => handleCardClick('bloodBank')}>
                  <h3>Blood Bank</h3>
                  {activeSection === 'bloodBank' && (
                      <form className="input-container" onSubmit={(e) => handleSubmit('bloodBank', e)}>
                          <textarea
                              placeholder="Describe the blood need..."
                              value={formData.bloodBank.content}
                              onChange={(e) => handleInputChange('bloodBank', 'content', e.target.value)}
                              required />
                          <input
                              type="text"
                              placeholder="Blood Group Needed"
                              value={formData.bloodBank.bloodGroup}
                              onChange={(e) => handleInputChange('bloodBank', 'bloodGroup', e.target.value)}
                              required />
                          <input
                              type="text"
                              placeholder="Location"
                              value={formData.bloodBank.location}
                              onChange={(e) => handleInputChange('bloodBank', 'location', e.target.value)}
                              required />
                          <input
                              type="text"
                              placeholder="Contact Info"
                              value={formData.bloodBank.contactInfo}
                              onChange={(e) => handleInputChange('bloodBank', 'contactInfo', e.target.value)}
                              required />
                          <input
                              type="text"
                              placeholder="Urgency"
                              value={formData.bloodBank.urgency}
                              onChange={(e) => handleInputChange('bloodBank', 'urgency', e.target.value)}
                              required />
                          <input
                              type="text"
                              placeholder="Hospital Name"
                              value={formData.bloodBank.hospitalName}
                              onChange={(e) => handleInputChange('bloodBank', 'hospitalName', e.target.value)} />
                          <input
                              type="text"
                              placeholder="Doctor Contact"
                              value={formData.bloodBank.doctorContact}
                              onChange={(e) => handleInputChange('bloodBank', 'doctorContact', e.target.value)} />
                          <input
                              type="number"
                              placeholder="Blood Units Required"
                              value={formData.bloodBank.bloodUnitsRequired}
                              onChange={(e) => handleInputChange('bloodBank', 'bloodUnitsRequired', e.target.value)} />
                          <input
                              type="text"
                              placeholder="Donor Eligibility"
                              value={formData.bloodBank.donorEligibility}
                              onChange={(e) => handleInputChange('bloodBank', 'donorEligibility', e.target.value)} />
                          <button type="submit">Request</button>
                          <button type="button" onClick={handleCancelClick}>Cancel</button>
                      </form>
                  )}
              </div>
          </div>
      </div></>
  );
};

export default Post;
