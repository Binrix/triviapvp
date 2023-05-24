let mongoose = require('mongoose');

let question = new mongoose.Schema({
    category: String,
    type: String,
    difficulty: String,
    question: String,
    correct_answer: String,
    incorrect_answers: [String]
});

//The schema for the user stored in mongoose
let quizSchema = new mongoose.Schema({
    lobbyurl: String,
    difficulty: String,
    quizContent: [question]
});

//Export of the UserSchema
module.exports = new mongoose.model('Quiz',quizSchema);