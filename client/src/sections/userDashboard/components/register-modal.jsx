import {
    Button,
    Dialog,
    DialogBody,
    DialogFooter,
    DialogHeader,
    Typography,
    Card,
    CardBody,
    Alert,
    Chip,
} from '@material-tailwind/react';
import {
    DocumentArrowUpIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    BanknotesIcon,
    BuildingLibraryIcon,
    ArrowTopRightOnSquareIcon,
} from '@heroicons/react/24/solid';
import React, { useState } from 'react';
import API_BASE_URL from "../../../config/api";

const BANK_DETAILS = {
    accountName: "Conference NIT Rourkela",
    accountNumber: "36734418111",
    ifscCode: "SBIN0002109",
    bankName: "State Bank of India",
    branch: "SBI, NIT Campus, Rourkela",
    address: "SBI, NIT Campus, Rourkela-769008, Odisha",
    accountType: "Saving Account",
    swiftCode: "SBININBB137 (Commercial)"
};

function RegisterModal({ submissionId }) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2 MB

        if (!validTypes.includes(selectedFile.type)) {
            setError('Only JPEG and PNG files are allowed');
            setFile(null);
            return;
        }

        if (selectedFile.size > maxSize) {
            setError('File size must be less than 2 MB');
            setFile(null);
            return;
        }

        setError(null);
        setSuccess(null);
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a payment proof file');
            return;
        }

        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('file', file);
        formData.append('submissionId', submissionId);

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/register-now`, {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error('Failed to submit registration');
            }

            const data = await response.json();
            setSuccess('Registration submitted successfully!');
            setFile(null);
            setTimeout(() => handleOpen(), 2000); // Close modal after showing success message
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleOpen = () => {
        setOpen(!open);
        if (!open) {
            setError(null);
            setSuccess(null);
            setFile(null);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setSuccess('Copied to clipboard!');
        setTimeout(() => setSuccess(null), 2000);
    };

    return (
        <>
            <span onClick={handleOpen} className="cursor-pointer text-orange-500 hover:text-orange-700 font-medium flex items-center gap-1">
                Register Now
                <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </span>

            <Dialog size="lg" open={open} handler={handleOpen} className="p-0 overflow-hidden">
                <DialogHeader className="px-6 pt-6">
                    <div className="flex flex-col gap-1">
                        <Typography variant="h4" color="blue-gray">
                            Conference Registration
                        </Typography>
                        <Typography variant="small" color="gray" className="font-normal">
                            Complete your registration by providing payment details
                        </Typography>
                    </div>
                </DialogHeader>

                <DialogBody className="px-6 overflow-y-auto max-h-[60vh]">
                    {/* Registration Info */}
                    <Card className="mb-6">
                        <CardBody className="p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <BanknotesIcon className="h-5 w-5 text-orange-500" />
                                <Typography variant="h6" color="blue-gray">
                                    Registration Information
                                </Typography>
                            </div>
                            <Typography className="text-gray-700 mb-4">
                                Each paper should be registered either by the corresponding author or any co-author to publish in the conference proceedings.
                            </Typography>
                            <div className="flex flex-wrap gap-2 mb-4">
                                <Chip color="orange" value="Conference Kit" />
                                <Chip color="orange" value="Participation Certificate" />
                                <Chip color="orange" value="Working Lunch" />
                                <Chip color="orange" value="Refreshments" />
                                <Chip color="orange" value="Gala Dinner" />
                            </div>
                            <Typography variant="small" color="gray" className="italic">
                                Registration fee details will be updated soon...
                            </Typography>
                        </CardBody>
                    </Card>

                    {/* Bank Details */}
                    <Card className="mb-6">
                        <CardBody className="p-4">
                            <div className="flex items-center gap-2 mb-4">
                                <BuildingLibraryIcon className="h-5 w-5 text-orange-500" />
                                <Typography variant="h6" color="blue-gray">
                                    Bank Details
                                </Typography>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(BANK_DETAILS).map(([key, value]) => (
                                    <div
                                        key={key}
                                        className="p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
                                        onClick={() => copyToClipboard(value)}
                                    >
                                        <Typography variant="small" color="gray" className="font-medium capitalize">
                                            {key.replace(/([A-Z])/g, ' $1').trim()}
                                        </Typography>
                                        <Typography variant="paragraph" color="blue-gray" className="font-medium">
                                            {value}
                                        </Typography>
                                    </div>
                                ))}
                            </div>
                        </CardBody>
                    </Card>

                    {/* Upload Payment Proof */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {error && (
                            <Alert color="red" icon={<ExclamationCircleIcon className="h-6 w-6" />}>
                                {error}
                            </Alert>
                        )}
                        {success && (
                            <Alert color="green" icon={<CheckCircleIcon className="h-6 w-6" />}>
                                {success}
                            </Alert>
                        )}

                        <Card className="border border-dashed border-gray-300 hover:border-orange-500 transition-colors">
                            <CardBody className="flex flex-col items-center justify-center p-6 text-center">
                                <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mb-4" />
                                <Typography variant="h6" color="blue-gray" className="mb-2">
                                    {file ? file.name : 'Upload Payment Proof'}
                                </Typography>
                                <Typography variant="small" className="text-gray-600 mb-4">
                                    JPEG or PNG, max 2MB
                                </Typography>
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                    id="payment-proof"
                                />
                                <Button
                                    variant="text"
                                    color="orange"
                                    className="flex items-center gap-2"
                                    onClick={() => document.getElementById('payment-proof').click()}
                                >
                                    Choose File
                                </Button>
                            </CardBody>
                        </Card>
                    </form>
                </DialogBody>

                <DialogFooter className="p-6 pt-0">
                    <div className="flex gap-3 justify-end">
                        <Button
                            variant="text"
                            color="gray"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="filled"
                            color="orange"
                            onClick={handleSubmit}
                            disabled={isSubmitting || !file}
                            className="flex items-center gap-2"
                        >
                            {isSubmitting ? 'Submitting...' : 'Complete Registration'}
                        </Button>
                    </div>
                </DialogFooter>
            </Dialog>
        </>
    );
}

export default RegisterModal;