import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Store the token in localStorage
        localStorage.setItem("user", data.user);
        console.log(data.user);
        localStorage.setItem("token", data.token);
        Cookies.set("user", JSON.stringify(data.user), { expires: 7 }); // Expires in 7 days
        Cookies.set("token", data.token, { expires: 7 }); // Expires in 7 days
        setSuccessMessage("Successfully logged in!"); // Display success message
        setTimeout(() => {
          setSuccessMessage(""); // Remove success message after 3 seconds
          navigate("/");
        }, 1000);
      } else {
        const errorData = await response.json();
        setErrorMessage(`Login failed: ${errorData.msg}`); // Display error message
        setTimeout(() => {
          setErrorMessage(""); // Remove error message after 3 seconds
        }, 3000);
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again."); // Display error message for other errors
      setTimeout(() => {
        setErrorMessage(""); // Remove error message after 3 seconds
      }, 3000);
    }
  };

  const handleBack = () => {
    navigate("/");
  }

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="my-3 card p-4" style={{ minWidth: "30rem" }}>
        {successMessage && (
          <div className="alert alert-success my-3" role="alert">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="alert alert-danger my-3" role="alert">
            {errorMessage}
          </div>
        )}
        <div className="mb-3">
          <h2 className="text-center">Login</h2>
          <label htmlFor="formGroupExampleInput" className="form-label">
            E-mail
          </label>
          <input
            type="email"
            className="form-control"
            id="formGroupExampleInput"
            placeholder="xyz@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="formGroupExampleInput2" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="formGroupExampleInput2"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleLogin}>
          Login
        </button>
        <button type="button" className="btn btn-outline-secondary my-1" onClick={handleBack}>
          Back
        </button>
      </div>
    </div>
  );
}
