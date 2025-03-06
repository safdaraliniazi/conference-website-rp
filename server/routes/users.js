// backend/routes/users.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const express = require('express');
const Submission = require('../models/Submission'); // Assuming you have a File model
const router = express.Router();
const crypto = require('crypto');
const upload = require('../utils/storage');
const path = require('path');

require('dotenv').config();
const { verifyToken } = require('../utils/middleware');

const {
    sendAccountVerificationMail,
    sendToAdminsNewSubmission,
    sendToMembersNewSubmission,
    sendToReviewerRevisionSubmitted,
    sendToAdminsNewRegistrationDetailsAdded
} = require('../utils/mail');

// Temporary store for unverified users and their OTPs
const tempStore = {};
// Generate OTP
const generateOTP = () => {
    return crypto.randomInt(100000, 999999).toString(); // 6-digit OTP
};


// User registration route
router.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;
    try {
        // Check if the user already exists in the database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // Generate and store OTP
        const otp = generateOTP();
        console.log(otp)

        // Store user data and OTP in the temporary store
        tempStore[email] = { fullName, email, password, otp };
        // console.log(tempStore)

        // Send OTP to user's email
        await sendAccountVerificationMail(email, otp);

        return res.status(200).json({ message: 'OTP sent to your email.' });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.' });
    }
});


// Verify OTP route
router.post('/verify-otp', async (req, res) => {
    console.log(tempStore)
    const { email, otp } = req.body;
    try {
        // Check if the email exists in the temp store
        const tempUser = tempStore[email];
        if (!tempUser) {
            return res.status(400).json({ message: 'User not found or already verified.' });
        }

        // Verify OTP
        if (tempUser.otp === otp) {
            // Save the user to the database
            const user = new User({
                fullName: tempUser.fullName,
                email: tempUser.email,
                password: tempUser.password,
            });
            await user.save();

            // Remove temp user data from the store
            delete tempStore[email];

            // Generate JWT token
            const token = jwt.sign(
                { userId: user._id, fullName: user.fullName, email: user.email, role: user.role },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return res.status(200).json({ message: 'Email verified successfully.', token });
        } else {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.' });
    }
});


// User login route
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !user.validPassword(password)) {
            return res.status(400).json({ message: 'Invalid credentials.' });
        }
        const token = jwt.sign(
            { userId: user._id, fullName: user.fullName, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Server error.' });
    }
});


// Route to add new user submission
router.post('/add-new-submission', verifyToken, upload.single('file'), async (req, res) => {
    const { filename } = req.file;
    const { name, email, members, track } = req.body;

    const submission = new Submission({
        filename,
        userId: req.user.userId,
        name,
        email,
        members: JSON.parse(members), // Parse members back to object
        track,
    });

    try {
        await submission.save();

        // send email to admin for new submission added
        // await sendToAdminsNewSubmission(submission)

        // send email to members of team for new submission added
        // await sendToMembersNewSubmission(submission)

        res.status(201).json({ message: 'File uploaded successfully', submission });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});


// Route to list files
router.post('/view-my-submissions', verifyToken, async (req, res) => {
    try {
        const files = await Submission.find({ userId: req.user.userId });
        res.status(200).json(files);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve files.', error: err.message });
    }
});


// Route to serve files
router.post('/view-my-submissions/:filename', verifyToken, async (req, res) => {
    const file = await Submission.findOne({ filename: req.params.filename, userId: req.user.userId });

    if (!file) {
        return res.status(404).json({ message: 'File not found.' });
    }

    const filePath = path.resolve(__dirname, '../uploads', req.params.filename); // Correct path to the root 'uploads' directory
    res.sendFile(filePath);
})


// Route to submit revision
router.post('/submit-revision', verifyToken, upload.single('file'), async (req, res) => {
    const { filename } = req.file;
    const { submissionId } = req.body;

    try {
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        submission.filename = filename;
        submission.status = 'Revision Submitted';
        submission.action = 'N/A';

        await submission.save();

        // send mail to reviewer: revision submitted
        // await sendToReviewerRevisionSubmitted(submission)


        res.status(201).json({ message: 'Revision Submitted Successfully', submission });
    } catch (err) {
        // Handle errors and send error response
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});


// register for confrernece
router.post('/register-now', verifyToken, upload.single('file'), async (req, res) => {
    const { filename } = req.file;
    const { submissionId } = req.body;

    try {
        const submission = await Submission.findById(submissionId);
        if (!submission) {
            return res.status(404).json({ message: 'Submission not found' });
        }

        submission.screenshot = filename;
        submission.status = 'In Verification';
        submission.action = 'View Screenshot';

        await submission.save();

        // 10. mail to admins: a new submission has added payment details
        // await sendToAdminsNewRegistrationDetailsAdded(submission)

        res.status(201).json({ message: 'Revision Submitted Successfully', submission });
    } catch (err) {
        // Handle errors and send error response
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});


// Route to serve submission screenshot
router.post('/view-submission-screenshot/:filename', verifyToken, async (req, res) => {
    try {
        const { submissionId } = req.body;
        const file = await Submission.findOne({ _id: submissionId, screenshot: req.params.filename });

        if (!file) {
            return res.status(404).json({ message: 'Screenshot not found.' });
        }

        const filePath = path.resolve(__dirname, '../uploads', req.params.filename); // Correct path to the root 'uploads' directory
        res.sendFile(filePath);
    } catch (err) {
        res.status(500).json({ message: 'Server error.', error: err.message });
    }
});


module.exports = router;
