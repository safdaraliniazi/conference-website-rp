import React, { useState } from 'react';
import {
    Select,
    Option,
    Typography
} from '@material-tailwind/react';
import API_BASE_URL from '../../../config/api';

function ReviewerSelect({ submissionId, currentReviewer, allReviewers }) {
    const [error, setError] = useState(null);
    const [selectedReviewer, setSelectedReviewer] = useState(currentReviewer || '');

    const handleReviewerChange = async (reviewerId) => {
        try {
            setSelectedReviewer(reviewerId);
            const response = await fetch(`${API_BASE_URL}/api/admin/assign-reviewer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    submissionId,
                    reviewerId
                })
            });

            if (!response.ok) {
                throw new Error('Failed to assign reviewer');
            }

            // Successfully assigned reviewer
            setError(null);
        } catch (err) {
            setError(err.message);
            console.error('Error assigning reviewer:', err);
        }
    };

    return (
        <div className="w-full">
            {error && (
                <Typography variant="small" color="red" className="mb-2">
                    {error}
                </Typography>
            )}
            <Select
                value={selectedReviewer}
                onChange={handleReviewerChange}
                variant="standard"
                label="Select Reviewer"
                color="orange"
            >
                {allReviewers.map((reviewer) => (
                    <Option key={reviewer._id} value={reviewer._id}>
                        {reviewer.fullName}
                    </Option>
                ))}
            </Select>
        </div>
    );
}

export default ReviewerSelect; 