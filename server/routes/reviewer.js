// backend/routes/users.js

const User = require('../models/User');
const express = require('express');
const Submission = require('../models/Submission'); // Assuming you have a File model
const router = express.Router();
const path = require('path');
const { verifyReviewer } = require('../utils/middleware');
const upload = require('../utils/storage');

const {
    sendToUserAndMembersSubmissionReviewed,
    sendToUserAndMembersSubmissionRejected,
    sendToUserAndMembersSubmissionAccepted
} = require('../utils/mail');




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


// route to add reviewe to submission using submission id
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
        submission.status = 'Reviewed';

        // Change action to 'Submit Revision'
        submission.action = 'Submit Revision';


        // Save the updated submission
        await submission.save();

        // send mail to mambers submission ha been reviewed
        await sendToUserAndMembersSubmissionReviewed(submission)

        res.status(200).json({ message: 'Submission review added successfully.', submission });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add submission review.', error: err.message });
    }
});



// route to reject submission
router.post('/reject-submission', verifyReviewer, async (req, res) => {
    try {
        const { submissionId, originality, relationshipToLiterature, methodology, recommendation } = req.body;

        // console.log('in rejected')
        // console.log(submissionId, originality)
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
        submission.status = 'Rejected';

        // Change action to 'Register Now'
        submission.action = 'N/A';

        // Save the updated submission
        await submission.save();

        // 8. mail to user and members: your submission has been rejected
        await sendToUserAndMembersSubmissionRejected(submission)


        res.status(200).json({ message: 'Submission review added successfully.', submission });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add submission review.', error: err.message });
    }
});



// route to accept submission
router.post('/accept-submission', verifyReviewer, async (req, res) => {
    try {
        const { submissionId, originality, relationshipToLiterature, methodology, recommendation } = req.body;

        // console.log('in accepted')
        // console.log(submissionId, originality)
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
        submission.status = 'Accepted';

        // Change action to 'Register Now'
        submission.action = 'Register Now';

        // Save the updated submission
        await submission.save();

        // 8. mail to user and members: your submission has been rejected
        await sendToUserAndMembersSubmissionAccepted(submission)

        res.status(200).json({ message: 'Submission review added successfully.', submission });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add submission review.', error: err.message });
    }
});




module.exports = router;
