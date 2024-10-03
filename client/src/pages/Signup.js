// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import './LoginModule.css';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [inputValue, setInputValue] = useState({
//     email: "",
//     password: "",
//     username: "",
//     dateOfBirth: "",
//     bio: "",
//     userType: "",
//     contactNumber: "",
//     city: "",
//     hospital: "",
//   });
//   const [profilePicture, setProfilePicture] = useState(null);
//   const [certificate, setCertificate] = useState(null);
//   const [currentSection, setCurrentSection] = useState(1);

//   const { email, password, username, dateOfBirth, bio, userType, contactNumber, city, hospital } = inputValue;

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "profilePicture") {
//       setProfilePicture(files[0]);
//     } else if (name === "certificate") {
//       setCertificate(files[0]);
//     }
//   };

//   const handleError = (err) =>
//     toast.error(err, {
//       position: "bottom-left",
//     });

//   const handleSuccess = (msg) =>
//     toast.success(msg, {
//       position: "bottom-right",
//     });

//   const handleAdminCheck = () => {
//     const answer = prompt("How can I help you:");
//     if (answer?.toLowerCase() === "admin") {
//       navigate("/admin/login");
//     }
//   };

//   const handleNext = () => {
//     if (currentSection === 1) {
//       if (!email || !password || !username || !dateOfBirth) {
//         handleError("Please fill in all required fields in Section 1.");
//         return;
//       }
//     }
//     setCurrentSection(2);
//   };

//   const handlePrevious = () => {
//     setCurrentSection(1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (currentSection === 2) {
//       if (!bio || !userType || (userType === "Doctor" && !certificate) || !contactNumber || !city) {
//         handleError("Please fill in all required fields in Section 2.");
//         return;
//       }
//     }
//     const formData = new FormData();
//     Object.keys(inputValue).forEach(key => {
//       formData.append(key, inputValue[key]);
//     });
//     if (profilePicture) {
//       formData.append("profilePicture", profilePicture);
//     }
//     if (certificate) {
//       formData.append("certificate", certificate);
//     }

//     try {
//       const response = await axios.post("http://localhost:4000/signup", formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       const { message } = response.data;
//       handleSuccess(message);
//       setTimeout(() => {
//         if (userType === "Doctor") {
//           navigate("/login");
//         } else {
//           navigate("/otp-verify");
//         }
//       }, 2000);
//     } catch (error) {
//       handleError(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="background">
//         <div className="column column1">
//           <div className="image-container">
//             {/* Background Images */}
//             <img src="https://yooper.com.br/blog/wp-content/uploads/2017/03/Social-Media-Compre-Clicks-1.jpg" alt="Background 1" />
//             <img src="https://as2.ftcdn.net/v2/jpg/02/22/98/19/1000_F_222981953_uS3h9NQb4dDBGbqiD00dy3LbyU9GSgtD.jpg" alt="Background 2" />
//             <img src="https://medtel.io/wp-content/uploads/tcp-cvr.jpg" alt="Background 3" />
//             <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/10/doctor-patient-kid-baby-toddler-1296x728-header.jpg?w=1155&h=1528" alt="Background 4" />
//             <img src="https://www.michalsons.com/wp-content/uploads/2018/08/Social-media-policy-e1561619696311.jpg" alt="Background 5" />
//             <img src="https://mirxes.com/blog/wp-content/uploads/2022/07/Patient-care.jpg" alt="Background 6" />
//           </div>
//         </div>
//         <div className="column column2">
//           <div className="image-container">
//             {/* Background Images */}
//             <img src="https://www.hubspot.com/hs-fs/hubfs/social-media-marketing-guide.jpg?width=595&height=400&name=social-media-marketing-guide.jpg" alt="Background 7" />
//             <img src="https://blog.hootsuite.com/wp-content/uploads/2018/11/history-of-social-media.png" alt="Background 8" />
//             <img src="https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg" alt="Background 9" />
//             <img src="https://www.shutterstock.com/image-photo/cheerful-young-arabic-general-practitioner-600nw-2182656031.jpg" alt="Background 10" />
//             <img src="https://i.pinimg.com/originals/5d/a9/33/5da9331bb1ccecd5de23fdeeeef6e2f3.gif" alt="Background 11" />
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8WtdMHRXI-i36bQEG_4CAU8mPTP8zAUjug&s" alt="Background 12" />
//           </div>
//         </div>
//         <div className="column column3">
//           <div className="image-container">
//             {/* Background Images */}
//             <img src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/online/PublishingImages/blog/health-care-economics.jpg&w=1200&h=630" alt="Background 13" />
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTHEP-lXF1cBty4N3Tsi5eNOE7AdpXmDi2LQ&s" alt="Background 14" />
//             <img src="https://www.sattva.co.in/wp-content/uploads/2022/12/Untitled-1200-%C3%97-630-px.png" alt="Background 15" />
//             <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7bBXJtVa5BGvWHz5xMdKyT/326829369d99322ec64c254950009b3d/iStock-869623344.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000" alt="Background 16" />
//             <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/real-impact-social-media.jpg" alt="Background 17" />
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMWQzSuYmQ-0-iYo9VfbM8YTq-mEyKBkzNg&s" alt="Background 18" />
//           </div>
//         </div>
//       </div>
//       <div className="form_container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           {currentSection === 1 && (
//             <>
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="dateOfBirth">Date of Birth:</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={dateOfBirth}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <button type="button" onClick={handleNext}>Next</button>
//             </>
//           )}

//           {currentSection === 2 && (
//             <>
//               <label htmlFor="bio">Bio:</label>
//               <textarea
//                 id="bio"
//                 name="bio"
//                 value={bio}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="userType">User Type:</label>
//               <select
//                 id="userType"
//                 name="userType"
//                 value={userType}
//                 onChange={handleOnChange}
//                 required
//               >
//                 <option value="" disabled>Select User Type</option>
//                 <option value="Doctor">Doctor</option>
//                 <option value="Common Person">Common Person</option>
//               </select>

//               {userType === "Doctor" && (
//                 <>
//                   <label htmlFor="certificate">Certificate:</label>
//                   <input
//                     type="file"
//                     id="certificate"
//                     name="certificate"
//                     onChange={handleFileChange}
//                     accept=".pdf, .doc, .docx"
//                     required
//                   />
//                 </>
//               )}
              
//               <label htmlFor="contactNumber">Contact Number:</label>
//               <input
//                 type="text"
//                 id="contactNumber"
//                 name="contactNumber"
//                 value={contactNumber}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="city">City:</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={city}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="hospital">Hospital:</label>
//               <input
//                 type="text"
//                 id="hospital"
//                 name="hospital"
//                 value={hospital}
//                 onChange={handleOnChange}
//               />
              
//               <label htmlFor="profilePicture">Profile Picture:</label>
//               <input
//                 type="file"
//                 id="profilePicture"
//                 name="profilePicture"
//                 onChange={handleFileChange}
//                 accept=".jpg, .jpeg, .png"
//               />
              
//               <button type="button" onClick={handlePrevious}>Previous</button>
//               <button type="submit">Submit</button>
//             </>
//           )}
//         </form>
//         <span onClick={handleAdminCheck} className="admin-check">?</span>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import './LoginModule.css';

// const Signup = () => {
//   const navigate = useNavigate();
//   const [inputValue, setInputValue] = useState({
//     email: "",
//     password: "",
//     username: "",
//     dateOfBirth: "",
//     bio: "",
//     userType: "",
//     contactNumber: "",
//     city: "",
//     hospital: "",
//   });
//   const [profilePicture, setProfilePicture] = useState(null);

//   const [currentSection, setCurrentSection] = useState(1);

//   const { email, password, username, dateOfBirth, bio, userType, contactNumber, city, hospital } = inputValue;

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setInputValue({
//       ...inputValue,
//       [name]: value,
//     });
//   };

//   const handleFileChange = (e) => {
//     const { name, files } = e.target;
//     if (name === "profilePicture") {
//       setProfilePicture(files[0]);
//     } 
//   };

//   const handleError = (err) =>
//     toast.error(err, {
//       position: "bottom-left",
//     });

//   const handleSuccess = (msg) =>
//     toast.success(msg, {
//       position: "bottom-right",
//     });

//   const handleAdminCheck = () => {
//     const answer = prompt("How can I help you:");
//     if (answer?.toLowerCase() === "admin") {
//       navigate("/admin/login");
//     }
//   };

//   const handleNext = () => {
//     if (currentSection === 1) {
//       if (!email || !password || !username || !dateOfBirth) {
//         handleError("Please fill in all required fields in Section 1.");
//         return;
//       }
//     }
//     setCurrentSection(2);
//   };

//   const handlePrevious = () => {
//     setCurrentSection(1);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (currentSection === 2) {
//       if (!bio || !userType || (userType === "Doctor" && !hospital) || !contactNumber || !city) {
//         handleError("Please fill in all required fields in Section 2.");
//         return;
//       }
//     }
//     const formData = new FormData();
//     Object.keys(inputValue).forEach(key => {
//       formData.append(key, inputValue[key]);
//     });
//     if (profilePicture) {
//       formData.append("profilePicture", profilePicture);
//     }
   

//     try {
//       const response = await axios.post("http://localhost:4000/signup", formData, {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       const { message } = response.data;
//       handleSuccess(message);
//       setTimeout(() => {
//         if (userType === "Doctor") {
//           navigate("/login");
//         } else {
//           navigate("/otp-verify");
//         }
//       }, 2000);
//     } catch (error) {
//       handleError(error.response?.data?.message || "Something went wrong!");
//     }
//   };

//   return (
//     <div className="signup-page">
//       <div className="background">
//         <div className="column column1">
//           <div className="image-container">
//             {/* Background Images */}
//             <img src="https://yooper.com.br/blog/wp-content/uploads/2017/03/Social-Media-Compre-Clicks-1.jpg" alt="Background 1" />
//             <img src="https://as2.ftcdn.net/v2/jpg/02/22/98/19/1000_F_222981953_uS3h9NQb4dDBGbqiD00dy3LbyU9GSgtD.jpg" alt="Background 2" />
//             <img src="https://medtel.io/wp-content/uploads/tcp-cvr.jpg" alt="Background 3" />
//             <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/10/doctor-patient-kid-baby-toddler-1296x728-header.jpg?w=1155&h=1528" alt="Background 4" />
//             <img src="https://www.michalsons.com/wp-content/uploads/2018/08/Social-media-policy-e1561619696311.jpg" alt="Background 5" />
//             <img src="https://mirxes.com/blog/wp-content/uploads/2022/07/Patient-care.jpg" alt="Background 6" />
//           </div>
//         </div>
//         <div className="column column2">
//           <div className="image-container">
//             {/* Background Images */}
//             <img src="https://www.hubspot.com/hs-fs/hubfs/social-media-marketing-guide.jpg?width=595&height=400&name=social-media-marketing-guide.jpg" alt="Background 7" />
//             <img src="https://blog.hootsuite.com/wp-content/uploads/2018/11/history-of-social-media.png" alt="Background 8" />
//             <img src="https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg" alt="Background 9" />
//             <img src="https://www.shutterstock.com/image-photo/cheerful-young-arabic-general-practitioner-600nw-2182656031.jpg" alt="Background 10" />
//             <img src="https://i.pinimg.com/originals/5d/a9/33/5da9331bb1ccecd5de23fdeeeef6e2f3.gif" alt="Background 11" />
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8WtdMHRXI-i36bQEG_4CAU8mPTP8zAUjug&s" alt="Background 12" />
//           </div>
//         </div>
//         <div className="column column3">
//           <div className="image-container">
//             {/* Background Images */}
//             <img src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/online/PublishingImages/blog/health-care-economics.jpg&w=1200&h=630" alt="Background 13" />
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTHEP-lXF1cBty4N3Tsi5eNOE7AdpXmDi2LQ&s" alt="Background 14" />
//             <img src="https://www.sattva.co.in/wp-content/uploads/2022/12/Untitled-1200-%C3%97-630-px.png" alt="Background 15" />
//             <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7bBXJtVa5BGvWHz5xMdKyT/326829369d99322ec64c254950009b3d/iStock-869623344.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000" alt="Background 16" />
//             <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/real-impact-social-media.jpg" alt="Background 17" />
//             <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMWQzSuYmQ-0-iYo9VfbM8YTq-mEyKBkzNg&s" alt="Background 18" />
//           </div>
//         </div>
//       </div>
//       <div className="form_container">
//         <h2>Sign Up</h2>
//         <form onSubmit={handleSubmit}>
//           {currentSection === 1 && (
//             <>
//               <label htmlFor="email">Email:</label>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="password">Password:</label>
//               <input
//                 type="password"
//                 id="password"
//                 name="password"
//                 value={password}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="username">Username:</label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={username}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="dateOfBirth">Date of Birth:</label>
//               <input
//                 type="date"
//                 id="dateOfBirth"
//                 name="dateOfBirth"
//                 value={dateOfBirth}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <button type="button" onClick={handleNext}>Next</button>
//             </>
//           )}

//           {currentSection === 2 && (
//             <>
//               <label htmlFor="bio">Bio:</label>
//               <textarea
//                 id="bio"
//                 name="bio"
//                 value={bio}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="userType">User Type:</label>
//               <select
//                 id="userType"
//                 name="userType"
//                 value={userType}
//                 onChange={handleOnChange}
//                 required
//               >
//                 <option value="" disabled>Select User Type</option>
//                 <option value="Doctor">Doctor</option>
//                 <option value="Common Person">Common Person</option>
//               </select>

//               {userType === "Doctor" && (
//                 <>
//                        <label htmlFor="hospital">Hospital:</label>
//               <input
//                 type="text"
//                 id="hospital"
//                 name="hospital"
//                 value={hospital}
//                 onChange={handleOnChange}
//               />
//                 </>
//               )}
              
//               <label htmlFor="contactNumber">Contact Number:</label>
//               <input
//                 type="text"
//                 id="contactNumber"
//                 name="contactNumber"
//                 value={contactNumber}
//                 onChange={handleOnChange}
//                 required
//               />
              
//               <label htmlFor="city">City:</label>
//               <input
//                 type="text"
//                 id="city"
//                 name="city"
//                 value={city}
//                 onChange={handleOnChange}
//                 required
//               />
              
        
              
//               <label htmlFor="profilePicture">Profile Picture:</label>
//               <input
//                 type="file"
//                 id="profilePicture"
//                 name="profilePicture"
//                 onChange={handleFileChange}
//                 accept=".jpg, .jpeg, .png"
//               />
              
//               <button type="button" onClick={handlePrevious}>Previous</button>
//               <button type="submit">Submit</button>
//             </>
//           )}
//         </form>
//         <span onClick={handleAdminCheck} className="admin-check">?</span>
//         <ToastContainer />
//       </div>
//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";

import { Link,useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './LoginModule.css';

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
    dateOfBirth: "",
    bio: "",
    userType: "",
    contactNumber: "",
    city: "",
    hospital: "",
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [currentSection, setCurrentSection] = useState(1);

  const { email, password, username, dateOfBirth, bio, userType, contactNumber, city, hospital } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profilePicture") {
      setProfilePicture(files[0]);
    }
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleAdminCheck = () => {
    const answer = prompt("How can I help you:");
    if (answer?.toLowerCase() === "admin") {
      navigate("/admin/login");
    }
  };

  const handleNext = () => {
    if (currentSection === 1) {
      if (!email || !password || !username || !dateOfBirth) {
        handleError("Please fill in all required fields in Section 1.");
        return;
      }
    }
    setCurrentSection(2);
  };

  const handlePrevious = () => {
    setCurrentSection(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (currentSection === 2) {
      if (!bio || !userType || !contactNumber || !city) {
        handleError("Please fill in all required fields in Section 2.");
        return;
      }
    }
    const formData = new FormData();
    Object.keys(inputValue).forEach(key => {
      formData.append(key, inputValue[key]);
    });
    if (profilePicture) {
      formData.append("profilePicture", profilePicture);
    }

    try {
      const response = await axios.post("http://localhost:4000/signup", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { message } = response.data;
      handleSuccess(message);
      setTimeout(() => {
        navigate("/otp-verify");
      }, 2000);
    } catch (error) {
      handleError(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <div className="signup-page">
      <div className="background">
        <div className="column column1">
          <div className="image-container">
            {/* Background Images */}
            <img src="https://yooper.com.br/blog/wp-content/uploads/2017/03/Social-Media-Compre-Clicks-1.jpg" alt="Background 1" />
            <img src="https://as2.ftcdn.net/v2/jpg/02/22/98/19/1000_F_222981953_uS3h9NQb4dDBGbqiD00dy3LbyU9GSgtD.jpg" alt="Background 2" />
            <img src="https://medtel.io/wp-content/uploads/tcp-cvr.jpg" alt="Background 3" />
            <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/10/doctor-patient-kid-baby-toddler-1296x728-header.jpg?w=1155&h=1528" alt="Background 4" />
            <img src="https://www.michalsons.com/wp-content/uploads/2018/08/Social-media-policy-e1561619696311.jpg" alt="Background 5" />
            <img src="https://mirxes.com/blog/wp-content/uploads/2022/07/Patient-care.jpg" alt="Background 6" />
          </div>
        </div>
        <div className="column column2">
          <div className="image-container">
            {/* Background Images */}
            <img src="https://www.hubspot.com/hs-fs/hubfs/social-media-marketing-guide.jpg?width=595&height=400&name=social-media-marketing-guide.jpg" alt="Background 7" />
            <img src="https://blog.hootsuite.com/wp-content/uploads/2018/11/history-of-social-media.png" alt="Background 8" />
            <img src="https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg" alt="Background 9" />
            <img src="https://www.shutterstock.com/image-photo/cheerful-young-arabic-general-practitioner-600nw-2182656031.jpg" alt="Background 10" />
            <img src="https://i.pinimg.com/originals/5d/a9/33/5da9331bb1ccecd5de23fdeeeef6e2f3.gif" alt="Background 11" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8WtdMHRXI-i36bQEG_4CAU8mPTP8zAUjug&s" alt="Background 12" />
          </div>
        </div>
        <div className="column column3">
          <div className="image-container">
            {/* Background Images */}
            <img src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/online/PublishingImages/blog/health-care-economics.jpg&w=1200&h=630" alt="Background 13" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTHEP-lXF1cBty4N3Tsi5eNOE7AdpXmDi2LQ&s" alt="Background 14" />
            <img src="https://www.sattva.co.in/wp-content/uploads/2022/12/Untitled-1200-%C3%97-630-px.png" alt="Background 15" />
            <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7bBXJtVa5BGvWHz5xMdKyT/326829369d99322ec64c254950009b3d/iStock-869623344.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000" alt="Background 16" />
            <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/real-impact-social-media.jpg" alt="Background 17" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMWQzSuYmQ-0-iYo9VfbM8YTq-mEyKBkzNg&s" alt="Background 18" />
          </div>
        </div>
      </div>
      <div className="form_container">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          {currentSection === 1 && (
            <>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
              />
              
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                required
              />
              
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleOnChange}
                required
              />
              
              <label htmlFor="dateOfBirth">Date of Birth:</label>
              <input
                type="date"
                id="dateOfBirth"
                name="dateOfBirth"
                value={dateOfBirth}
                onChange={handleOnChange}
                required
              />
              
              <button type="button" onClick={handleNext} className="nextButton">Next</button>
              <span>
            Already have an account? <Link to="/login">login</Link>
          </span>
            </>
          )}

          {currentSection === 2 && (
            <>
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                name="bio"
                value={bio}
                onChange={handleOnChange}
                required
              />
              
              <label htmlFor="profilePicture">Profile Picture:</label>
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                accept="image/*"
                onChange={handleFileChange}
              />
              
              <label htmlFor="userType">User Type:</label>
              <select
                id="userType"
                name="userType"
                value={userType}
                onChange={handleOnChange}
                required
              >
                <option value="">Select Type</option>
                <option value="Doctor">Doctor</option>
                <option value="Common Person">Common Person</option>
              </select>
              
              <label htmlFor="contactNumber">Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                value={contactNumber}
                onChange={handleOnChange}
                required
              />
              
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={city}
                onChange={handleOnChange}
                required
              />
              
              {userType === "Doctor" && (
                <>
                  <label htmlFor="hospital">Hospital:</label>
                  <input
                    type="text"
                    id="hospital"
                    name="hospital"
                    value={hospital}
                    onChange={handleOnChange}
                  />
                </>
              )}
              
              <button type="button" onClick={handlePrevious}className="skipButton">Previous</button>
              <button type="submit"className="signUpButton">Sign Up</button>
              <span>
              Already have an account? <Link to="/login">login</Link>
          </span>
            </>
          )}
        </form>
        <ToastContainer />
        <span onClick={handleAdminCheck} className="admin-check">?</span>
      </div>
    </div>
  );
};

export default Signup;
