import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://blog.test/api/";

const allPosts = (data) => {
    return axios.get(API_URL + "posts", { headers: authHeader() });
};

const createPost = (data) => {
    return axios.post(API_URL + "posts", {...data},{ headers: authHeader() });
};

async function deletePost(id) {
    try {
        const res = await axios.delete(`http://blog.test/api/posts/${id}`, { headers: authHeader() });
        return res.data;
    } catch (err) {
        throw err;
    }
}

async function editPost(data,id) {
    try {
        let res =axios.put(API_URL + "posts/"+id, {...data},{ headers: authHeader() });
        console.log(res);
        return res;
    } catch (err) {
        throw err;
    }
}

export default {
    allPosts,
    createPost,
    editPost,
    deletePost
};

