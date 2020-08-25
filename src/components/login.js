import React from "react";
import { auth, signInWithGoogle } from "../firebase/firebase";
import Input from "./common/input";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      auth.signInWithEmailAndPassword(email, password);
    } catch (ex) {
      setError(ex.message);
    }
  };

  return (
    <div align="center">
      <h3>Login Form </h3>
      <form onSubmit={handleSubmit}>
        <Input name="email" label="Email" value={email} onChange={(value) => setEmail(value)} />
        <Input name="password" label="Password" type="password" value={password} onChange={(value) => setPassword(value)} />
        {error ? <p style={{ color: "red" }}>{error} </p> : ""}
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <button className="btn btn-secondary ml-5" onClick={signInWithGoogle} >
          Sign in with Google
        </button>
      </form>
    </div>
  );
};

export default Login;
