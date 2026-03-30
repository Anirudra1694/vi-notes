import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../services/authService";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const data = await loginUser(email, password);

      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/sessions");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error: any) {
      console.error(error);
      alert(error.message || "Server error");
    }
  };

  return (
    <div className="login-container">

      <div className="login-header">
        <h1 className="app-title">Welcome to Vi-Notes</h1>
        <p className="app-subtitle">
          Simple • Fast • Focused Writing
        </p>
      </div>
      <br/> <br/>
      <div className="login-box">
        <h2 className="login-title">Login</h2>

        <form onSubmit={handleSubmit} className="login-form">
          
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>

        <p className="register-text">
          Don't have an account?{" "}
          <Link to="/register" className="register-link">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;