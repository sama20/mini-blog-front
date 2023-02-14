import React, {useState, useEffect} from 'react';
import Comment from './Comment';
import commentService from "../../services/comment.service";



const CommentList = ({postId,user}) => {

    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect(() => {
        commentService.getCommentByPostId(postId).then(res => {
            setComments(res.data);
        });


        const fetchComments = async () => {
            commentService.getCommentByPostId(postId).then(res => {
                // console.log(res.comments);
                setComments(res.comments);

            });
        };

        fetchComments();
    }, [postId]);
    const handleCreateComment = async () => {
        try {
            commentService.createComment(newComment, postId).then(res => {
                setComments(res.comments);
            })
            // setNewComment("");
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="my-5">
            <h2 className="text-center">Comments</h2>
            {comments && comments.map(comment => (
                <Comment key={comment.id} comment={comment} user={user ? user.user.id : null}/>
            ))}

            <div className="form-group">
                <textarea
                    className="form-control"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                />
            </div>
            <button onClick={handleCreateComment} className="btn btn-primary">Create Comment</button>
        </div>
    );
};

export default CommentList;
