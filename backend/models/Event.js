const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    venue: {
        type: String,
        required: true,
    },
    tickets_sold: {
        type: Number,
        required: true,
    },
    price : {
        type: Number,
        required: true,
    },
    img: {
        type: String,
        required: true
    }
    
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;