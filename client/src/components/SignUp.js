import React, { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

function SignUp() {
  const cookies = new Cookies();
  const [user, setUser] = useState(null);

  const signUp = () => {
    axios.post("http://localhost:3001/signup", user).then((res) => {
      const { token, firstName, lastName, username, hashedPassword, userId } =
        res.data;

      cookies.set("token", token);
      cookies.set("firstName", firstName);
      cookies.set("lastName", lastName);
      cookies.set("username", username);
      cookies.set("hashedPassword", hashedPassword);
      cookies.set("userId", userId);
    });
  };

  return (
    <div className="signUp">
      <label>Sign up</label>
      <input
        placeholder="Firts Name"
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <input
        placeholder="Last Name"
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <input
        placeholder="Username"
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        placeholder="Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={signUp}>Sign up</button>
    </div>
  );
}

export default SignUp;
