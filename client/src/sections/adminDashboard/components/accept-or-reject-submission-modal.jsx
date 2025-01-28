import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'

function AcceptOrRejectSubmissionModal({ image, submissionId }) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    // function to handle fetch image
    useEffect(() => {
        const token = localStorage.getItem('token');
        const url = `https://conference-website-rp.onrender.com/api/users/view-submission-screenshot/${image}`;

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ submissionId }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
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
                setFile(newUrl);
            })
            .catch(error => {
                setError(error.message);
                console.error('Error opening file:', error);
            });

    }, [image, submissionId]);

    const handleOpen = () => setOpen(!open);


    const handleAccept = () => {
        const token = localStorage.getItem('token');
        const url = 'https://conference-website-rp.onrender.com/api/admin/register-submission-accept';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ submissionId }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error accepting submission');
                }
                return response.json();
            })
            .then(data => {
                console.log('Submission accepted:', data);
                handleOpen();
            })
            .catch(error => {
                console.error('Error accepting submission:', error);
            });
    }


    const handleReject = () => {
        const token = localStorage.getItem('token');
        const url = 'https://conference-website-rp.onrender.com/api/admin/register-submission-reject';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({ submissionId }),
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error rejecting submission');
                }
                return response.json();
            })
            .then(data => {
                console.log('Submission rejected:', data);
                handleOpen();
            })
            .catch(error => {
                console.error('Error rejecting submission:', error);
            });
    }

    return (
        <>
            <span onClick={handleOpen} className='cursor-pointer hover:underline'>
                View Payment
            </span>
            <Dialog size='xs' open={open} handler={handleOpen} className='p-5 w-auto'>
                <DialogHeader>View Payment</DialogHeader>
                <DialogBody>
                    {file ? (
                        <img src={file} alt="Screenshot" className="w-full h-auto" />
                    ) : (
                        <p>Loading...</p>
                    )}
                    {error && <p className="text-red-500">{error}</p>}
                </DialogBody>
                <DialogFooter className='flex justify-between'>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>Close</span>
                    </Button>
                    
                    <div>
                        <Button
                            variant="text"
                            color="red"
                            onClick={handleReject}
                        >
                            <span>Reject</span>
                        </Button>
                        <Button
                            variant="text"
                            color="green"
                            onClick={handleAccept}
                        >
                            <span>Accept</span>
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    )
}

export default AcceptOrRejectSubmissionModal