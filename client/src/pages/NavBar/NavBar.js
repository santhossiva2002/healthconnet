import { Link } from "react-router-dom";
import './NavBar.css'; // Add CSS styles for the navigation bar

const NavBar = ({ username, onLogout }) => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/home">Home</Link></li>
        <li><Link to="/hi">Mental Health Support</Link></li>
        <li><Link to="/post" className="icon-link">+</Link></li>
        {/* <li><Link to="/community-support">Community Support</Link></li> */}
        <li><Link to="/profile">Profile</Link></li>
        <li className="logout-item">
          <button className="loginButton" onClick={onLogout}>Logout</button>
        </li>
      </ul>
    
    </nav>
  );
};

export default NavBar;
