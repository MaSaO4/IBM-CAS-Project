import suggestionService from '../services/suggestion.service.js';

// Controller function to get all suggestions
const getAllSuggestions = async (req, res,) => {
    console.log('suggestion controller');
    try {
        const suggestions = await suggestionService.getAllSuggestions();
        res.status(200).json(suggestions);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get a suggestion by ID
const getSuggestionById = async (req, res) => {
    console.log('suggestion controller');
    const suggestionId = req.params.id;
    try {
        const suggestion = await suggestionService.getSuggestionById(suggestionId);
        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to get suggestions by creator
const getSuggestionByCreator = async (req, res) => {
    console.log('suggestion controller');
    const creatorId = req.params.id;
    try {
        const suggestion = await suggestionService.getSuggestionByCreator(creatorId);
        if (!suggestion) {
            return res.status(404).json({ message: 'Suggestion not found' });
        }
        res.status(200).json(suggestion);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Controller function to create a new suggestion
const createSuggestion = async (req, res) => {
    console.log('suggestion controller');
    console.log(req.body);
    try {
        const suggestion = await suggestionService.createSuggestion(req.body);
        res.status(201).json(suggestion);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
};

// Controller function to update a suggestion
const updateSuggestion = async (req, res) => {
    console.log('suggestion controller');
    console.log(req.body);
    console.log(req.params.id);
    const suggestionId = req.params.id;
    const updatedData = req.body;
    try {
        const updatedSuggestion = await suggestionService.updateSuggestion(suggestionId, updatedData);
        res.status(201).json(updatedSuggestion);
    } catch (error) {
        console.log(error.message)
        res.status(400).json({ message: error.message });
    }
};

// Controller function to upvote a suggestion
const upvoteSuggestion = async (req, res) => {
    const suggestionId  = req.params.id;
    const userId = req.body.creator;
    console.log(userId)
    try {
        if(userId){
        const resp = await suggestionService.upvoteSuggestion(suggestionId, userId)
        res.status(200).json(resp)
        }
        else throw new Error('invalid user id')
    } catch (error) {
        console.log(error.message)
        res.status(400).json({message:error.message})
    }
}

export { getAllSuggestions, getSuggestionById, getSuggestionByCreator, createSuggestion, updateSuggestion, upvoteSuggestion };