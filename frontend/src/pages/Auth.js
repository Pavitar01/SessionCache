import React, { useState } from "react";
import Signup from "../component/Signup";
import Login from "../component/Login";

const Auth = () => {
  const [login, isLoggin] = useState(false);

  return <div>{login ? <Login isLoggin={isLoggin} /> : <Signup isLoggin={isLoggin} />}</div>;
};

export default Auth;
