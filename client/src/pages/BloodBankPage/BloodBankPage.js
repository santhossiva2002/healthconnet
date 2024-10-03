// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './BloodBankPage.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faTint } from '@fortawesome/free-solid-svg-icons'; // Example icon for blood bank

// const BloodBankPage = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [bloodBanks, setBloodBanks] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const observer = useRef();

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
//           removeCookie("token");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error('Error verifying cookie:', error);
//         removeCookie("token");
//         navigate("/login");
//       }
//     };

//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);

//   const fetchBloodBanks = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/all-bloodbanks?page=${page}`, {
//         withCredentials: true,
//       });
//       const { status, bloodBanks: newBloodBanks } = data;

//       if (status) {
//         setBloodBanks((prevBloodBanks) => [...prevBloodBanks, ...newBloodBanks]);
//         if (newBloodBanks.length === 0) setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching blood banks:', error);
//     }
//   }, [page]);

//   useEffect(() => {
//     if (hasMore) fetchBloodBanks();
//   }, [page, fetchBloodBanks, hasMore]);

//   const lastBloodBankRef = useCallback(
//     (node) => {
//       if (observer.current) observer.current.disconnect();
//       observer.current = new IntersectionObserver((entries) => {
//         if (entries[0].isIntersecting && hasMore) {
//           setPage((prevPage) => prevPage + 1);
//         }
//       });
//       if (node) observer.current.observe(node);
//     },
//     [hasMore]
//   );

//   const profilePicUrl = profileImage ? `http://localhost:4000/${profileImage}` : 'https://via.placeholder.com/150';

//   return (
//     <>
//       <NavBar username={username} onLogout={() => {
//         removeCookie("token");
//         navigate("/login");
//         window.location.reload();
//       }} />

//       <div className={styles.page}>
//         <div className={styles.user_section}>
//           <div className={styles.profile_container}>
//             {profileImage && (
//               <img
//                 src={profilePicUrl}
//                 alt="Profile"
//                 className={styles.profile_image}
//               />
//             )}
//             <div className={styles.username_name}>
//               <h4>Welcome <span>{username}</span></h4>
//               <div className={styles.info_section}>
//                 <div className={styles.infoItem}>
//                   <FontAwesomeIcon icon={faTint} className={styles.icon} />
//                   <span className={styles.infoText}>Blood Banks</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className={styles.blood_banks_section}>
//           <ToastContainer />
//           <div className={styles.blood_banks_container}>
//             {bloodBanks.length > 0 ? (
//               bloodBanks.map((bloodBank, index) => {
//                 if (bloodBanks.length === index + 1) {
//                   return (
//                     <div key={index} ref={lastBloodBankRef} className={styles.blood_bank_card}>
//                       {bloodBank.image && (
//                         <img
//                           src={`http://localhost:4000/blood-banks/${bloodBank.image}`}
//                           alt={`Blood Bank ${index}`}
//                           className={styles.blood_bank_image}
//                         />
//                       )}
//                       <div className={styles.blood_bank_details}>
//                         <p>{bloodBank.content}</p>
//                         <p>Location: {bloodBank.location}</p>
//                         <p>Contact: {bloodBank.contact}</p>
//                         <p>Posted on: {new Date(bloodBank.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 } else {
//                   return (
//                     <div key={index} className={styles.blood_bank_card}>
//                       {bloodBank.image && (
//                         <img
//                           src={`http://localhost:4000/blood-banks/${bloodBank.image}`}
//                           alt={`Blood Bank ${index}`}
//                           className={styles.blood_bank_image}
//                         />
//                       )}
//                       <div className={styles.blood_bank_details}>
//                         <p>{bloodBank.content}</p>
//                         <p>Location: {bloodBank.location}</p>
//                         <p>Contact: {bloodBank.contact}</p>
//                         <p>Posted on: {new Date(bloodBank.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 }
//               })
//             ) : (
//               <p>No blood bank requests available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BloodBankPage;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './BloodBankPage.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faTint, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons';

// const BloodBankPage = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [bloodBanks, setBloodBanks] = useState([]);

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
//           removeCookie("token");
//           navigate("/login");
//         }
//       } catch (error) {
//         console.error('Error verifying cookie:', error);
//         removeCookie("token");
//         navigate("/login");
//       }
//     };

//     verifyCookie();
//   }, [cookies, navigate, removeCookie]);

//   useEffect(() => {
//     const fetchBloodBanks = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:4000/api/all-bloodbanks", {
//           withCredentials: true,
//         });
//         const { status, bloodBanks: fetchedBloodBanks } = data;

//         if (status) {
//           setBloodBanks(fetchedBloodBanks);
//         }
//       } catch (error) {
//         console.error('Error fetching blood banks:', error);
//       }
//     };

//     fetchBloodBanks();
//   }, []);
//   const handleLogout = () => {
//     removeCookie("token");
//     navigate("/login");
//     window.location.reload();
//   };

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
//         <div className={styles.donation_info}>
//                                <FontAwesomeIcon icon={faTint} className={styles.icon} />
//                    <span className={styles.donation_text}>Blood Banks</span>
//                 </div>

//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div className={styles.blood_banks_container}>
//             {bloodBanks.length > 0 ? (
//               bloodBanks.map((bloodBank, index) => (
//                 <div key={index} className={styles.blood_bank_card}>
//                   {bloodBank.image && (
//                     <img
//                       src={`http://localhost:4000/blood-banks/${bloodBank.image}`}
//                       alt={`Blood Bank ${index}`}
//                       className={styles.blood_bank_image}
//                     />
//                   )}
//                   <div className={styles.blood_bank_details}>
//                     <p>{bloodBank.content}</p>
//                     <p>Location: {bloodBank.location}</p>
//                     <p>Contact: {bloodBank.contact}</p>
//                     <p>Posted on: {new Date(bloodBank.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No blood bank requests available.</p>
//             )}
//           </div>
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
// export default BloodBankPage;
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBar from "../NavBar/NavBar";
import styles from './BloodBankPage.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTint, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons';

const BloodBankPage = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [bloodBanks, setBloodBanks] = useState([]);

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
          setProfileImage(user.profilePicture); // Use the URL directly
          toast(`Hello ${user.username}`, { position: "top-right" });
        } else {
          removeCookie("token");
          navigate("/login");
        }
      } catch (error) {
        console.error('Error verifying cookie:', error);
        removeCookie("token");
        navigate("/login");
      }
    };

    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  useEffect(() => {
    const fetchBloodBanks = async () => {
      try {
        const { data } = await axios.get("http://localhost:4000/api/all-bloodbanks", {
          withCredentials: true,
        });
        const { status, bloodBanks: fetchedBloodBanks } = data;

        if (status) {
          setBloodBanks(fetchedBloodBanks);
        }
      } catch (error) {
        console.error('Error fetching blood banks:', error);
      }
    };

    fetchBloodBanks();
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
                  src={profileImage} // Use the URL directly
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
            <FontAwesomeIcon icon={faTint} className={styles.icon} />
            <span className={styles.donation_text}>Blood Banks</span>
          </div>

          <div className={styles.posts_section}>
            <ToastContainer />
            <div className={styles.blood_banks_container}>
              {bloodBanks.length > 0 ? (
                bloodBanks.map((bloodBank, index) => (
                  <div key={index} className={styles.blood_bank_card}>
                    <div className={styles.blood_bank_author}>
                      {bloodBank.author.profilePicture && (
                        <img
                          src={bloodBank.author.profilePicture} // Use the URL directly
                          alt={`Profile of ${bloodBank.author.username}`}
                          className={styles.author_image}
                        />
                      )}
                      <span className={styles.author_name}>{bloodBank.author.username}</span>
                    </div>
                    {bloodBank.image && (
                      <img
                        src={`http://localhost:4000/blood-banks/${bloodBank.image}`}
                        alt={`Blood Bank ${index}`}
                        className={styles.blood_bank_image}
                      />
                      
                    )}
                
                    <div className={styles.blood_bank_details}>

                      <div className={styles.bloodBankConent}><p>{bloodBank.content}</p></div>
                      <br></br>
                      <p  style={{ color: 'blue' }}>Blood Units Required: {bloodBank.bloodUnitsRequired}</p>
                      <p>Hospital Name: {bloodBank.hospitalName}</p>
                      <p style={{ color: 'red' }}>Urgency: {bloodBank.urgency}</p>

            
                      <p>Doctor Contact: {bloodBank.doctorContact}</p>
                      <p  style={{ color: 'green' }} >Donor Eligibility: {bloodBank.donorEligibility}</p>
                      <p>Contact: {bloodBank.contactInfo}</p>
                      <p>Location: {bloodBank.location}</p>
                      <p>Posted on: {new Date(bloodBank.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No blood bank requests available.</p>
              )}
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

export default BloodBankPage;
