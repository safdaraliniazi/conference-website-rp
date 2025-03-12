// Set up nodemailer transport
const nodemailer = require('nodemailer');
const User = require('../models/User');


// get all admins
const getAllAdminEmails = async () => {
    const admins = await User.find({ role: 'admin' });
    if (!admins || admins.length === 0) {
        // Return a default admin email if no admins are found
        return process.env.DEFAULT_ADMIN_EMAIL || '';
    }
    return admins.map(admin => admin.email).join(',');
}


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SENDER_EMAIL, // Your email
        pass: process.env.SENDER_EMAIL_PASSWORD, // Your email password
    },
});



// 0. verify email
const sendAccountVerificationMail = async (email, otp) => {
    await transporter.sendMail({
        to: email,
        subject: 'Verify your email',
        text: `Your OTP for verification is ${otp}`,
    });
}



// 1. mail to user: role has been updated
const sendToUserRoleUpdated = async (user) => {
    await transporter.sendMail({
        to: user.email,
        subject: 'Role Updated',
        html: `
            <h4>Your role has been updated. Details are below:</h4>
            <table border="1" cellPadding="10" cellSpacing="0">
                <tbody>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td>Full Name</td>
                        <td>${user.fullName}</td>
                    </tr>
                    <tr>
                        <td>Email</td>
                        <td>${user.email}</td>
                    </tr>
                    <tr>
                        <td>Role</td>
                        <td>${user.role}</td>
                    </tr>
                </tbody>
            </table>
        `,
    });
}



// 2. mail to all admins: new submission added
const sendToAdminsNewSubmission = async (submission) => {
    try {
        const allAdminEmails = await getAllAdminEmails();
        if (!allAdminEmails) {
            console.log('No admin emails found, skipping admin notification');
            return;
        }

        await transporter.sendMail({
            to: allAdminEmails,
            subject: 'New Submission',
            html: `
                <h4>A new submission has been added. Details are below:</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
        });
    } catch (error) {
        console.error('Failed to send admin notification:', error);
        // Don't throw the error, just log it
    }
}



// 3. mail to members: a new submission has been added
const sendToMembersNewSubmission = async (submission) => {
    try {
        const memberEmails = submission.members.map(member => member.email).filter(email => email);
        if (memberEmails.length === 0) {
            console.log('No member emails found, skipping member notification');
            return;
        }

        await transporter.sendMail({
            to: memberEmails.join(','),
            subject: 'New Submission',
            html: `
                <h4>Your team leader has added a new submission. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
        });
    } catch (error) {
        console.error('Failed to send member notification:', error);
        // Don't throw the error, just log it
    }
}


// 4. mail to reviewer a new submission has been assigned
const sendToReviewerNewSubmissionAssigned = async (submission, reviewerId) => {
    const reviewer = await User.findById(reviewerId);
    console.log(reviewer, typeof reviewer)
    await transporter.sendMail({
        to: reviewer.email,
        subject: 'New Submission Assigned',
        html: `
                <h4>You have been assigned a new submission. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}


// 5. mail to user and members: submission has been assigned to reviewer and is in review
const sendToUserAndMembersSubmissionInReview = async (submission) => {
    // const submission = await Submission.findById(submissionId)
    console.log(submission)

    const allMembersEmail = submission.members.map(member => member.email).join(',');
    const allEmails = submission.email + ',' + allMembersEmail
    console.log(allEmails, typeof allEmails)


    await transporter.sendMail({
        to: allEmails,
        subject: 'Submission Status Update.',
        html: `
                <h4>Your submission has been assigned to a reviewer and is in review. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}


// 6. mail to user and members: submission has been reviewed
const sendToUserAndMembersSubmissionReviewed = async (submission) => {
    // const submission = await Submission.findById(submissionId)
    console.log(submission)

    const allMembersEmail = submission.members.map(member => member.email).join(',');
    const allEmails = submission.email + ',' + allMembersEmail
    console.log(allEmails, typeof allEmails)


    await transporter.sendMail({
        to: allEmails,
        subject: 'Submission Reviewed.',
        html: `
                <h4>You submission has been reviewed by reviewer. Update your submission with revised details. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}


// 7. send mail to reviewer: revision submitted
const sendToReviewerRevisionSubmitted = async (submission) => {
    const reviewer = await User.findById(submission.reviewer);
    console.log(reviewer, typeof reviewer)
    await transporter.sendMail({
        to: reviewer.email,
        subject: 'Submission Revised',
        html: `
                <h4>A new revision has been added to a submission in which you hvae been assigned a reviewer. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}


// 8. mail to user and members: your submission has been rejected
const sendToUserAndMembersSubmissionRejected = async (submission) => {
    // const submission = await Submission.findById(submissionId)
    console.log(submission)

    const allMembersEmail = submission.members.map(member => member.email).join(',');
    const allEmails = submission.email + ',' + allMembersEmail
    console.log(allEmails, typeof allEmails)


    await transporter.sendMail({
        to: allEmails,
        subject: 'Submission Rejected.',
        html: `
                <h4>You submission has been <b>rejected</b> by reviewer. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}



// 9. mail to user and members: your submission has been rejected
const sendToUserAndMembersSubmissionAccepted = async (submission) => {
    // const submission = await Submission.findById(submissionId)
    console.log(submission)

    const allMembersEmail = submission.members.map(member => member.email).join(',');
    const allEmails = submission.email + ',' + allMembersEmail
    console.log(allEmails, typeof allEmails)


    await transporter.sendMail({
        to: allEmails,
        subject: 'Submission Accepted.',
        html: `
                <h4>You submission has been <b>accepted</b> by reviewer. You need to now complete the registration process by doing payment. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}



// 10. mail to admins: a new submission has added payment details
const sendToAdminsNewRegistrationDetailsAdded = async (submission) => {
    const allAdminEmails = await getAllAdminEmails();
    console.log(allAdminEmails, typeof allAdminEmails)
    await transporter.sendMail({
        to: allAdminEmails,
        subject: 'Registration Added',
        html: `
                <h4>A submission has added new registration details which needs verification. Details are below:</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}



// 11. mail to user and memeber: payment deatils not correct
const sendToUserAndMembersPaymentDetailsNotCorrect = async (submission) => {
    // const submission = await Submission.findById(submissionId)
    console.log(submission)

    const allMembersEmail = submission.members.map(member => member.email).join(',');
    const allEmails = submission.email + ',' + allMembersEmail
    console.log(allEmails, typeof allEmails)


    await transporter.sendMail({
        to: allEmails,
        subject: 'Payment details not correct.',
        html: `
                <h4>You payment verification has failed, since the payment detials were not correct. You need to now complete the registration process by doing payment. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}



// 12. mail to user and memeber: payment deatils not correct
const sendToUserAndMembersRegistrationSuccess = async (submission) => {
    // const submission = await Submission.findById(submissionId)
    console.log(submission)

    const allMembersEmail = submission.members.map(member => member.email).join(',');
    const allEmails = submission.email + ',' + allMembersEmail
    console.log(allEmails, typeof allEmails)


    await transporter.sendMail({
        to: allEmails,
        subject: 'Registered Successfully.',
        html: `
                <h4>Your payment details have been verified. You have <b>successfully registered</b> for IPDIMS Conference. Check details below</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>ID</td>
                            <td>${submission._id.toString()}</td>
                        </tr>
                        <tr>
                            <td>Filename</td>
                            <td>${submission.filename}</td>
                        </tr>
                        <tr>
                            <td>User ID</td>
                            <td>${submission.userId.toString()}</td>
                        </tr>
                        <tr>
                            <td>Name</td>
                            <td>${submission.name}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${submission.email}</td>
                        </tr>
                        <tr>
                            <td>Status</td>
                            <td>${submission.status}</td>
                        </tr>
                        <tr>
                            <td>Reviewer</td>
                            <td>${submission.reviewer === null ? 'None' : submission.reviewer}</td>
                        </tr>
                        <tr>
                            <td>Action</td>
                            <td>${submission.action}</td>
                        </tr>
                        <tr>
                            <td>Members</td>
                            <td>
                                <ul>
                                    ${submission.members.map(member => `
                                        <li>
                                            Name: ${member.name}, Email: ${member.email}
                                        </li>
                                    `).join('')}
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}


// 13. mail to admin: new query from contact us
const sendToAdminNewQueryFromContactUs = async (contactData) => {
    const allAdminEmails = await getAllAdminEmails();
    console.log(allAdminEmails, typeof allAdminEmails)
    await transporter.sendMail({
        to: allAdminEmails,
        subject: 'New Query',
        html: `
                <h4>A new query has been submitted through 'Contact Us'. Details are below:</h4>
                <table border="1" cellPadding="10" cellSpacing="0">
                    <tbody>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>First Name</td>
                            <td>${contactData.firstName}</td>
                        </tr>
                        <tr>
                            <td>Last Name</td>
                            <td>${contactData.lastName}</td>
                        </tr>
                        <tr>
                            <td>Email</td>
                            <td>${contactData.email}</td>
                        </tr>
                        <tr>
                            <td>Message</td>
                            <td>${contactData.message}</td>
                        </tr>
                    </tbody>
                </table>
            `,
    });
}


module.exports = {
    sendAccountVerificationMail, // 0
    sendToUserRoleUpdated, // 1
    sendToAdminsNewSubmission, // 2
    sendToMembersNewSubmission, // 3
    sendToReviewerNewSubmissionAssigned, // 4
    sendToUserAndMembersSubmissionInReview, // 5
    sendToUserAndMembersSubmissionReviewed, //6
    sendToReviewerRevisionSubmitted, // 7
    sendToUserAndMembersSubmissionRejected, // 8
    sendToUserAndMembersSubmissionAccepted, // 9
    sendToAdminsNewRegistrationDetailsAdded, // 10
    sendToUserAndMembersPaymentDetailsNotCorrect, // 11
    sendToUserAndMembersRegistrationSuccess, // 12
    sendToAdminNewQueryFromContactUs, // 13
};