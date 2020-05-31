const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    clientName: {
        type: String,
        required: true
    },
    clientEmail: {
        type: String,
        required: true
    },
    clientSubject: {
        type: String,
        required: true
    },
    clientMessage: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Message', messageSchema);