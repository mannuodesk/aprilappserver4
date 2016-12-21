var mongoose = require('mongoose');


// Define our beer schema
var ConversationMessagesSchema   = new mongoose.Schema({
    message: String
    
});

// Export the Mongoose model
module.exports = mongoose.model('ConversationMessages', ConversationMessagesSchema);