import React, { useState } from "react";

function SignUp() {
  const [user, setUser] = useState(null);

  const signUp = () => {};

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
