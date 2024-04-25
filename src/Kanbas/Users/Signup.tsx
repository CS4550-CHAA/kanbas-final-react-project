import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as client from "./client";
export default function Signup() {
  const [error, setError] = useState("");
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const signup = async () => {
    try {
      await client.signup(user);
      navigate("/Kanbas/Account/Profile");
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };
  return (
    <div>
      <h1>Signup</h1>
      {error && <div>{error}</div>}
      <input value={user.username} className="form-control" onChange={(e) => setUser({
          ...user, username: e.target.value })} /><br/>
      <input value={user.password} className="form-control" onChange={(e) => setUser({
          ...user, password: e.target.value })} /><br/>
      <button onClick={signup} type="button" className="btn btn-primary" style={{width: "100%"}}> Signup </button>
    </div>
  );
}