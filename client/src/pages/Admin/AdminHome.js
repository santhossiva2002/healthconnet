import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminHome.css'; // Make sure to create and import a CSS file for styles

const AdminHome = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

    const fetchDoctors = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/doctors');
            setDoctors(response.data);
        } catch (err) {
            console.error('Error fetching doctors:', err);
        }
    };

    useEffect(() => {
        fetchDoctors();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await axios.get('http://localhost:4000/admin/logout');
            alert(response.data.message);
            navigate('/admin/login');
        } catch (err) {
            console.error('Error logging out:', err);
        }
    };

    const handleVerify = async (doctorId) => {
        try {
            const response = await axios.put(`http://localhost:4000/admin/verify/${doctorId}`);
            alert(response.data.message);
            if (response.data.success) {
                setDoctors(doctors.map(doctor => 
                    doctor._id === doctorId ? { ...doctor, isVerified: true } : doctor
                ));
            }
        } catch (err) {
            console.error('Error verifying doctor:', err);
            alert('Error verifying doctor');
        }
    };

    const handleDiscard = async (doctorId) => {
        const reason = prompt('Please enter the reason for discarding the doctor:');
        if (reason) {
            try {
                const response = await axios.delete(`http://localhost:4000/admin/discard/${doctorId}`, { data: { reason } });
                alert(response.data.message);
                if (response.data.success) {
                    setDoctors(doctors.filter(doctor => doctor._id !== doctorId));
                }
            } catch (err) {
                console.error('Error discarding doctor:', err);
                alert('Error discarding doctor');
            }
        }
    };

    return (
        <div className="admin-home-container">
            <h2>Admin Home</h2>
            <button onClick={handleLogout}>Logout</button>
            <h3>Doctors</h3>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor._id} className="doctor-item">
                        <div className="doctor-info">
                            <img src={`http://localhost:4000/${doctor.profilePicture}`} alt="Profile" className="doctor-img" />
                            <div>Username: {doctor.username}</div>
                            <div>Email: {doctor.email}</div>
                            <div>Date of Birth: {new Date(doctor.dateOfBirth).toLocaleDateString()}</div>
                            <div>Bio: {doctor.bio}</div>
                            <div>Contact Number: {doctor.contactNumber}</div>
                            <div>City: {doctor.city}</div>
                            <div>Hospital: {doctor.hospital}</div>
                            <div>
                                <a href={`http://localhost:4000/${doctor.certificate}`} target="_blank" rel="noopener noreferrer">View Certificate</a>
                            </div>
                        </div>
                        <div className="doctor-actions">
                            {!doctor.isVerified && (
                                <button onClick={() => handleVerify(doctor._id)} className="verify-button">Verify</button>
                            )}
                            <button onClick={() => handleDiscard(doctor._id)} className="discard-button">Discard</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminHome;
