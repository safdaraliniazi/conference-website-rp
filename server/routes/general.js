// backend/routes/general.js

const express = require('express');
const Announcement = require('../models/Announcement');
const { sendToAdminNewQueryFromContactUs } = require('../utils/mail');
const router = express.Router();

require('dotenv').config();


// Route to get all announcements
router.post('/get-all-announcements', async (req, res) => {
    try {
        const allAnnouncements = await Announcement.find({});
        res.status(200).json(allAnnouncements);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve announcements.', error: err.message });
    }
});

// Route to handle contact form submission
router.post('/contact-us-mail', async (req, res) => {
    const { firstName, lastName, email, message } = req.body;
    console.log('Received contact form data:', { firstName, lastName, email, message });

    // mail to admin: new query from contanct us 
    await sendToAdminNewQueryFromContactUs({ firstName, lastName, email, message });

    // Send a response back to the client
    res.status(200).json({ message: 'Contact form data received successfully' });
});


module.exports = router;
