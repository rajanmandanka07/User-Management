import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function ViewProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const userCookie = Cookies.get('user');
        if (userCookie) {
            setUser(JSON.parse(userCookie));
        }
    }, []);

    return (
        <div className="container mt-5">
            <h1 className='text-center'>View Profile</h1>
            {user ? (
                <div className="card mt-3">
                    <div className="card-body">
                        <h5 className="card-title">User Details</h5>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><strong>Name:</strong> {user.name}</li>
                            <li className="list-group-item"><strong>Surname:</strong> {user.surname}</li>
                            <li className="list-group-item"><strong>Username:</strong> {user.username}</li>
                            <li className="list-group-item"><strong>Email:</strong> {user.email}</li>
                            <li className="list-group-item"><strong>Phone:</strong> {user.phone}</li>
                        </ul>
                    </div>
                </div>
            ) : (
                <p>No user data found.</p>
            )}
        </div>
    );
}
