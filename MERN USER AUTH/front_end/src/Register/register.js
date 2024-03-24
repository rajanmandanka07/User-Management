import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        surname: '',
        email: '',
        phone: '',
        password: ''
    });

    const [alert, setAlert] = useState(null);
    const navigate = useNavigate();
    const { username, name, surname, email, phone, password } = formData;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                setAlert({ type: 'success', message: data.msg });
                setTimeout(() => {
                    setAlert(null);
                    navigate('/');
                }, 3000);
            } else {
                setAlert({ type: 'danger', message: data.msg });
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleBack = () => {
        navigate("/");
    }

    return (
        <div className='container'>
            <div className='d-flex justify-content-center align-items-center vh-100'>
                <div>
                    <form className="row g-3 m-3 p-3 border shadow-sm" onSubmit={handleSubmit}>
                        {alert && (
                            <div className={`alert alert-${alert.type}`} role="alert">
                                {alert.message}
                            </div>
                        )}
                        <h2 className="text-center">Sign up</h2>
                        <div className="col-md-6">
                            <label htmlFor="inputfirstname" className="form-label">First Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="First name"
                                name="name"
                                value={name}
                                onChange={handleChange}
                                aria-label="First name"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputlastname" className="form-label">Last Name</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Last name"
                                name="surname"
                                value={surname}
                                onChange={handleChange}
                                aria-label="Last name"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputusername" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputusername"
                                placeholder="Username"
                                name="username"
                                value={username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="inputPassword4" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="inputPassword4"
                                placeholder="Password"
                                name="password"
                                value={password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-8">
                            <label htmlFor="inputEmail4" className="form-label">E-mail</label>
                            <input
                                type="email"
                                className="form-control"
                                id="inputEmail4"
                                placeholder="E-mail"
                                name="email"
                                value={email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="inputZip" className="form-label">Phone No.</label>
                            <input
                                type="text"
                                className="form-control"
                                id="inputZip"
                                placeholder="Phone No."
                                name="phone"
                                value={phone}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary w-100">Sign up</button>
                            <button type="submit" className="btn btn-outline-secondary my-1 w-100" onClick={handleBack}>Back</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
