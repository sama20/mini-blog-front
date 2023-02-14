import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from "react-router-dom";
import CommentList from "../comments/CommentList";


const API_URL = process.env.REACT_APP_API_URL;

const ShowPost = ({user}) => {
    const {postId}=useParams()
    const [post, setPost] = useState({});

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const { data } = await axios.get(`${API_URL}/posts/${postId}`);
                setPost(data);

            } catch (error) {
                console.error(error);
            }
        };
        fetchPost();
    }, [postId]);

    return (
        <div className="card">
            <div className="card-body">
                <h1 className="card-title">{post.title}</h1>
                <p className="card-text">{post.content}</p>
            </div>
            <CommentList user={user} />
        </div>
    );
};

export default ShowPost;
