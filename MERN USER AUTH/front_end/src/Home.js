import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ViewProfile from './ViewProfile';
import Cookies from 'js-cookie';

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token')); // Check if the user is logged in
    console.log(isLoggedIn);
    const [userName, setUserName] = useState('');
    const [users, setUsers] = useState([]);
    const [showProfile, setShowProfile] = useState(false);

    useEffect(() => {
        setIsLoggedIn(false);
    }, []);


    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            const userData = JSON.parse(userCookie);
            setIsLoggedIn(true);
            setUserName(userData.name);
        }
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/api/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setUsers(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const handleLogout = () => {
        // Clear all cookies
        Object.keys(Cookies.get()).forEach((cookieName) => {
            Cookies.remove(cookieName);
        });

        setIsLoggedIn(false); // Set user as logged out
        setSuccessMessage('Successfully logged out'); // Display success message
        setTimeout(() => {
            setSuccessMessage(''); // Remove success message after 3000 milliseconds (3 seconds)
        }, 3000);
        setShowProfile(false);
    };

    const handleShowProfile = () => {
        setShowProfile((prevShowProfile) => !prevShowProfile); // Toggle the profile component
    };

    const [successMessage, setSuccessMessage] = useState('');

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div className="navbar-brand">
                        User Management
                    </div>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <div className="d-flex">
                            {isLoggedIn ? (
                                <>
                                    <span className="text-light m-2">Welcome, {userName}</span>
                                    <button type="button" className="btn btn-primary mx-3" onClick={handleShowProfile}>
                                        View Profile
                                    </button>
                                    <button type="button" className="btn btn-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" type="button" className="btn btn-primary mx-3">
                                        Login
                                    </Link>
                                    <Link to="/register" type="button" className="btn btn-outline-primary">
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <div className='container'>
                {/* <ViewProfile /> */}
                {successMessage && (
                    <div className="alert alert-success my-3" role="alert">
                        {successMessage}
                    </div>
                )}
            </div>

            <div className="container mt-3">
                {showProfile ? (<ViewProfile />) : (
                    <>
                        <h2>All Users</h2>
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.name} {user.surname}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}
            </div>
        </div >
    );
}
