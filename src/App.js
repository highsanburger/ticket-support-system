import "./App.css";
// src\App.js
import React from 'react';

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./Components/common/NavBar";
import Footer from "./Components/common/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";
import LoadingBar from "react-top-loading-bar";
import { setProgress } from "./slices/loadingBarSlice";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Dashboard from "./pages/Dashboard";
import OpenRoute from "./Components/core/Auth/OpenRoute";
import PrivateRoute from "./Components/core/Auth/PrivateRoute";
import MyProfile from "./Components/core/Dashboard/MyProfile";
import Setting from "./Components/core/Dashboard/Settings";


import { ACCOUNT_TYPE } from "./utils/constants";
import AddTicket from "./Components/core/Dashboard/AddTicket/index";
import MyTickets from "./Components/core/Dashboard/MyTickets/MyTickets";


import ScrollToTop from "./Components/ScrollToTop";

import SearchTicket from "./pages/SearchTicket";



import AdminDashboard from "./Components/core/Dashboard/AdminDashboard/AdminDashboard";
import { RiWifiOffLine } from "react-icons/ri";


function App() {
  console.log = function () {};
  const user = useSelector((state) => state.profile.user);
  const progress = useSelector((state) => state.loadingBar);
  const dispatch = useDispatch();
  return (
    <div className=" w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <LoadingBar
        color="#FFD60A"
        height={1.4}
        progress={progress}
        onLoaderFinished={() => dispatch(setProgress(0))}
      />
      <NavBar setProgress={setProgress}></NavBar>
      {!navigator.onLine && (
        <div className="bg-red-500 flex text-white text-center p-2 bg-richblack-300 justify-center gap-2 items-center">
          <RiWifiOffLine size={22} />
          Please check your internet connection.
          <button
            className="ml-2 bg-richblack-500 rounded-md p-1 px-2 text-white"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      )}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />

       

        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/update-password/:id" element={<ResetPassword />} />

        <Route path="/verify-email" element={<VerifyOtp />} />

        <Route path="/about" element={<About />} />

        <Route path="/contact" element={<ContactUs />} />

        

        <Route path="/search/:searchQuery" element={<SearchTicket />} />

        <Route
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="dashboard/my-profile" element={<MyProfile />} />
          <Route path="dashboard/settings" element={<Setting />} />
          {user?.accountType === ACCOUNT_TYPE.CLIENT && (
            <>
            
             
             
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <>
              <Route path="dashboard/add-ticket" element={<AddTicket />} />
              <Route path="dashboard/my-tickets" element={<MyTickets />} />

              <Route
                path="dashboard/admin"
                element={<AdminDashboard />}
              />
            </>
          )}
          
        </Route>

        <Route
          element={
            <PrivateRoute>
          
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.CLIENT && (
            <>
              <Route
                
              />
            </>
          )}
        </Route>

        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
