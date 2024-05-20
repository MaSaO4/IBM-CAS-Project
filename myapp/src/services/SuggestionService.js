import axios from "axios";

const BASE_URL = 'http://localhost:3001';

const SuggestionService = {
    // Get all suggestions
    getAllSuggestions: async () => {
        try {
            const resp = await axios.get(`${BASE_URL}/suggestions`);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Get suggestion by ID
    getSuggestionById: async (suggestionId) => {
        try {
            const resp = await axios.get(`${BASE_URL}/suggestion-by-id/${suggestionId}`);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Get suggestions by creator ID
    getSuggestionByCreatorId: async (creatorId) => {
        try {
            const resp = await axios.get(`${BASE_URL}/suggestion-by-creatorid/${creatorId}`);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Create a new suggestion
    createSuggestion: async (suggestionData) => {
        try {
            const resp = await axios.post(`${BASE_URL}/suggestion`, suggestionData);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Update a suggestion
    updateSuggestion: async (suggestionId, updateData) => {
        try {
            const resp = await axios.put(`${BASE_URL}/suggestion/${suggestionId}`, updateData);
            return resp;
        } catch (error) {
            throw error;
        }
    },

    // Upvote a suggestion
    upvoteSuggestion: async (suggestionId, creatorId) => {
        try {
            const resp = await axios.put(`${BASE_URL}/suggestion-upvote/${suggestionId}`, { creator: creatorId });
            return resp;
        } catch (error) {
            throw error;
        }
    }
}

export default SuggestionService;