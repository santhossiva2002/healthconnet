import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar/NavBar";
import styles from './DonationPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingHeart, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const DonationPage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
        const { status, user } = data;

        if (status) {
          setUsername(user.username);
          setProfileImage(user.profilePicture);
          toast(`Hello ${user.username}`, { position: "top-right" });
        } else {
          handleLogout();
        }
      } catch (error) {
        console.error('Error verifying cookie:', error);
        handleLogout();
      }
    };

    verifyCookie();
  }, [cookies, navigate]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/all-donations", {
          withCredentials: true,
        });
        const { status, donations: newDonations } = data;

        if (status) {
          setDonations(newDonations);
        }
      } catch (error) {
        console.error('Error fetching donations:', error);
      }
    };

    fetchDonations();
  }, []);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
    window.location.reload();
  };

  return (
    <>
      <NavBar
        username={username}
        onLogout={handleLogout}
      />

      <div className={styles.home_page}>
        <div className={styles.user_name}>
          <div className={styles.username_section}>
            <div className={styles.profile_container}>
              {profileImage && (
                <img
                  src={profileImage}
                  alt="Profile"
                  className={styles.profile_image}
                />
              )}
              <div className={styles.username_name}>
                <h4>Welcome <span>{username}</span></h4>
                <div className={styles.followInfo}>
                  <div className={styles.infoItem}>
                    <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
                    <span className={styles.infoText}>Following: 50</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FontAwesomeIcon icon={faUsers} className={styles.icon} />
                    <span className={styles.infoText}>Followers: 150</span>
                  </div>
                  <div className={styles.infoItem}>
                    <FontAwesomeIcon icon={faImages} className={styles.icon} />
                    <span className={styles.infoText}>Posts: 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.username_section1}>
            <h1>Coming Soon</h1>
          </div>
        </div>

        <div className={styles.center_section}>
          <div className={styles.donation_info}>
            <FontAwesomeIcon icon={faHandHoldingHeart} className={styles.icon} />
            <span className={styles.donation_text}>Donations</span>
          </div>

          <div className={styles.posts_section}>
            <ToastContainer />
            <div className={styles.donations_section}>
              <div className={styles.donations_container}>
                {donations.length > 0 ? (
                  donations.map((donation, index) => (
                    <div key={index} className={styles.donation_card}>
                      {donation.image && (
                        <img
                          src={donation.image} // Image URL directly from backend
                          alt={`Donation ${index}`}
                          className={styles.donation_image}
                        />
                      )}
                      <div className={styles.donation_details}>
                      <div className={styles.donationConent}> <p>{donation.content}</p></div>
                        <p style={{ color: 'green' }}>Goal: ${donation.goal.toLocaleString()}</p>
                        <p style={{ color: 'red' }}>Deadline: {new Date(donation.deadline).toLocaleDateString()}</p>
                        <p>Beneficiary: {donation.beneficiary}</p>
                        <p style={{ color: 'blue' }}>Payment Details: {donation.paymentDetails}</p>
                        <p>Posted on: {new Date(donation.createdAt).toLocaleDateString()}</p>
                        <div className={styles.author_info}>
                          {donation.author.profilePicture && (
                            <img
                              src={donation.author.profilePicture}
                              alt="Author"
                              className={styles.author_image}
                            />
                          )}
                          <p>{donation.author.username}</p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No donations available.</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.right_side}>
          <div className={styles.right_side_top}>
            <h1>Coming Soon</h1>
          </div>
          <div className={styles.right_side_bottom}>
            <h1>Coming Soon</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default DonationPage;



// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './DonationPage.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHandHoldingHeart, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// const DonationPage = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
//         const { status, user } = data;

//         if (status) {
//           setUsername(user.username);
//           setProfileImage(user.profilePicture);
//           toast(`Hello ${user.username}`, { position: "top-right" });
//         } else {
//           handleLogout();
//         }
//       } catch (error) {
//         console.error('Error verifying cookie:', error);
//         handleLogout();
//       }
//     };

//     verifyCookie();
//   }, [cookies, navigate]);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:4000/api/all-donations", {
//           withCredentials: true,
//         });
//         const { status, donations: newDonations } = data;

//         if (status) {
//           setDonations(newDonations);
//         }
//       } catch (error) {
//         console.error('Error fetching donations:', error);
//       }
//     };

//     fetchDonations();
//   }, []);

//   const handleLogout = () => {
//     removeCookie("token");
//     navigate("/login");
//     window.location.reload();
//   };

//   // Construct the profile picture URL
//   const profilePicUrl = profileImage

//   return (
//     <>
//       <NavBar
//         username={username}
//         onLogout={handleLogout}
//       />

//       <div className={styles.home_page}>
//         <div className={styles.user_name}>
//           <div className={styles.username_section}>
//             <div className={styles.profile_container}>
//               {profileImage && (
//                 <img
//                   src={profilePicUrl}
//                   alt="Profile"
//                   className={styles.profile_image}
//                 />
//               )}
//               <div className={styles.username_name}>
//                 <h4>Welcome <span>{username}</span></h4>
//                 <div className={styles.followInfo}>
//                   <div className={styles.infoItem}>
//                     <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
//                     <span className={styles.infoText}>Following: 50</span>
//                   </div>
//                   <div className={styles.infoItem}>
//                     <FontAwesomeIcon icon={faUsers} className={styles.icon} />
//                     <span className={styles.infoText}>Followers: 150</span>
//                   </div>
//                   <div className={styles.infoItem}>
//                     <FontAwesomeIcon icon={faImages} className={styles.icon} />
//                     <span className={styles.infoText}>Posts: 5</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.username_section1}>
//             <h1>Coming Soon</h1>
//           </div>
//         </div>

//         <div className={styles.center_section}>
//           <div className={styles.donation_info}>
//             <FontAwesomeIcon icon={faHandHoldingHeart} className={styles.icon} />
//             <span className={styles.donation_text}>Donations</span>
//           </div>

//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div className={styles.donations_section}>
//               <div className={styles.donations_container}>
//                 {donations.length > 0 ? (
//                   donations.map((donation, index) => (
//                     <div key={index} className={styles.donation_card}>
//                       {donation.image && (
//                         <img
//                           src={`http://localhost:4000/donations/${donation.image}`} // Adjust this based on your actual URL structure
//                           alt={`Donation ${index}`}
//                           className={styles.donation_image}
//                         />
//                       )}
//                       <div className={styles.donation_details}>
//                         <p>{donation.content}</p>
//                         <p>Goal: ${donation.goal.toLocaleString()}</p>
//                         <p>Deadline: {new Date(donation.deadline).toLocaleDateString()}</p>
//                         <p>Beneficiary: {donation.beneficiary}</p>
//                         <p>Payment Details: {donation.paymentDetails}</p>
//                         <p>Posted on: {new Date(donation.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No donations available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.right_side}>
//           <div className={styles.right_side_top}>
//             <h1>Coming Soon</h1>
//           </div>
//           <div className={styles.right_side_bottom}>
//             <h1>Coming Soon</h1>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DonationPage;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './DonationPage.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHandHoldingHeart, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// const DonationPage = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [donations, setDonations] = useState([]);

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post("http://localhost:4000", {}, { withCredentials: true });
//         const { status, user } = data;

//         if (status) {
//           setUsername(user.username);
//           setProfileImage(user.profilePicture);
//           toast(`Hello ${user.username}`, { position: "top-right" });
//         } else {
//           handleLogout();
//         }
//       } catch (error) {
//         console.error('Error verifying cookie:', error);
//         handleLogout();
//       }
//     };

//     verifyCookie();
//   }, [cookies, navigate]);

//   useEffect(() => {
//     const fetchDonations = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:4000/api/all-donations", {
//           withCredentials: true,
//         });
//         const { status, donations: newDonations } = data;

//         if (status) {
//           setDonations(newDonations);
//         }
//       } catch (error) {
//         console.error('Error fetching donations:', error);
//       }
//     };

//     fetchDonations();
//   }, []);

//   const handleLogout = () => {
//     removeCookie("token");
//     navigate("/login");
//     window.location.reload();
//   };

//   const profilePicUrl = profileImage
//     ? `http://localhost:4000/${profileImage}`
//     : 'https://via.placeholder.com/150';

//   return (
//     <>
//       <NavBar
//         username={username}
//         onLogout={handleLogout}
//       />

//       <div className={styles.home_page}>
//         <div className={styles.user_name}>
//           <div className={styles.username_section}>
//             <div className={styles.profile_container}>
//               {profileImage && (
//                 <img
//                   src={profilePicUrl}
//                   alt="Profile"
//                   className={styles.profile_image}
//                 />
//               )}
//               <div className={styles.username_name}>
//                 <h4>Welcome <span>{username}</span></h4>
//                 <div className={styles.followInfo}>
//                   <div className={styles.infoItem}>
//                     <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
//                     <span className={styles.infoText}>Following: 50</span>
//                   </div>
//                   <div className={styles.infoItem}>
//                     <FontAwesomeIcon icon={faUsers} className={styles.icon} />
//                     <span className={styles.infoText}>Followers: 150</span>
//                   </div>
//                   <div className={styles.infoItem}>
//                     <FontAwesomeIcon icon={faImages} className={styles.icon} />
//                     <span className={styles.infoText}>Posts: 5</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//           <div className={styles.username_section1}>
//             <h1>Coming Soon</h1>
//           </div>
//         </div>

//         <div className={styles.center_section}>
//           <div className={styles.donation_info}>
//             <FontAwesomeIcon icon={faHandHoldingHeart} className={styles.icon} />
//             <span className={styles.donation_text}>Donations</span>
//           </div>

//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div className={styles.donations_section}>
//               <div className={styles.donations_container}>
//                 {donations.length > 0 ? (
//                   donations.map((donation, index) => (
//                     <div key={index} className={styles.donation_card}>
//                       {donation.image && (
//                         <img
//                           src={`http://localhost:4000/donations/${donation.image}`}
//                           alt={`Donation ${index}`}
//                           className={styles.donation_image}
//                         />
//                       )}
//                       <div className={styles.donation_details}>
//                         <p>{donation.content}</p>
//                         <p>Goal: ${donation.goal.toLocaleString()}</p>
//                         <p>Deadline: {new Date(donation.deadline).toLocaleDateString()}</p>
//                         <p>Beneficiary: {donation.beneficiary}</p>
//                         <p>Payment Details: {donation.paymentDetails}</p>
//                         <p>Posted on: {new Date(donation.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p>No donations available.</p>
//                 )}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.right_side}>
//           <div className={styles.right_side_top}>
//             <h1>Coming Soon</h1>
//           </div>
//           <div className={styles.right_side_bottom}>
//             <h1>Coming Soon</h1>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default DonationPage;
