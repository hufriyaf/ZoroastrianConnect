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

    // Return user data or token (if you're using JWT)
    res.json({ message: 'Login successful', user });
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

router.put('/events/:id/edit-event', async (req, res) => {
  const { id } = req.params;
  const { name, desc, date, time, venue, tickets_sold, price, img } = req.body;

  try {
    // Find the event by ID and update it
    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      { name, desc, date, time, venue, tickets_sold, price, img },
      { new: true, runValidators: true } // Return the updated document and run validators
    );

    if (!updatedEvent) {
      return res.status(404).json({ success: false, message: 'Event not found' });
    }

    return res.status(200).json({ success: true, data: updatedEvent });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server error' });
  }
});

// Events

router.get('/events', async (req, res, next) => {
  try {
    // Get today's date and set time to 00:00:00 for comparison
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Find events where the date is greater than or equal to today's date
    const events = await Event.find({ date: { $gte: today } });
    
    console.log("Upcoming events:", events);
    
    return res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});


router.get('/all-events', async (req,res,next)=>{
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

router.post('/create-event', async (req, res) => {
  const { name, desc, date, time, venue, tickets_sold, price } = req.body;

  console.log("Price:", price);

  const img = "/assets/atashbehram.jpg";

  try {
    // Create a new event instance
    const newEvent = new Event({
      name,
      desc,
      date,
      time,
      venue,
      tickets_sold,
      price,
      img,
    });

    console.log(newEvent);

    // Save the event to the database
    await newEvent.save();

    res.status(201).json({ message: 'Event created successfully', event: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ message: 'Error creating event' });
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

router.get('/allusers', async (req, res) => {
  try {
      // Find the user by email
      const users = await User.find({});
      console.log(users);
      if (users.length == 0) {
          return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(users);
  } catch (error) {
      res.status(500).json({ message: 'Error fetching events', error });
  }
});

router.delete('/delete-event/:id', async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    console.log(event);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting event', error });
  }
});


module.exports = router;
