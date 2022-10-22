import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";
import { auth, db, logout } from "./firebase";
import { query, collection, getDocs, where } from "firebase/firestore";
function Dashboard() {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className="dashboard">
       <div className="dashboard__container">
        Logged in as
         <div>{name}</div>
         <div>{user?.email}</div>
        <h1>Register your app</h1>
        <form>
            <label>Name:
                <input id='name' type="text" />
            </label>
            <h1></h1>
            <label>URL:
                <input type="text" />
            </label>
            <label>ICON URL:
                <input type="text" />
            </label>
            <label>description:
                <input type="text" />
            </label>
        </form>
        <button className="dashboard__btn" type='button' onClick={() => {
            const name = document.getElementById('name').value;
            alert(name);
        }}>
          submit
        </button>
        <button className="dashboard__btn" onClick={logout}>
          Logout
        </button>
       </div>
     </div>
  );
}
export default Dashboard;