import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import AuthService from "../../services/auth.service";
import PostService from "../../services/post.service";
import {useNavigate} from "react-router-dom";
// import Textarea from "react-validation/src/components/textarea";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
};
const CreatePost = () => {
    let navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    // const navigate = useNavigate();

    useEffect(()=>{
        const user = AuthService.getCurrentUser();
        console.log(user,"user");
        }
    )

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await PostService.createPost({
                title,
                content
            })
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
            <div className="form-group">
                <Input
                    type="text"
                    className="form-control"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                />
            </div>
            <div className="form-group">
                <textarea
                    className="form-control"
                    value={content}
                    placeholder="Content"
                    style={{minHeight:'200px',marginTop:'10px'}}
                    onChange={(e) => setContent(e.target.value)}
                    validations={[required]}
                />
            </div>
            <div className="form-group">
                <button type="submit" className="btn btn-primary btn-block">Create</button>
            </div>
        </Form>
    );
};

export default CreatePost;
