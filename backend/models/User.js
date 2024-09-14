const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    default: "",
  },
  city: {
    type: String,
    default: "",
  },
  profession: {
    type:String,
    default: "",
  },
  eventsBooked :{
    type : [String],
    default: [],
    ref: 'Event'
  }
});


module.exports = mongoose.model('User', UserSchema);
