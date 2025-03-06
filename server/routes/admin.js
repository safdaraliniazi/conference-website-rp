const express = require('express');
const User = require('../models/User');
const Submission = require('../models/Submission');
const mongoose = require('mongoose');
const { verifyAdmin } = require('../utils/middleware');

const {
    sendToReviewerNewSubmissionAssigned,
    sendToUserAndMembersSubmissionInReview,
    sendToUserAndMembersPaymentDetailsNotCorrect,
    sendToUserAndMembersRegistrationSuccess,
    sendToUserRoleUpdated
} = require('../utils/mail');
const Announcement = require('../models/Announcement');

const router = express.Router();


// Admin users route
router.post('/all-users', verifyAdmin, async (req, res) => {
    try {
        // console.log('Admin user route hit');
        const allUsers = await User.find({}).select('-password');
        res.status(200).json(allUsers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to retrieve all users.', error });
    }
});


// change user role to admin
router.post('/change-user-role/', verifyAdmin, async (req, res) => {
    const { email, role } = req.body;

    if (!role) {
        return res.status(400).json({ message: 'Role is required.' });
    }

    if (!['user', 'reviewer', 'admin'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role.' });
    }

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { role },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // mail to user: role has been updated
        await sendToUserRoleUpdated(updatedUser);

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update user role.', error });
    }
});


// Admin users route get all reviewrss
router.post('/all-reviewers', verifyAdmin, async (req, res) => {
    try {
        // console.log('Admin user route hit');
        const allReviewers = await User.find({ role: 'reviewer' }).select('-password');
        res.status(200).json(allReviewers);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to retrieve all users.', error });
    }
});


// submission routes
router.post('/view-all-user-submissions', verifyAdmin, async (req, res) => {
    try {
        const files = await Submission.find({});
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve files.', error: err.message });
    }
});


// Route to serve files
router.post('/view-all-user-submissions/:filename', verifyAdmin, async (req, res) => {
    const file = await Submission.findOne({ filename: req.params.filename, userId: req.user.userId });

    if (!file) {
        return res.status(404).json({ message: 'File not found.' });
    }

    const filePath = path.resolve(__dirname, '../uploads', req.params.filename); // Correct path to the root 'uploads' directory
    res.sendFile(filePath);
})


// Route to update submission with reviewer id
router.post('/update-submission-reviewer', verifyAdmin, async (req, res) => {
    const { submissionId, reviewerId } = req.body;

    if (!submissionId || !reviewerId) {
        return res.status(400).json({ message: 'Both submissionId and reviewerId are required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID.' });
    }

    if (!mongoose.Types.ObjectId.isValid(reviewerId)) {
        return res.status(400).json({ message: 'Invalid reviewer ID.' });
    }

    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            {
                reviewer: reviewerId,
                status: 'In Review'
            },
            { new: true, runValidators: true }
        );

        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found.' });
        }
        // mail to reviewer a new submission has been assigned
        await sendToReviewerNewSubmissionAssigned(updatedSubmission, reviewerId);

        // email to user and members: submission is in review
        await sendToUserAndMembersSubmissionInReview(updatedSubmission);

        res.status(200).json(updatedSubmission);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update submission.', error });
    }
});



// register submsission reject
router.post('/register-submission-reject', verifyAdmin, async (req, res) => {
    const { submissionId } = req.body;

    if (!submissionId) {
        return res.status(400).json({ message: 'submissionId is required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID.' });
    }


    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            {
                status: 'Accepted',
                action: 'Update Payment Details'
            },
            { new: true, runValidators: true }
        );

        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found.' });
        }

        res.status(200).json(updatedSubmission);
        // mail to user and memeber: payment deatils not correct
        await sendToUserAndMembersPaymentDetailsNotCorrect(updatedSubmission)

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update submission.', error });
    }
});



// register submsission accept
router.post('/register-submission-accept', verifyAdmin, async (req, res) => {
    const { submissionId } = req.body;

    if (!submissionId) {
        return res.status(400).json({ message: 'ubmissionId is required.' });
    }

    if (!mongoose.Types.ObjectId.isValid(submissionId)) {
        return res.status(400).json({ message: 'Invalid submission ID.' });
    }


    try {
        const updatedSubmission = await Submission.findByIdAndUpdate(
            submissionId,
            {
                status: 'Registered'
            },
            { new: true, runValidators: true }
        );

        if (!updatedSubmission) {
            return res.status(404).json({ message: 'Submission not found.' });
        }

        res.status(200).json(updatedSubmission);

        // 12. mail to user and memeber: payment deatils not correct
        await sendToUserAndMembersRegistrationSuccess(updatedSubmission)

    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Failed to update submission.', error });
    }
});


// add new announcement
router.post('/add-new-announcement', verifyAdmin, async (req, res) => {
    const { title, description, date } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    try {
        const newAnnouncement = new Announcement({
            title,
            description,
            date
        });

        await newAnnouncement.save();
        res.status(201).json({ message: 'Announcement created successfully' });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to create announcement' });
    }
});


module.exports = router;
