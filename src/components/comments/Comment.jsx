import React, { useState } from 'react';

const Comment = ({ comment,userId }) => {
    const [editMode, setEditMode] = useState(false);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleCancel = () => {
        setEditMode(false);
    };

    return (
        <div>
            {editMode ? (
                <></>

            ) : (
                <div>
                    <div>{comment.body}</div>
                    <button onClick={handleEdit}>Edit</button>
                </div>
            )}
        </div>
    );
};

export default Comment;