import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; // Ensure this import is present
import './LoginModule.css';

const VerifyOtp = () => {
    const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    otp: "",
  });
  const { email, otp } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/verifyOtp",
        inputValue,
        { withCredentials: true }
      );
      console.log(data);
      const { message } = data;
      handleSuccess(message);
      setTimeout(() => {
        navigate("/login"); // Redirect to OTP page or appropriate path
      }, 1000);
    } catch (error) {
      console.error("OTP verification error:", error);
      handleError(error.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <><div className="background">
      <div className="column column1">
        <div className="image-container">
          <img src="https://yooper.com.br/blog/wp-content/uploads/2017/03/Social-Media-Compre-Clicks-1.jpg" alt="Background Image 1" />
          <img src="https://as2.ftcdn.net/v2/jpg/02/22/98/19/1000_F_222981953_uS3h9NQb4dDBGbqiD00dy3LbyU9GSgtD.jpg" alt="Background Image 4" />
          <img src="https://medtel.io/wp-content/uploads/tcp-cvr.jpg" alt="Background Image 7" />

          <img src="https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/10/doctor-patient-kid-baby-toddler-1296x728-header.jpg?w=1155&h=1528" alt="Background Image 1" />
          <img src="https://www.michalsons.com/wp-content/uploads/2018/08/Social-media-policy-e1561619696311.jpg" alt="Background Image 4" />
          <img src="https://mirxes.com/blog/wp-content/uploads/2022/07/Patient-care.jpg" alt="Background Image 7" />
        </div>
      </div>
      <div className="column column2">
        <div className="image-container">
          <img src="https://www.hubspot.com/hs-fs/hubfs/social-media-marketing-guide.jpg?width=595&height=400&name=social-media-marketing-guide.jpg" alt="Background Image 2" />
          <img src="https://blog.hootsuite.com/wp-content/uploads/2018/11/history-of-social-media.png" alt="Background Image 5" />
          <img src="https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg" alt="Background Image 8" />

          <img src="https://www.shutterstock.com/image-photo/cheerful-young-arabic-general-practitioner-600nw-2182656031.jpg" alt="Background Image 1" />
          <img src="https://i.pinimg.com/originals/5d/a9/33/5da9331bb1ccecd5de23fdeeeef6e2f3.gif" alt="Background Image 4" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRP8WtdMHRXI-i36bQEG_4CAU8mPTP8zAUjug&s" alt="Background Image 7" />
        </div>

      </div>
      <div className="column column3">
        <div className="image-container">
          <img src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/online/PublishingImages/blog/health-care-economics.jpg&w=1200&h=630" alt="Background Image 3" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTHEP-lXF1cBty4N3Tsi5eNOE7AdpXmDi2LQ&s" alt="Background Image 6" />
          <img src="https://www.sattva.co.in/wp-content/uploads/2022/12/Untitled-1200-%C3%97-630-px.png" alt="Background Image 9" />

          <img src="https://d3njjcbhbojbot.cloudfront.net/api/utilities/v1/imageproxy/https://images.ctfassets.net/wp1lcwdav1p1/7bBXJtVa5BGvWHz5xMdKyT/326829369d99322ec64c254950009b3d/iStock-869623344.jpg?w=1500&h=680&q=60&fit=fill&f=faces&fm=jpg&fl=progressive&auto=format%2Ccompress&dpr=1&w=1000" alt="Background Image 1" />
          <img src="https://www.simplilearn.com/ice9/free_resources_article_thumb/real-impact-social-media.jpg" alt="Background Image 4" />
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcReMWQzSuYmQ-0-iYo9VfbM8YTq-mEyKBkzNg&s" alt="Background Image 7" />
        </div>
      </div>


    </div><div className="form_container">
        <h2>Verify Your OTP</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="Enter your email"
              onChange={handleOnChange}
              required />
          </div>
          <div>
            <label htmlFor="otp">OTP</label>
            <input
              type="text"
              name="otp"
              value={otp}
              placeholder="Enter your OTP"
              onChange={handleOnChange}
              required />
          </div>
          <button type="submit"className="skipButton">Verify OTP</button>
        </form>
        <ToastContainer />
      </div></>
  );
};

export default VerifyOtp;
