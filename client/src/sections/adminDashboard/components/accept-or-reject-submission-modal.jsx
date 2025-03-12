import React, { useState } from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Spinner
} from '@material-tailwind/react';
import {
    CheckCircleIcon,
    XCircleIcon,
    EyeIcon
} from '@heroicons/react/24/solid';
import API_BASE_URL from '../../../config/api';

function AcceptOrRejectSubmissionModal({ submissionId, image }) {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleOpen = () => setOpen(!open);

    const handleVerification = async (isAccepted) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${API_BASE_URL}/api/admin/verify-payment`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    submissionId,
                    isAccepted
                })
            });

            if (!response.ok) {
                throw new Error('Failed to verify payment');
            }

            // Close modal after successful verification
            setOpen(false);
        } catch (err) {
            setError(err.message);
            console.error('Error verifying payment:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                variant="text"
                color="orange"
                onClick={handleOpen}
                className="flex items-center gap-2"
            >
                <EyeIcon className="h-4 w-4" />
                View Screenshot
            </Button>

            <Dialog open={open} handler={handleOpen} size="xl">
                <DialogHeader className="flex items-center justify-between">
                    <Typography variant="h6" color="blue-gray">
                        Payment Verification
                    </Typography>
                    {error && (
                        <Typography color="red" className="text-sm">
                            {error}
                        </Typography>
                    )}
                </DialogHeader>

                <DialogBody divider className="p-0">
                    <img
                        src={image}
                        alt="Payment Screenshot"
                        className="w-full h-auto"
                        style={{ maxHeight: '70vh' }}
                    />
                </DialogBody>

                <DialogFooter className="flex justify-between gap-2">
                    <Button
                        variant="text"
                        color="red"
                        onClick={() => handleVerification(false)}
                        className="flex items-center gap-2"
                        disabled={loading}
                    >
                        <XCircleIcon className="h-4 w-4" />
                        Reject
                        {loading && <Spinner className="h-4 w-4" />}
                    </Button>
                    <Button
                        variant="text"
                        color="green"
                        onClick={() => handleVerification(true)}
                        className="flex items-center gap-2"
                        disabled={loading}
                    >
                        <CheckCircleIcon className="h-4 w-4" />
                        Accept
                        {loading && <Spinner className="h-4 w-4" />}
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default AcceptOrRejectSubmissionModal;