import Comment from '../models/comment.model.js';

/**
 * Create a new comment.
 * @param {Object} commentData - Data for the new comment
 * @returns {Promise<Object>} - Saved comment object
 */
const createComment = async (commentData) => {
  const newComment = new Comment(commentData);
  try {
    const savedComment = await newComment.save();
    return savedComment;
  } catch (err) {
    throw new Error(`Error creating comment: ${err.message}`);
  }
};

/**
 * Get all comments.
 * @returns {Promise<Array>} - Array of comments
 */
const getAllComments = async () => {
  try {
    const comments = await Comment.find().populate('creator').populate('suggestion');
    return comments;
  } catch (err) {
    throw new Error(`Error fetching comments: ${err.message}`);
  } 
};

/**
 * Get comments created by a specific user.
 * @param {string} creatorId - ID of the comment creator
 * @returns {Promise<Object>} - Comment created by the specified user
 */
const getCommentByCreatorId = async (creatorId) => {
  try {
      const comment = await Comment.findOne({creator: creatorId})
      return comment;
  } catch (error) {
      throw new Error('Failed to fetch commenter by commenter ID');
  }
};

/**
 * Get comments associated with a specific suggestion.
 * @param {string} suggestionId - ID of the suggestion
 * @returns {Promise<Array>} - Comments associated with the suggestion
 */
const getCommentBySuggestionId = async (suggestionId) => {
  try {
    const suggestion = await Comment.find({suggestion: suggestionId}).populate('creator', 'name')
    return suggestion;
  } catch (error) {
      throw new Error('Failed to fetch suggestion by suggestion ID');
  }
};

/**
 * Delete a comment by its ID.
 * @param {string} commentId - ID of the comment to delete
 */
const deleteComment = async (commentId) => {
  try {
    await Comment.findByIdAndDelete(commentId);
  } catch (err) {
    throw new Error(`Error deleting comment with ID ${commentId}: ${err.message}`);
  }
};

const commentService = {
  createComment,
  getAllComments,
  getCommentByCreatorId,
  getCommentBySuggestionId,
  deleteComment,
};

export default commentService;