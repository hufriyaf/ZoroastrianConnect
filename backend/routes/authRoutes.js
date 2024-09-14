const express = require('express');
const User = require('../models/User');
const Event = require('../models/Event');

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const user = new User({ 
      email, 
      password,
      name,
    });
    await user.save();
    console.log(user);
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Set userId in session
    req.session.userId = user._id;

    res.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Error during login:', error.message);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to log out' });
      }
      res.status(200).json({ message: 'Logout successful' });
    });
  } else {
    res.status(400).json({ message: 'No session found' });
  }
});

router.get('/get-user/:email', async (req,res)=>{
  const {email} = req.params;
  try{
    const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }
    console.log("user:",user);
    return res.status(200).json({user});
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'server error' });
  }
});


// Update profile
router.put('/api/auth/update-user/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, phone_no, city, profession } = req.body;
    
    const user = await User.findOneAndUpdate(
      { email },
      { name, phone_no, city, profession },
      { new: true }
    );
    
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

// Events

router.get('/events', async (req,res,next)=>{
  try{
    const ads = await Event.find({});
    console.log("events:",ads);
    return res.status(200).json({
      success: true,
      count: ads.length,
      data: ads,
    });
  } catch(err) {
    console.log(err);
    res.status(500).json({ error: 'server error' });
  }
});

router.post('/book-event', async (req, res) => {
  const { email, eventId } = req.body;

  try {
      console.log(email,eventId)
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Find the event by name
      const event = await Event.findById(eventId);
      if (!event) {
          return res.status(404).json({ message: 'Event not found' });
      }

      // Check if the user already booked this event
      if (user.eventsBooked.includes(eventId)) {
          return res.status(400).json({ message: 'Event already booked' });
      }

      // Add the event to the user's eventsBooked array
      user.eventsBooked.push(eventId);

      // Increment the tickets_sold in the event
      event.tickets_sold += 1;

      // Save the updated user and event
      await user.save();
      await event.save();

      res.status(200).json({ message: 'Event booked successfully' });
  } catch (error) {
      res.status(500).json({ message: 'An error occurred while booking the event', error });
  }
});

router.get('/user-events/:email', async (req, res) => {
  const { email } = req.params;
  console.log(email);

  try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Find the events based on the IDs in the user's eventsBooked array
      const bookedEvents = await Event.find({ _id: { $in: user.eventsBooked } });
      console.log(bookedEvents);
      res.status(200).json(bookedEvents);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
  }
});



module.exports = router;
