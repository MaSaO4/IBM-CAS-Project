import mongoose from 'mongoose';

// Define the schema for comments
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Content of the comment
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // ID of the user who created the comment
  suggestion: { type: mongoose.Schema.Types.ObjectId, ref: 'Suggestion', required: true }, // ID of the suggestion associated with the comment
  creationDate: { type: Date, default: Date.now } // Date when the comment was created
});

// Create the Comment model based on the commentSchema
const Comment = mongoose.model('Comment', commentSchema);

export default Comment;