import commentService from "../services/comment.service.js";

// Controller function to get all comments
const getAllComments = async (req, res) => {
    try {
        const comments = await commentService.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get comments by commenter ID
const getCommentByCommenterId = async (req, res) => {
    const commenterId = req.params.id; 
    try {
        const commenter = await commentService.getCommentByCommenterId(commenterId);
        res.status(200).json(commenter); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get comments by suggestion ID
const getCommentBySuggestionId = async (req, res) => {
    const suggestionId = req.params.id; 
    try {
        const suggestion = await commentService.getCommentBySuggestionId(suggestionId);
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new comment
const createComment = async (req, res) => {
    try {
        const comment = await commentService.createComment(req.body);
        res.status(201).json(comment);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Controller function to delete a comment by ID
const deleteComment = async (req, res) => {
    const id = req.params.id;
    try {
        await commentService.deleteComment(id);
        res.status(204).send(); 
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export { getAllComments, getCommentByCommenterId, getCommentBySuggestionId, createComment, deleteComment };