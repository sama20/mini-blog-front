import React, { useState, useEffect } from "react";
import {Routes, Route, Link, Router, useNavigate} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/Login";
import Register from "./components/Register";
import Header from "./components/Header";
import CreatePost from "./components/post/CreatePost";
import Posts from "./components/post/Posts";
import EditPost from "./components/post/EditPost";
import ShowPost from "./components/post/ShowPost";

const App = () => {
    const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
    let navigate = useNavigate();



    useEffect(() => {
        const user = AuthService.getCurrentUser();

        if (user) {
            setCurrentUser(user);
        }
    }, []);


    return (
        <div>
            <Header  user={currentUser} />

            <div className="container mt-3">
                    <Routes>
                        <Route path="/" element={<Posts user={currentUser} />} />
                        <Route path="/posts" element={<Posts user={currentUser} />} />
                        <Route path="/login" element={<Login/>} />
                        <Route path="/register" element={<Register/>} />
                        <Route exact path="/post/:postId" element={<ShowPost user={currentUser ?? null} />} />
                        {
                            !currentUser ??
                            <>
                                <Route path="/create-post" element={<CreatePost/>} />
                                <Route exact path='/edit-post/:postId' element={<EditPost/>} />)
                            </>
                        }
                    </Routes>
            </div>
        </div>
    );
};

export default App;
