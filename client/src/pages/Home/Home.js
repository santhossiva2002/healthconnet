import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import io from "socket.io-client"; // Import Socket.IO client
import NavBar from "../NavBar/NavBar";
import styles from './Home.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faUsers, faImages, faCircle } from '@fortawesome/free-solid-svg-icons';

// Define the URL of your Socket.IO server
const SOCKET_URL = "http://localhost:4000"; // Change this to your server's address

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [newDonationPosts, setNewDonationPosts] = useState(localStorage.getItem("newDonationPosts") === "true");
  const [newBloodBankPosts, setNewBloodBankPosts] = useState(localStorage.getItem("newBloodBankPosts") === "true");
  const postsContainerRef = useRef();

  // Set up Socket.IO client connection
  const socket = useRef(null);

  useEffect(() => {
    // Initialize the Socket.IO client
    socket.current = io(SOCKET_URL);

    // Listen for connection
    socket.current.on("connect", () => {
      console.log("Connected to Socket.IO server");
    });

    // Listen for new posts emitted by the server
    socket.current.on("new-post", (post) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
      toast.info("New post added!", { position: "top-right" });
    });

    // Listen for new donation posts
    socket.current.on("new-donation", (donation) => {
      setNewDonationPosts(true);
      localStorage.setItem("newDonationPosts", "true");
      toast.info("New donation post added!", { position: "top-right" });
    });

    // Listen for new blood bank requests
    socket.current.on("new-bloodbank", (bloodBankRequest) => {
      setNewBloodBankPosts(true);
      localStorage.setItem("newBloodBankPosts", "true");
      toast.info("New blood bank request added!", { position: "top-right" });
    });

    // Cleanup the connection on component unmount
    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
        return;
      }

      try {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        const { status, user } = data;

        if (status) {
          setUsername(user.username);
          setProfileImage(user.profilePicture);
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

  const fetchPosts = useCallback(async () => {
    try {
      const { data } = await axios.get(`http://localhost:4000/api/all-posts?page=${page}`, {
        withCredentials: true,
      });
      const { status, posts: newPosts } = data;

      if (status) {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        if (newPosts.length === 0) setHasMore(false);

        // Check for new donation or blood bank posts
        if (newPosts.some(post => post.category === 'Donation')) {
          setNewDonationPosts(true);
          localStorage.setItem("newDonationPosts", "true");
        }
        if (newPosts.some(post => post.category === 'BloodBank')) {
          setNewBloodBankPosts(true);
          localStorage.setItem("newBloodBankPosts", "true");
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [page, fetchPosts]);

  useEffect(() => {
    if (postsContainerRef.current) {
      postsContainerRef.current.scrollTop = postsContainerRef.current.scrollHeight;
    }
  }, [posts]);

  const handleNavigate = (path) => {
    navigate(path);
    // Reset new post indicators when the user visits the respective page
    if (path === "/donations") {
      setNewDonationPosts(false);
      localStorage.setItem("newDonationPosts", "false");
    }
    if (path === "/blood-banks") {
      setNewBloodBankPosts(false);
      localStorage.setItem("newBloodBankPosts", "false");
    }
  };

  return (
    <>
      <NavBar username={username} onLogout={() => {
        removeCookie("token");
        navigate("/login");
        window.location.reload();
      }} />
      <div className={styles.home_page}>
        <div className={styles.user_name}>
          <div className={styles.username_section}>
            <div className={styles.profile_container}>
              {profileImage && (
                <img
                  src={profileImage} // Directly use the URL from the backend
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

          {/* Section for Donation Promotion and Blood Bank */}
          <div className={styles.username_section1}>
            <div className={styles.section_item} onClick={() => handleNavigate('/donations')}>
              <h2>Donation Promotion</h2>
              {newDonationPosts && <FontAwesomeIcon icon={faCircle} className={styles.new_post_indicator} />}
            </div>
            <div className={styles.section_item} onClick={() => handleNavigate('/blood-banks')}>
              <h2>Blood Bank</h2>
              {newBloodBankPosts && <FontAwesomeIcon icon={faCircle} className={styles.new_post_indicator} />}
            </div>
          </div>
        </div>

        <div className={styles.center_section}>
          <div className={styles.posts_section}>
            <ToastContainer />
            <div className={styles.posts_container} ref={postsContainerRef}>
              {posts.length > 0 ? (
                posts.map((post, index) => {
                  const imageUrl = post.image ? post.image : '';
                  const authorImageUrl = post.author.profilePicture || '';
                  const authorName = post.author.username || 'Unknown';

                  return (
                    <div key={index} className={styles.post_card}>
                      <div className={styles.post_author}>
                        {authorImageUrl && (
                          <img
                            src={authorImageUrl}
                            alt={`Author ${authorName}`}
                            className={styles.author_image}
                          />
                        )}
                        <div className={styles.author_details}>
                          <span className={styles.author_name}>{authorName}</span>
                        </div>
                      </div>
                      {imageUrl && (
                        <img
                          src={imageUrl}
                          alt={`Posted ${index}`}
                          className={styles.post_image}
                        />
                      )}
                      <div className={styles.post_details}>
                        <p>{post.content}</p>
                        <p>Posted on: {new Date(post.createdAt).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })
              ) : (
                <p>No posts available yet.</p>
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

export default Home;


// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './Home.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus, faUsers, faImages, faCircle } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const [newDonationPosts, setNewDonationPosts] = useState(localStorage.getItem("newDonationPosts") === "true");
//   const [newBloodBankPosts, setNewBloodBankPosts] = useState(localStorage.getItem("newBloodBankPosts") === "true");
//   const postsContainerRef = useRef();

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
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

//   const fetchPosts = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/all-posts?page=${page}`, {
//         withCredentials: true,
//       });
//       const { status, posts: newPosts } = data;

//       if (status) {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//         if (newPosts.length === 0) setHasMore(false);

//         // Check for new donation or blood bank posts
//         if (newPosts.some(post => post.category === 'Donation')) {
//           setNewDonationPosts(true);
//           localStorage.setItem("newDonationPosts", "true");
//         }
//         if (newPosts.some(post => post.category === 'BloodBank')) {
//           setNewBloodBankPosts(true);
//           localStorage.setItem("newBloodBankPosts", "true");
//         }
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchPosts();
//   }, [page, fetchPosts]);

//   useEffect(() => {
//     if (postsContainerRef.current) {
//       postsContainerRef.current.scrollTop = postsContainerRef.current.scrollHeight;
//     }
//   }, [posts]);

//   const handleNavigate = (path) => {
//     navigate(path);
//     // Reset new post indicators when the user visits the respective page
//     if (path === "/donation") {
//       setNewDonationPosts(false);
//       localStorage.setItem("newDonationPosts", "false");
//     }
//     if (path === "/blood-bank") {
//       setNewBloodBankPosts(false);
//       localStorage.setItem("newBloodBankPosts", "false");
//     }
//   };

//   return (
//     <>
//       <NavBar username={username} onLogout={() => {
//         removeCookie("token");
//         navigate("/login");
//         window.location.reload();
//       }} />

//       <div className={styles.home_page}>
//         <div className={styles.user_name}>
//           <div className={styles.username_section}>
//             <div className={styles.profile_container}>
//               {profileImage && (
//                 <img
//                   src={profileImage} // Directly use the URL from the backend
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

//           {/* Section for Donation Promotion and Blood Bank */}
//           <div className={styles.username_section1}>
//             <div className={styles.section_item} onClick={() => handleNavigate('/donations')}>
//               <h2>Donation Promotion</h2>
//               {newDonationPosts && <FontAwesomeIcon icon={faCircle} className={styles.new_post_indicator} />}
//             </div>
//             <div className={styles.section_item} onClick={() => handleNavigate('/blood-banks')}>
//               <h2>Blood Bank</h2>
//               {newBloodBankPosts && <FontAwesomeIcon icon={faCircle} className={styles.new_post_indicator} />}
//             </div>
//           </div>
//         </div>

//         <div className={styles.center_section}>
//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div className={styles.posts_container} ref={postsContainerRef}>
//               {posts.length > 0 ? (
//                 posts.map((post, index) => {
//                   const imageUrl = post.image ? post.image : '';
//                   const authorImageUrl = post.author.profilePicture || '';
//                   const authorName = post.author.username || 'Unknown';

//                   return (
//                     <div key={index} className={styles.post_card}>
//                       <div className={styles.post_author}>
//                         {authorImageUrl && (
//                           <img
//                             src={authorImageUrl}
//                             alt={`Author ${authorName}`}
//                             className={styles.author_image}
//                           />
//                         )}
//                         <div className={styles.author_details}>
//                           <span className={styles.author_name}>{authorName}</span>
//                         </div>
//                       </div>
//                       {imageUrl && (
//                         <img
//                           src={imageUrl}
//                           alt={`Posted ${index}`}
//                           className={styles.post_image}
//                         />
//                       )}
//                       <div className={styles.post_details}>
//                         <p>{post.content}</p>
//                         <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No posts available.</p>
//               )}
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

// export default Home;


// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './Home.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const postsContainerRef = useRef();

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
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

//   const fetchPosts = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/all-posts?page=${page}`, {
//         withCredentials: true,
//       });
//       const { status, posts: newPosts } = data;

//       if (status) {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//         if (newPosts.length === 0) setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchPosts();
//   }, [page, fetchPosts]);

//   useEffect(() => {
//     if (postsContainerRef.current) {
//       postsContainerRef.current.scrollTop = postsContainerRef.current.scrollHeight;
//     }
//   }, [posts]);

//   return (
//     <>
//       <NavBar username={username} onLogout={() => {
//         removeCookie("token");
//         navigate("/login");
//         window.location.reload();
//       }} />

//       <div className={styles.home_page}>
//         <div className={styles.user_name}>
//           <div className={styles.username_section}>
//             <div className={styles.profile_container}>
//               {profileImage && (
//                 <img
//                   src={profileImage} // Directly use the URL from the backend
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
//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div
//               className={styles.posts_container}
//               ref={postsContainerRef}
//             >
//               {posts.length > 0 ? (
//                 posts.map((post, index) => {
//                   const imageUrl = post.image ? post.image : ''; // Use the URL from Firebase Storage
//                   const authorImageUrl = post.author.profilePicture || '';
//                   const authorName = post.author.username || 'Unknown';

//                   return (
//                     <div key={index} className={styles.post_card}>
//                       <div className={styles.post_author}>
//                         {authorImageUrl && (
//                           <img
//                             src={authorImageUrl}
//                             alt={`Author ${authorName}`}
//                             className={styles.author_image}
//                           />
//                         )}
//                         <div className={styles.author_details}>
//                           <span className={styles.author_name}>{authorName}</span>
//                         </div>
//                       </div>
//                       {imageUrl && (
//                         <img
//                           src={imageUrl}
//                           alt={`Posted ${index}`}
//                           className={styles.post_image}
//                         />
//                       )}
//                       <div className={styles.post_details}>
//                         <p>{post.content}</p>
//                         <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No posts available.</p>
//               )}
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

// export default Home;


// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './Home.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [hasMore, setHasMore] = useState(true);
//   const postsContainerRef = useRef();

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
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

//   const fetchPosts = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/all-posts?page=${page}`, {
//         withCredentials: true,
//       });
//       const { status, posts: newPosts } = data;

//       if (status) {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//         if (newPosts.length === 0) setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }, [page]);

//   useEffect(() => {
//     fetchPosts();
//   }, [page, fetchPosts]);

//   useEffect(() => {
//     if (postsContainerRef.current) {
//       postsContainerRef.current.scrollTop = postsContainerRef.current.scrollHeight;
//     }
//   }, [posts]);

//   return (
//     <>
//       <NavBar username={username} onLogout={() => {
//         removeCookie("token");
//         navigate("/login");
//         window.location.reload();
//       }} />

//       <div className={styles.home_page}>
//         <div className={styles.user_name}>
//           <div className={styles.username_section}>
//             <div className={styles.profile_container}>
//               {profileImage && (
//                 <img
//                   src={profileImage} // Directly use the URL from the backend
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
//           <div className={styles.posts_section}>
            
//             <ToastContainer />
//             <div
//               className={styles.posts_container}
//               ref={postsContainerRef}
//             >
//               {posts.length > 0 ? (
//                 posts.map((post, index) => {
//                   const imageUrl = post.image ? post.image : ''; // Use the URL from Firebase Storage
//                   return (
//                     <div key={index} className={styles.post_card}>
//                       {imageUrl && (
//                         <img
//                           src={imageUrl}
//                           alt={`Posted ${index}`}
//                           className={styles.post_image}
//                         />
//                       )}
//                       <div className={styles.post_details}>
//                         <p>{post.content}</p>
//                         <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                       </div>
//                     </div>
//                   );
//                 })
//               ) : (
//                 <p>No posts available.</p>
//               )}
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

// export default Home;


// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './Home.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [posts, setPosts] = useState([]);
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
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
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

//   const fetchPosts = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/all-posts?page=${page}`, {
//         withCredentials: true,
//       });
//       const { status, posts: newPosts } = data;

//       if (status) {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]);
//         if (newPosts.length === 0) setHasMore(false);
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }, [page]);

//   useEffect(() => {
//     if (hasMore) fetchPosts();
//   }, [page, fetchPosts, hasMore]);

//   const lastPostRef = useCallback(
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

//   return (
//     <>
//       <NavBar username={username} onLogout={() => {
//         removeCookie("token");
//         navigate("/login");
//         window.location.reload();
//       }} />

//       <div className={styles.home_page}>
//         <div className={styles.user_name}>
//           <div className={styles.username_section}>
//             <div className={styles.profile_container}>
//               {profileImage && (
//                 <img
//                   src={profileImage} // Directly use the URL from the backend
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
//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div className={styles.posts_container}>
//               {posts.length > 0 ? (
//                 posts.map((post, index) => {
//                   if (posts.length === index + 1) {
//                     return (
//                       <div key={index} ref={lastPostRef} className={styles.post_card}>
//                         {post.image && (
//                           <img
//                             src={`http://localhost:4000/posts/${post.image}`}
//                             alt={`Posted ${index}`}
//                             className={styles.post_image}
//                           />
//                         )}
//                         <div className={styles.post_details}>
//                           <p>{post.content}</p>
//                           <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                     );
//                   } else {
//                     return (
//                       <div key={index} className={styles.post_card}>
//                         {post.image && (
//                           <img
//                             src={`http://localhost:4000/posts/${post.image}`}
//                             alt={`Posted ${index}`}
//                             className={styles.post_image}
//                           />
//                         )}
//                         <div className={styles.post_details}>
//                           <p>{post.content}</p>
//                           <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                     );
//                   }
//                 })
//               ) : (
//                 <p>No posts available.</p>
//               )}
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

// export default Home;

// import { useEffect, useState, useRef, useCallback } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './Home.module.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUserPlus, faUsers, faImages } from '@fortawesome/free-solid-svg-icons';

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [page, setPage] = useState(1); // State to track page number
//   const [hasMore, setHasMore] = useState(true); // State to check if more posts are available
//   const observer = useRef(); // Ref for the intersection observer

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
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

//   // Function to fetch posts based on the page number
//   const fetchPosts = useCallback(async () => {
//     try {
//       const { data } = await axios.get(`http://localhost:4000/api/all-posts?page=${page}`, {
//         withCredentials: true,
//       });
//       const { status, posts: newPosts } = data;

//       if (status) {
//         setPosts((prevPosts) => [...prevPosts, ...newPosts]); // Append new posts
//         if (newPosts.length === 0) setHasMore(false); // If no more posts, set hasMore to false
//       }
//     } catch (error) {
//       console.error('Error fetching posts:', error);
//     }
//   }, [page]);

//   // Use effect to fetch posts whenever the page changes
//   useEffect(() => {
//     if (hasMore) fetchPosts();
//   }, [page, fetchPosts, hasMore]);

//   // Callback function to handle when the observer detects the end of the posts
//   const lastPostRef = useCallback(
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
//           <div className={styles.posts_section}>
//             <ToastContainer />
//             <div className={styles.posts_container}>
//               {posts.length > 0 ? (
//                 posts.map((post, index) => {
//                   if (posts.length === index + 1) {
//                     // Last post will have the ref to trigger infinite scroll
//                     return (
//                       <div key={index} ref={lastPostRef} className={styles.post_card}>
//                         {/* Post Content */}
//                         {post.image && (
//                           <img
//                             src={`http://localhost:4000/posts/${post.image}`}
//                             alt={`Posted ${index}`}
//                             className={styles.post_image}
//                           />
//                         )}
//                         <div className={styles.post_details}>
//                           <p>{post.content}</p>
//                           <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                     );
//                   } else {
//                     // Other posts without ref
//                     return (
//                       <div key={index} className={styles.post_card}>
//                         {post.image && (
//                           <img
//                             src={`http://localhost:4000/posts/${post.image}`}
//                             alt={`Posted ${index}`}
//                             className={styles.post_image}
//                           />
//                         )}
//                         <div className={styles.post_details}>
//                           <p>{post.content}</p>
//                           <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                         </div>
//                       </div>
//                     );
//                   }
//                 })
//               ) : (
//                 <p>No posts available.</p>
//               )}
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

// export default Home;


// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useCookies } from "react-cookie";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import NavBar from "../NavBar/NavBar";
// import styles from './Home.module.css'; // Import CSS module

// const Home = () => {
//   const navigate = useNavigate();
//   const [cookies, removeCookie] = useCookies([]);
//   const [username, setUsername] = useState("");
//   const [profileImage, setProfileImage] = useState(""); // State for profile image
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const verifyCookie = async () => {
//       if (!cookies.token) {
//         navigate("/login");
//         return;
//       }

//       try {
//         const { data } = await axios.post(
//           "http://localhost:4000",
//           {},
//           { withCredentials: true }
//         );
//         const { status, user } = data;

//         if (status) {
//           setUsername(user.username); // Set username
//           setProfileImage(user.profilePicture); // Set profile image URL
//           toast(`Hello ${user.username}`, { // Display username in toast
//             position: "top-right",
//           });
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

//     const fetchAllPosts = async () => {
//       try {
//         const { data } = await axios.get('http://localhost:4000/api/all-posts', {
//           withCredentials: true,
//         });
//         const { status, posts } = data;
//         if (status) {
//           setPosts(posts);
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       }
//     };

//     fetchAllPosts();
//   }, [cookies, navigate, removeCookie]);

//   // Default profile image URL
//   const profilePicUrl = profileImage ? `http://localhost:4000/${profileImage}` : 'https://via.placeholder.com/150';

//   return (
//     <>
//       <NavBar username={username} onLogout={() => {
//         removeCookie("token");
//         navigate("/login");
//         window.location.reload();
//       }} />

//       <div className={styles.home_page}>
//         <div className={styles.left_section}>
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
//               </div>
//             </div>
//           </div>
//           <div className={styles.actions_section}>
//             <div
//               className={styles.action_card}
//               onClick={() => navigate("/donor-promotion")}
//             >
//               Donor Promotion
//             </div>
//             <div
//               className={styles.action_card}
//               onClick={() => navigate("/blood-banker")}
//             >
//               Blood Banker
//             </div>
//           </div>
//         </div>

//         <div className={styles.posts_section}>
//           <ToastContainer />
//           <div className={styles.posts_container}>
//             {posts.length > 0 ? (
//               posts.map((post, index) => (
//                 <div key={index} className={styles.post_card}>
//                   {/* Author Info */}
//                   <div className={styles.author_info}>
//                     {post.author.profilePicture ? (
//                       <img
//                         src={`http://localhost:4000/${post.author.profilePicture.replace(/\\/g, '/')}`}
//                         alt={post.author.username}
//                         className={styles.author_image}
//                       />
//                     ) : (
//                       <img
//                         src="https://via.placeholder.com/50"
//                         alt={post.author.username}
//                         className={styles.author_image}
//                       />
//                     )}
//                     <p>{post.author.username}</p>
//                   </div>
//                   {/* Post Content */}
//                   {post.image && (
//                     <img
//                       src={`http://localhost:4000/posts/${post.image}`}
//                       alt={`Posted ${index}`}
//                       className={styles.post_image}
//                     />
//                   )}
//                   <div className={styles.post_details}>
//                     <p>{post.content}</p>
//                     <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No posts available.</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Home;
