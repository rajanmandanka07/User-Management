const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registration
router.post('/register', async (req, res) => {
    try {
        const { username, name, surname, email, phone, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            username,
            name,
            surname,
            email,
            phone,
            password
        });

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ msg: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Create and return a JWT token
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            'secretKey', // Replace with your own secret key for token generation
            { expiresIn: 3600 }, // Token expiration time
            (err, token) => {
                if (err) throw err;
                res.cookie('token', token, { httpOnly: true }); // Setting the token in a cookie
                res.json({ token, user });
            }
        );
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// Logout
router.get('/logout', (req, res) => {
    res.clearCookie('token'); // Clear the token (if stored in cookies)
    res.json({ msg: 'Logged out successfully' });
});

module.exports = router;
