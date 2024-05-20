import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const CommentService = {
    // Get all comments
    getAllComments: async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/comments`);
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Get comments by commenter ID
    getCommentsByCommenterId: async (commenterId) => {
        try {
            const resp = await axios.get(`${BASE_URL}/comments/commenter/${commenterId}`);
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Get comments by suggestion ID
    getCommentsBySuggestionId: async (suggestionId) => {
        try {
            const resp = await axios.get(`${BASE_URL}/comments/suggestion/${suggestionId}`);
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Create a new comment
    createComment: async (commentData) => {
        try {
            const resp = await axios.post(`${BASE_URL}/comment`, commentData);
            return resp.data;
        } catch (error) {
            throw error;
        }
    },

    // Delete a comment by comment ID
    deleteComment: async (commentId) => {
        try {
            const resp = await axios.delete(`${BASE_URL}/comment/${commentId}`);
            return resp.data;
        } catch (error) {
            throw error;
        }
    }
};

export default CommentService;
