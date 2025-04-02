import React,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../api/auth";

const Signup = () => {
  const [userData, setUserData] = useState({ name: "", email: "",mobile :"", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signupUser(userData);
      console.log("singup",res)
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      alert("Signup failed!");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-lg mb-4">Signup</h2>
        <input className="border p-2 w-full mb-2" type="text" placeholder="Name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} />
        <input className="border p-2 w-full mb-2" type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <input className="border p-2 w-full mb-2" type="text" placeholder="mobile" onChange={(e) => setUserData({ ...userData, mobile: e.target.value })} />
        <input className="border p-2 w-full mb-2" type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} />
        <button className="bg-green-500 text-white p-2 w-full" type="submit">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
