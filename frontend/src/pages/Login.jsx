import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      console.log("Attempting login with:", { email, password });
      const res = await API.post("/auth/login", {
        email,
        password,
      });
  console.log("LOGIN RESPONSE:", res.data);
      // adjust this based on backend response
      const token = res.data.accessToken;

      localStorage.setItem("token", token);

      //alert("Login successful");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", marginTop: "100px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <button type="submit" style={{ width: "100%" ,backgroundColor: "#007BFF", color: "white", padding: "10px", border: "none", borderRadius: "5px"}}>
          Login
        </button>
      </form>
      
      <p style={{ marginTop: "10px", textAlign: "center" }}>
        Don't have an account?{" "}
        <span
        onClick={() => navigate("/register")}
        style={{ color: "blue", cursor: "pointer" }}
        >
        Register
        </span>
      </p>



    </div>
  );
}

export default Login;