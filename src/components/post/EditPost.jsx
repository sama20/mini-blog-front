import React, { useState, useEffect } from 'react';
import axios, {post} from 'axios';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import {useNavigate, useParams} from "react-router-dom";
import PostService from "../../services/post.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};

const EditPost = () => {
    let { postId } = useParams();
    // console.log('sdfasdasdasd');
    // console.log(postId);
    let navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('sssssssssss')
                const result = await axios.get(`http://blog.test/api/posts/${postId}`);
                setTitle(result.data.title);
                setContent(result.data.content);

            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await PostService.editPost({title,content},postId);
            navigate("/posts");
            window.location.reload();
        } catch (err) {
            console.error(err);
            navigate("/login");
            window.location.reload();
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <Input
                type="textarea"
                className="form-control"
                name="Content"
                value={content}
                placeholder="Content"
                style={{minHeight: '200px', marginTop: '10px'}}
                onChange={(e) => setContent(e.target.value)}
                validations={[required]}
            />
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">
                    <span>Update</span>
                </button>
            </div>
        </Form>
    );
};

export default EditPost;