import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, sendOtp, verifyOtp } from "../api/auth"; // Import API calls

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const navigate = useNavigate();

  // Handle login with password
  const handlePasswordLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (error) {
      alert("Invalid Credentials");
    }
  };

  // Handle OTP request
  const handleSendOtp = async () => {
    try {
      await sendOtp(email);
      alert("OTP sent to your email!");
      setOtpSent(true);
      setShowOtp(true);
      setShowPassword(false);
    } catch (error) {
      alert("Failed to send OTP");
    }
  };

  // Handle OTP verification and login
  const handleOtpLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await verifyOtp(email, otp);
      localStorage.setItem("token", data.token);
      navigate("/profile");
    } catch (error) {
      alert("Invalid OTP");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-80">
        <h2 className="text-lg mb-4 text-center">Login</h2>

        {/* Email Input */}
        <input
          className="border p-2 w-full mb-2"
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Show Buttons for Password & OTP Login */}
        <div className="flex justify-between mb-4">
          <button
            type="button"
            className="bg-blue-500 text-white p-2 w-1/2 mr-2"
            onClick={() => {
              setShowPassword(true);
              setShowOtp(false);
            }}
          >
            Login with Password
          </button>
          <button
            type="button"
            className="bg-green-500 text-white p-2 w-1/2"
            onClick={handleSendOtp}
            disabled={otpSent}
          >
            {otpSent ? "OTP Sent" : "Login with OTP"}
          </button>
        </div>

        {/* Password Input */}
        {showPassword && (
          <input
            className="border p-2 w-full mb-2"
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        )}

        {/* OTP Input */}
        {showOtp && (
          <input
            className="border p-2 w-full mb-2"
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        )}

        {/* Submit Button */}
        {showPassword ? (
          <button
            className="bg-blue-600 text-white p-2 w-full"
            type="submit"
            onClick={handlePasswordLogin}
          >
            Login
          </button>
        ) : showOtp ? (
          <button
            className="bg-green-600 text-white p-2 w-full"
            type="submit"
            onClick={handleOtpLogin}
          >
            Verify OTP & Login
          </button>
        ) : null}
      </form>
    </div>
  );
};

export default Login;
