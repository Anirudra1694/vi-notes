import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import "./Register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await registerUser(email, password);

      alert(data.message);

      if (data.message === "User registered successfully") {
        navigate("/login");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Server error");
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2 className="register-title">Registration</h2>

        <form onSubmit={handleSubmit} className="register-form">
          
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Create a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

      </div>
    </div>
  );
};

export default Register;