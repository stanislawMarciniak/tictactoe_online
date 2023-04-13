import React, { useState } from "react";

function SignUp() {
  const [user, setUser] = useState(null);

  return (
    <div className="signUp">
      <label>Sign up</label>
      <input
        placeholder="Firts Name"
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
    </div>
  );
}

export default SignUp;
