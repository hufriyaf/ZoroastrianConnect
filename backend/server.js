const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes'); // Path to your routes
const User = require('./models/User'); // Import your User model
const session = require('express-session');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());


// Database connection
mongoose.connect('mongodb+srv://hufriyafatakia:hufriya142003@hufriya.3ysjq.mongodb.net/test?retryWrites=true&w=majority&appName=hufriya')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use(session({
  secret: "abcd",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Update user endpoint
app.put('/api/auth/update-user/:email', async (req, res) => {
  const { email } = req.params;
  const { name, phone_no, city, profession } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email: email },
      { name, phone_no, city, profession },
      { new: true, runValidators: true } // Return the updated document and validate fields
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
});

//delete event from my booked events 
app.put('/api/auth/remove-booked-event', async (req, res) => {
  const { eventId, email } = req.body;

  try {
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { eventsBooked: eventId } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Event removed successfully', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

