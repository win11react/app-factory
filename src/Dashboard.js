import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { useForm } from 'react-hook-form';
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => alert(data);
  console.log(errors);
  
  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
        <h1>Register your app</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type="text" placeholder="App Name" {...register("App Name", {required: true, max: 18, min: 2})} />
          <input type="url" placeholder="URL" {...register("URL", {required: true})} />
          <input type="url" placeholder="Icon URL" {...register("IconUrl", {required: true})} />
          <input type="text" placeholder="Description" {...register("Description", {required: true, max: 40, min: 6})} />
          
          <select {...register("invert")}>
            <option value="" selected disabled>invert?</option>
            <option value=" false"> false</option>
            <option value=" true"> true</option>
          </select>

          <input type="submit" />
        </form>
        
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
       </div>
     </div>
  );
}
export default Dashboard;