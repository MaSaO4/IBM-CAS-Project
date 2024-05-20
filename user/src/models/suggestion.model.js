import mongoose from "mongoose";

// Defining the schema for suggestions
const suggestionSchema = new mongoose.Schema({
    title: { type: String, required: true }, // Title of the suggestion
    description: { type: String, required: true }, // Description of the suggestion
    category: { // Category of the suggestion
        type: String,
        enum: ["Infrastructure", "Public Services", "Environment", "Transportation", "Other"],
        required: true
    },
    status: { // Status of the suggestion
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
    },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // User who created the suggestion
    creationDate: { type: Date, default: Date.now }, // Date when the suggestion was created
    lastUpdatedDate: { type: Date, default: Date.now }, // Date when the suggestion was last updated
    votes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Users who voted for the suggestion
});

// Create the Suggestion model based on the suggestionSchema
const Suggestion = mongoose.model("Suggestion", suggestionSchema);

export default Suggestion;