import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import UserService from "../../services/user.service";
import postService from "../../services/post.service";

const Posts = ({user}) => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    let navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const result = await postService.allPosts();
                setPosts(result.data);
            } catch (err) {
                setError(err);
            }
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleDelete = async (id) => {
        try {
            await UserService.deletePost(id);
            setPosts(posts.filter(post => post.id !== id));
        } catch (err) {
            console.error(err);
        }
    };
    const handleEdit = postId => {
        navigate(`/edit-post/${postId}`);
        window.location.reload();
    };

    const handleView = postId => {
        navigate(`/post/${postId}`);
        window.location.reload();
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>An error occurred: {error.message}</p>;

    return (
        <>
            {user ?? (<div className="row">
                <Link to={"/create-post"} className="btn btn-primary">
                    Create a post
                </Link>
            </div>)
            }
            <br/>
            <div className="row">
                {posts.map(post => (

                    <div className="col-md-4 mb-3" key={post.id}>
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.content}</p>
                                <button className="btn btn-secondary mr-2" onClick={() => handleView(post.id)}>
                                    View
                                </button>
                                {
                                    user && post.user_id === user.user.id ?
                                        <>
                                            <button className="btn btn-secondary mr-2" onClick={() => handleEdit(post.id)}>
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDelete(post.id)}>
                                                Delete
                                            </button>
                                        </>   : <></>
                                }

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>


    );
};

export default Posts;
