// backend/routes/users.js

const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const Submission = require('../models/Submission'); // Assuming you have a File model
const router = express.Router();
const multer = require('multer');
const path = require('path');



const verifyReviewer = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided.' });
    }

    jwt.verify(token, 'ipdims', (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: 'Failed to authenticate token.' });
        }

        // Assuming 'isAdmin' is a field in your user model
        if (decoded.role !== 'reviewer') {
            return res.status(403).json({ message: 'Not authorized.' });
        }

        // Token is valid and user is admin
        req.user = decoded;
        next();
    });
};

// Set up Multer storage options
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Destination folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Filename with timestamp
    }
});

const upload = multer({ storage });



// Route to handle file uploads
router.post('/upload', verifyReviewer, upload.single('file'), async (req, res) => {
    const { filename } = req.file;
    const { name, email, members } = req.body;

    const submission = new Submission({
        filename,
        userId: req.user.userId,
        name,      // Add name field
        email,     // Add email field
        members: JSON.parse(members) // Parse members back to object
    });

    try {
        await submission.save();
        res.status(201).json({ message: 'File uploaded successfully', submission });
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});

// Route to list files
router.post('/view-assigned-submissions', verifyReviewer, async (req, res) => {
    try {
        const files = await Submission.find({ reviewer: req.user.userId });
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve files.', error: err.message });
    }
});

// Route to serve files
router.post('/view-assigned-submissions/:filename', verifyReviewer, async (req, res) => {
    const file = await Submission.findOne({ filename: req.params.filename, reviewer: req.user.userId });

    if (!file) {
        return res.status(404).json({ message: 'File not found.' });
    }

    const filePath = path.resolve(__dirname, '../uploads', req.params.filename); // Correct path to the root 'uploads' directory
    res.sendFile(filePath);
})


// route to add reviewer to submission using submission id
// router.post('/add-submission-review', verifyReviewer, async (req, res) => {
//     try {
//         console.log("Request Body:", req.body);
//         res.status(200).json({ message: 'Submission review added successfully.' });
//     } catch (err) {
//         res.status(500).json({ message: 'Failed to add submission review.', error: err.message });
//     }
// });
// route to add reviewer to submission using submission id
router.post('/add-submission-review', verifyReviewer, async (req, res) => {
    try {
        const { submissionId, originality, relationshipToLiterature, methodology, recommendation } = req.body;

        // Find the submission by submissionId
        const submission = await Submission.findById(submissionId);

        if (!submission) {
            return res.status(404).json({ message: 'Submission not found.' });
        }

        // Update the review field
        submission.review = {
            originality,
            relationshipToLiterature,
            methodology,
            recommendation
        };

        // Change status to 'Review Submitted'
        submission.status = 'Review Submitted';

        // Save the updated submission
        await submission.save();

        res.status(200).json({ message: 'Submission review added successfully.', submission });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add submission review.', error: err.message });
    }
});


module.exports = router;
