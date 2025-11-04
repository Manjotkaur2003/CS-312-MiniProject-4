import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import BlogPostForm from "./components/BlogPostForm";
import PostList from "./components/PostList";
import EditPost from "./components/EditPost";
import MyProfile from "./components/MyProfile";

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
                <a className="navbar-brand" href="/">BlogApp</a>
                <div className="ms-auto">
                    {user ? (
                        <>
                            <span className="text-light me-3">Hi, {user.name}</span>
                            <button className="btn btn-outline-light btn-sm" onClick={() => setUser(null)}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <a href="/signin" className="btn btn-outline-light btn-sm me-2">Sign In</a>
                            <a href="/signup" className="btn btn-light btn-sm">Sign Up</a>
                        </>
                    )}
                </div>
            </nav>

            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<PostList user={user} />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/signin" element={<Signin setUser={setUser} />} />
                    <Route path="/create" element={<BlogPostForm user={user} />} />
                    <Route path="/edit/:id" element={<EditPost user={user} />} />
                    <Route path="/profile" element={<MyProfile user={user} />} />
                </Routes>
            </div>
        </Router>
    );
}
