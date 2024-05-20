

import Suggestion from "../models/suggestion.model.js";
import userService from "./user.service.js";


const getAllSuggestions = async () => {
    console.log('suggestion service');
    try {
        const suggestions = await Suggestion.find().populate('creator', 'name');
        return suggestions;
    } catch (error) {
        throw new Error('Failed to fetch citizen suggestions');
    }
};

const getSuggestionById = async (suggestionId) => {
    console.log('suggestion service');
    console.log(suggestionId);
    try {
        const suggestion = await Suggestion.findById(suggestionId);
        return suggestion;
    } catch (error) {
        throw new Error('Failed to fetch suggestion by ID');
    }
};

const getSuggestionByCreator = async (creatorId) => {
    console.log('suggestion service');
    console.log(creatorId);
    try {
        const suggestion = await Suggestion.find({ creator: creatorId });
        return suggestion;
    } catch (error) {
        throw new Error('Failed to fetch suggestion by ID');
    }
};

const createSuggestion = async (suggestionData) => {
    console.log('suggestion service');
    console.log(suggestionData);
    try {
        const suggestion = new Suggestion(suggestionData);
        await suggestion.save();
        return suggestion;
    } catch (error) {
        throw new Error('Suggestion entry failed. Please try again.');
    }
};



const updateSuggestion = async (suggestionId, updatedData) => {
    console.log('suggestion service');
    console.log(updatedData);
    console.log(suggestionId);
    try {
        const updatedSuggestion = await Suggestion.findByIdAndUpdate(suggestionId, updatedData, { new: true });
        if (!updateSuggestion) {
            throw new Error('Suggestion not found');
        }
        return updateSuggestion;
    } catch (error) {
        throw new Error('Failed to update suggestion');
    }
};

const upvoteSuggestion = async (suggestionId, userId) => {

    try {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const suggestion = await Suggestion.findById(suggestionId);
        if (!suggestion) {
            return suggestion
        }

        // Check if user has already upvoted
        const hasUpvoted = suggestion.votes.some((vote) => vote.equals(userId));
        // console.log(hasUpvoted)
        if (hasUpvoted) {
            throw new Error('User has already upvoted');
        }
        suggestion.votes.push(userId);
        return await suggestion.save();
    } catch (error) {
        throw error
    }
}

const suggestionService = { getAllSuggestions, getSuggestionById, getSuggestionByCreator, createSuggestion, updateSuggestion, upvoteSuggestion };

export default suggestionService;