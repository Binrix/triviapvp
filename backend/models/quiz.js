let mongoose = require('mongoose');

let question = new mongoose.Schema({ 
    category: String,
    correct_answer: String,
    difficulty: String,
    incorrect_answers: [String],
    question: String,
    type: String
});

//The schema for the user stored in mongoose
let quizSchema = new mongoose.Schema({
    questions: [question]
});

//Export of the UserSchema
module.exports = new mongoose.model('Quiz',quizSchema);