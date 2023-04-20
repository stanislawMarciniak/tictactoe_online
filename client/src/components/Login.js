import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./LoginSignUp.css";

function Login({ setIsAuth }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    axios
      .post("http://localhost:3001/login", { username, password })
      .then((res) => {
        const { token, firstName, lastName, username, userId } = res.data;

        cookies.set("token", token);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("username", username);
        cookies.set("userId", userId);
        setIsAuth(true);
      });
  };

  return (
    <div className="signUp">
      <label>Login</label>
      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
