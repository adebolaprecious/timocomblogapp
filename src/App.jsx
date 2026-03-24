import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Layout from "./components/Layout";
import Ourstories from "./pages/Ourstories";
import LandingPage from "./pages/LandingPage";
import AdminPosts from "./pages/AdminPosts"
import AdminUsers from "./pages/AdminUsers"
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard"
import Register from "./pages/Register";
import CreatePost from "./pages/CreatePost";
import Profile from "./pages/Profile";
import Library from "./pages/Library";
import AuthGuard from "./auth/AuthGuard";
import Cookies from "universal-cookie";
import PostDetail from "./pages/PostDetail";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const cookies = new Cookies();
  const isAuth = cookies.get("token");
  return (
    <>
      <Navbar />
      
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/Ourstories" element={<Ourstories />} />
        
        <Route element={<AuthGuard isAuth={isAuth} />}></Route>
        <Route path="/Administrator/Dashboard" element={<Dashboard/>}/>
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/users" element={<AdminUsers />} />
         <Route element={<Layout />}></Route>
        <Route path="/post/:id" element={<PostDetail />} />
        <Route path="/library" element={<Library />} />
        <Route path="/home" element={<Home />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/library" element={<Home />} />
        <Route path="/stories" element={<Home />} />
        <Route path="/settings" element={<div>Settings Page</div>} />
        {/* Removed the NotFound route */}
      </Routes>
    </>
  );
};

export default App;