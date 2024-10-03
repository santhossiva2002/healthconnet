import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Profile.module.css'; // Import the updated CSS module
import NavBar from "../NavBar/NavBar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faCalendarAlt, faPhone, faMapMarkerAlt, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons
import CheckmarkIcon from '../DoctorBadge/CheckmarkIcon'; // Import the CheckmarkIcon component

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:4000/profile', {
          withCredentials: true,
        });

        if (response.data.status) {
          setProfile(response.data.user);
        } else {
          setProfile(null);
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        setProfile(null);
      }
    };

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/posts', {
          withCredentials: true,
        });

        if (response.data.status) {
          setPosts(response.data.posts);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Error fetching posts:', error);
        setPosts([]);
      }
    };

    fetchProfile();
    fetchPosts();
  }, []);

  if (!profile) {
    return <div>Unauthorized or no profile found</div>;
  }

  // Construct the profile picture URL
  const profilePicUrl = profile.profilePicture;
  const basePostImageUrl = 'http://localhost:4000/posts/';

  return (
    <>
      <NavBar />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <img className={styles.profilePic} src={profilePicUrl} alt="Profile" />
          <div className={styles.profileInfo}>
            <h1>
              {profile.username}
              <CheckmarkIcon isDoctor={profile.userType === 'Doctor'} /> {/* Add the checkmark here */}
            </h1>
            <div className={styles.bio}>{profile.bio}</div>
            {profile.userType === 'Doctor' && (
              <div className={styles.doctorDetails}>
                <div className={styles.infoItem}>
                  <i className="fas fa-hospital"></i>
                  <span className={styles.infoText}>{profile.hospital}</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <FontAwesomeIcon icon={faEnvelope} className={styles.iconBlue} />
              <span className={styles.infoText}>{profile.email}</span>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon className={styles.iconBlue} icon={faCalendarAlt} />
              <span className={styles.infoText}>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon className={styles.iconBlue} icon={faPhone} />
              <span className={styles.infoText}>{profile.contactNumber}</span>
            </div>
            <div className={styles.infoItem}>
              <FontAwesomeIcon className={styles.iconBlue} icon={faMapMarkerAlt} />
              <span className={styles.infoText}>{profile.city}</span>
            </div>
          </div>
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
              <span className={styles.infoText}>Posts: {posts.length}</span>
            </div>
          </div>
        </div>
        <div className={styles.postedImages}>
          <h2>Posts</h2>
          <div className={styles.imagesGrid}>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className={styles.postCard}>
                  <img className={styles.postImage} src={post.image || `${basePostImageUrl}${post.image}`} alt="Post" />
                  <div className={styles.postDetails}>
                    <p>{post.content}</p>
                    <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No posts available</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './Profile.module.css'; // Import the updated CSS module
// import NavBar from "../NavBar/NavBar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faCalendarAlt, faPhone, faMapMarkerAlt, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/profile', {
//           withCredentials: true,
//         });

//         if (response.data.status) {
//           setProfile(response.data.user);
//         } else {
//           setProfile(null);
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         setProfile(null);
//       }
//     };

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/posts', {
//           withCredentials: true,
//         });

//         if (response.data.status) {
//           setPosts(response.data.posts);
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setPosts([]);
//       }
//     };

//     fetchProfile();
//     fetchPosts();
//   }, []);

//   if (!profile) {
//     return <div>Unauthorized or no profile found</div>;
//   }

//   // Construct the profile picture URL
//   const profilePicUrl = profile.profilePicture 
//   const basePostImageUrl = 'http://localhost:4000/posts/';

//   return (
//     <>
//       <NavBar />
//       <div className={styles.profileContainer}>
//         <div className={styles.profileHeader}>
//           <img className={styles.profilePic} src={profilePicUrl} alt="Profile" />
//           <div className={styles.profileInfo}>
//             <h1>{profile.username}</h1>
//             <div className={styles.bio}>{profile.bio}</div>
//             {profile.userType === 'Doctor' && (
//               <div className={styles.doctorDetails}>
//                 <div className={styles.infoItem}>
//                   <i className="fas fa-hospital"></i>
//                   <span className={styles.infoText}>{profile.hospital}</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className={styles.additionalInfo}>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faEnvelope} className={styles.iconBlue} />
//               <span className={styles.infoText}>{profile.email}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon className={styles.iconBlue} icon={faCalendarAlt} />
//               <span className={styles.infoText}>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon className={styles.iconBlue} icon={faPhone} />
//               <span className={styles.infoText}>{profile.contactNumber}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon className={styles.iconBlue} icon={faMapMarkerAlt} />
//               <span className={styles.infoText}>{profile.city}</span>
//             </div>
//           </div>
//           <div className={styles.followInfo}>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
//               <span className={styles.infoText}>Following: 50</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faUsers} className={styles.icon} />
//               <span className={styles.infoText}>Followers: 150</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faImages} className={styles.icon} />
//               <span className={styles.infoText}>Posts: {posts.length}</span>
//             </div>
//           </div>
//         </div>
//         <div className={styles.postedImages}>
//           <h2>Posted Images</h2>
//           <div className={styles.imagesGrid}>
//             {posts.length > 0 ? (
//               posts.map((post) => (
//                 <div key={post._id} className={styles.postCard}>
//                 <img className={styles.postImage} src={post.image || `${basePostImageUrl}${post.image}`} alt="Post" />
//                   <div className={styles.postDetails}>
//                     <p>{post.content}</p>
//                     <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No posts available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;


// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import styles from './Profile.module.css'; // Import the updated CSS module
// import NavBar from "../NavBar/NavBar";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEnvelope, faCalendarAlt, faPhone, faMapMarkerAlt, faUsers, faImages, faUserPlus } from '@fortawesome/free-solid-svg-icons'; // Import icons

// const Profile = () => {
//   const [profile, setProfile] = useState(null);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/profile', {
//           withCredentials: true,
//         });

//         if (response.data.status) {
//           setProfile(response.data.user);
//         } else {
//           setProfile(null);
//         }
//       } catch (error) {
//         console.error('Error fetching profile:', error);
//         setProfile(null);
//       }
//     };

//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/posts', {
//           withCredentials: true,
//         });

//         if (response.data.status) {
//           setPosts(response.data.posts);
//         } else {
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//         setPosts([]);
//       }
//     };

//     fetchProfile();
//     fetchPosts();
//   }, []);

//   if (!profile) {
//     return <div>Unauthorized or no profile found</div>;
//   }

//   const profilePicUrl = profile.profilePicture ? `http://localhost:4000/${profile.profilePicture}` : 'https://via.placeholder.com/150';
//   const basePostImageUrl = 'http://localhost:4000/posts/';

//   return (
//     <>
//       <NavBar />
//       <div className={styles.profileContainer}>
//         <div className={styles.profileHeader}>
//           <img className={styles.profilePic} src={profilePicUrl} alt="Profile" />
//           <div className={styles.profileInfo}>
//             <h1>{profile.username}</h1>
//             <div className={styles.bio}>{profile.bio}</div>
//             {profile.userType === 'Doctor' && (
//               <div className={styles.doctorDetails}>
//                 <div className={styles.infoItem}>
//                   <i className="fas fa-hospital"></i>
//                   <span className={styles.infoText}>{profile.hospital}</span>
//                 </div>
//               </div>
//             )}
//           </div>

//           <div className={styles.additionalInfo}>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faEnvelope} className={styles.iconBlue} />
//               <span className={styles.infoText}>{profile.email}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon className={styles.iconBlue} icon={faCalendarAlt} />
//               <span className={styles.infoText}>{new Date(profile.dateOfBirth).toLocaleDateString()}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon className={styles.iconBlue} icon={faPhone} />
//               <span className={styles.infoText}>{profile.contactNumber}</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon className={styles.iconBlue} icon={faMapMarkerAlt} />
//               <span className={styles.infoText}>{profile.city}</span>
//             </div>
//           </div>
//           <div className={styles.followInfo}>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
//               <span className={styles.infoText}>Following: 50</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faUsers} className={styles.icon} />
//               <span className={styles.infoText}>Followers: 150</span>
//             </div>
//             <div className={styles.infoItem}>
//               <FontAwesomeIcon icon={faImages} className={styles.icon} />
//               <span className={styles.infoText}>Posts: 5</span>
//             </div>
//           </div>
//         </div>
//         <div className={styles.postedImages}>
//           <h2>Posted Images</h2>
//           <div className={styles.imagesGrid}>
//             {posts.length > 0 ? (
//               posts.map((post) => (
//                 <div key={post._id} className={styles.postCard}>
//                   <img className={styles.postImage} src={`${basePostImageUrl}${post.image}`} alt="Post" />
//                   <div className={styles.postDetails}>
//                     <p>{post.content}</p>
//                     <p>Posted on: {new Date(post.createdAt).toLocaleDateString()}</p>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p>No posts available</p>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Profile;
