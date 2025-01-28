import React, { useEffect } from 'react'
import PageWrapper from '../../components/page-wrapper'
import { useLocation } from 'react-router-dom';
import OptionsHeader from '../../components/options-header';
import GivePaperFeedbackForm from './components/give-paper-feedback-form';

function GivePaperFeedback() {
    const location = useLocation();
    // Extract filename from the location state
    const filename = location.state?.filename || '';
    const submissionId = location.state?.submissionId || '';

    const [error, setError] = React.useState('');
    const [url, setUrl] = React.useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = `https://conference-website-rp.onrender.com/api/reviewer/view-assigned-submissions/${filename}`;

        fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error opening file');
                }
                return response.blob();
            })
            .then(blob => {
                const newUrl = window.URL.createObjectURL(blob);
                // window.open(newUrl, '_blank');
                // console.log('Opened file:', newUrl);
                setUrl(newUrl);
            })
            .catch(error => {
                setError(error.message);
                console.error('Error opening file:', error);
            });
    }, [filename]);

    return (
        <PageWrapper>
            <OptionsHeader title='Give Paper Feedback' href='/reviewer/dashboard/view-assigned-submissions' />
            {error && <p>{error}</p>}
            <GivePaperFeedbackForm filename={filename} url={url} submissionId={submissionId} />
        </PageWrapper>
    )
}

export default GivePaperFeedback