import axios from "axios";
import AuthService from "../services/auth.service";
import authHeader from "../services/auth-header";

const API_URL = process.env.REACT_APP_API_URL;
console.log(process.env.REACT_APP_API_URL,'----------------');
console.log(process.env,'----------------');

const CommentService = {
    async getCommentByPostId(postId) {
        try {
            const response = await axios.get(`${API_URL}/comments?post_id=${postId}`);
            return response.data;
        } catch (error) {
            console.error(error);
            return error;
        }
    },

    getAllComments: async () => {
        try {
            const response = await axios.get(`${API_URL}/comments`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },

    getCommentById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/comments/${id}`);
            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },

    createComment: async (body, postId, parentId = null) => {
        try {

            const response = await axios.post(`${API_URL}/comments`, {
                body,
                post_id: postId,
                parent_id: parentId,
            }, { headers: authHeader() });

            return response;
        } catch (error) {
            console.log(error);
            return error.response.data;
        }
    },

    updateComment: async (id, body) => {
        try {
            const headers = {
                Authorization: `Bearer ${AuthService.getToken()}`,
            };

            const response = await axios.put(`${API_URL}/comments/${id}`, {
                body,
            }, { headers });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },

    deleteComment: async (id) => {
        try {
            const headers = {
                Authorization: `Bearer ${AuthService.getToken()}`,
            };

            const response = await axios.delete(`${API_URL}/comments/${id}`, {
                headers,
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    },
};

export default CommentService;
