import * as client from "./client";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
export default function Profile() {
  const [profile, setProfile] = useState({ username: "", password: "", 
    firstName: "", lastName: "", dob: "", email: "", role: "USER" });
  const navigate = useNavigate();
  const fetchProfile = async () => {
    const account = await client.profile();
    setProfile(account);
  };
  const save = async () => {
    await client.updateUser(profile);
  };
  const signout = async () => {
    await client.signout();
    navigate("/Kanbas/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <div>
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
            <h1>Profile</h1>
            <button onClick={save} className="btn btn-primary">
                Save
            </button>
            <button onClick={signout} className="btn btn-primary">
                Signout
            </button>
        </div>
      {profile && (
        <div>
          <Link to="/Kanbas/Account/Admin/Users"
              className="btn btn-warning w-100" style={{marginTop: "25px", marginBottom: "25px"}}>
              Users
          </Link><br/>
          <input value={profile.username} className="form-control" onChange={(e) =>
            setProfile({ ...profile, username: e.target.value })}/><br/>
          <input value={profile.password} className="form-control" onChange={(e) =>
            setProfile({ ...profile, password: e.target.value })}/><br/>
          <input value={profile.firstName} className="form-control" onChange={(e) =>
            setProfile({ ...profile, firstName: e.target.value })}/><br/>
          <input value={profile.lastName} className="form-control" onChange={(e) =>
            setProfile({ ...profile, lastName: e.target.value })}/><br/>
          <input value={profile.dob} type="date" className="form-control" onChange={(e) =>
            setProfile({ ...profile, dob: e.target.value })}/><br/>
          <input value={profile.email} className="form-control" onChange={(e) =>
            setProfile({ ...profile, email: e.target.value })}/><br/>
          <select onChange={(e) =>
              setProfile({ ...profile, role: e.target.value })}>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </select>
        </div>
      )}
    </div>
  );
}