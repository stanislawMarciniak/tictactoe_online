import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./LoginSignUp.css";

function Login({ setIsAuth, setIsButtonPressed }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const cookies = new Cookies();
  const login = () => {
    setIsButtonPressed(true);

    axios
      .post("https://tictactoe-ifr4.onrender.com/login", { username, password })
      .then((res) => {
        const { token, firstName, lastName, username, userId } = res.data;

        cookies.set("token", token);
        cookies.set("firstName", firstName);
        cookies.set("lastName", lastName);
        cookies.set("username", username);
        cookies.set("userId", userId);
        setIsAuth(true);
      })
      .finally(() => {
        setIsButtonPressed(false);
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
      <div className="demo">
        <p>
          Demo accounts:
          <br /> Login: demo1, demo2
          <br /> Password: demo1, demo2
        </p>
      </div>
      <button onClick={login}>Login</button>
    </div>
  );
}

export default Login;
