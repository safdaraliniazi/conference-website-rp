import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Button,
    Card,
    CardBody,
    Typography,
    Input,
    Select,
    Option,
    Alert,
    IconButton,
} from '@material-tailwind/react';
import {
    PlusIcon,
    TrashIcon,
    DocumentArrowUpIcon,
    InformationCircleIcon,
    ExclamationCircleIcon,
    CheckCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { ConfirmationModal } from '../../../components/confirmation-modal';
import API_BASE_URL from "../../../config/api";

const TRACKS = [
    {
        value: "1-innovative-product-design",
        label: "Innovative Product Design",
        description: "Research focused on innovative approaches to product design and development"
    },
    {
        value: "2-intelligent-manufacturing-systems",
        label: "Intelligent Manufacturing Systems",
        description: "Research in smart manufacturing, automation, and Industry 4.0"
    }
];

function AddNewSubmissionForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        track: '',
        file: null
    });
    const [members, setMembers] = useState([]);
    const [memberInput, setMemberInput] = useState({ name: '', email: '' });
    const [error, setError] = useState(null);
    const [showError, setShowError] = useState(false);
    const [success, setSuccess] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [open, setOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setShowError(false);
        setError(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        // Check if file exists
        if (!file) return;

        // Check file type
        if (!file.name.toLowerCase().endsWith('.pdf')) {
            handleError('Please upload a PDF file');
            return;
        }

        // Check file size (10MB = 10 * 1024 * 1024 bytes)
        const maxSize = 10 * 1024 * 1024; // 10MB in bytes
        if (file.size > maxSize) {
            handleError('File size exceeds 10MB limit. Please upload a smaller file.');
            e.target.value = ''; // Clear the file input
            return;
        }

        setFormData(prev => ({
            ...prev,
            file
        }));
        setError(null);
        setShowError(false);
    };

    const handleMemberInputChange = (e) => {
        const { name, value } = e.target;
        setMemberInput(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const addMember = () => {
        if (!memberInput.name || !memberInput.email) {
            setError('Please fill in both name and email for the member');
            return;
        }
        if (!memberInput.email.includes('@')) {
            setError('Please enter a valid email address for the member');
            return;
        }
        setMembers(prev => [...prev, memberInput]);
        setMemberInput({ name: '', email: '' });
        setError(null);
    };

    const removeMember = (index) => {
        setMembers(prev => prev.filter((_, i) => i !== index));
    };

    const validateForm = () => {
        if (!formData.name) return 'Name is required';
        if (!formData.email) return 'Email is required';
        if (!formData.email.includes('@')) return 'Please enter a valid email address';
        if (!formData.track) return 'Please select a track';
        if (!formData.file) return 'Please upload your paper';
        return null;
    };

    const handleError = (errorMessage) => {
        setError(errorMessage);
        setShowError(true);
    };

    const handleSuccess = (successMessage) => {
        setSuccess(successMessage);
        setShowSuccess(true);
    };

    const handleSubmit = async () => {
        const validationError = validateForm();
        if (validationError) {
            handleError(validationError);
            return;
        }

        setIsSubmitting(true);
        const submitData = new FormData();
        submitData.append('file', formData.file);
        submitData.append('name', formData.name);
        submitData.append('email', formData.email);
        submitData.append('members', JSON.stringify(members));
        submitData.append('track', formData.track);

        try {
            const response = await fetch(`${API_BASE_URL}/api/users/add-new-submission`, {
                method: 'POST',
                body: submitData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to submit paper');
            }

            // Even if there's an email sending error, the submission was successful
            if (data.submission) {
                handleSuccess('Paper submitted successfully! Redirecting to your submissions...');
                setFormData({ name: '', email: '', track: '', file: null });
                setMembers([]);
                setOpen(false);

                // Wait for 3 seconds before redirecting
                setTimeout(() => {
                    navigate('/user/dashboard/view-my-submissions');
                }, 3000);
            } else {
                handleError('Failed to process submission. Please try again.');
            }
        } catch (err) {
            console.error('Submission error:', err);
            // Check if the error is related to email sending
            if (err.message.includes('No recipients defined')) {
                handleSuccess('Paper submitted successfully, but there was an issue sending notification emails.');
            } else {
                handleError(err.message || 'An error occurred while submitting the paper');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Instructions Card */}
            <Card className="lg:col-span-1 h-fit sticky top-24">
                <CardBody className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                        <InformationCircleIcon className="h-6 w-6 text-orange-500" />
                        <Typography variant="h5" color="blue-gray">
                            Submission Guidelines
                        </Typography>
                    </div>
                    <div className="space-y-4">
                        <Typography className="font-normal text-gray-600">
                            Please ensure your submission meets the following requirements:
                        </Typography>
                        <ul className="list-disc list-inside space-y-2 text-gray-600">
                            <li>Paper must be in PDF format</li>
                            <li>Follow the provided paper template</li>
                            <li>Include all co-authors in the members section</li>
                            <li>Select the appropriate track for your research</li>
                            <li>Ensure all contact information is accurate</li>
                        </ul>
                        <Button
                            variant="outlined"
                            color="orange"
                            className="w-full mt-4"
                            onClick={() => window.open('/submission', '_blank')}
                        >
                            View Full Guidelines
                        </Button>
                    </div>
                </CardBody>
            </Card>

            {/* Submission Form */}
            <Card className="lg:col-span-2">
                <CardBody className="p-6">
                    <form className="space-y-6">
                        {/* Author Information */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Author Information
                            </Typography>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input
                                    type="text"
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="!border-gray-200 focus:!border-orange-500"
                                />
                                <Input
                                    type="email"
                                    label="Email Address"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="!border-gray-200 focus:!border-orange-500"
                                />
                            </div>
                        </div>

                        {/* Co-Authors */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Co-Authors
                            </Typography>
                            {members.length > 0 && (
                                <div className="mb-4 space-y-2">
                                    {members.map((member, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                                        >
                                            <div>
                                                <Typography variant="small" className="font-medium">
                                                    {member.name}
                                                </Typography>
                                                <Typography variant="small" className="text-gray-600">
                                                    {member.email}
                                                </Typography>
                                            </div>
                                            <Button
                                                variant="text"
                                                color="red"
                                                onClick={() => removeMember(index)}
                                                className="p-2"
                                            >
                                                <TrashIcon className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <Input
                                    type="text"
                                    label="Co-Author Name"
                                    name="name"
                                    value={memberInput.name}
                                    onChange={handleMemberInputChange}
                                    className="!border-gray-200 focus:!border-orange-500"
                                />
                                <Input
                                    type="email"
                                    label="Co-Author Email"
                                    name="email"
                                    value={memberInput.email}
                                    onChange={handleMemberInputChange}
                                    className="!border-gray-200 focus:!border-orange-500"
                                />
                                <Button
                                    variant="text"
                                    color="orange"
                                    className="flex items-center gap-2"
                                    onClick={addMember}
                                >
                                    <PlusIcon className="h-4 w-4" />
                                    Add Co-Author
                                </Button>
                            </div>
                        </div>

                        {/* Track Selection */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Research Track
                            </Typography>
                            <Select
                                label="Select Track"
                                value={formData.track}
                                onChange={(value) => handleInputChange({ target: { name: 'track', value } })}
                                className="!border-gray-200 focus:!border-orange-500"
                            >
                                {TRACKS.map((track) => (
                                    <Option key={track.value} value={track.value}>
                                        {track.label}
                                    </Option>
                                ))}
                            </Select>
                            {formData.track && (
                                <Typography variant="small" className="mt-2 text-gray-600">
                                    {TRACKS.find(t => t.value === formData.track)?.description}
                                </Typography>
                            )}
                        </div>

                        {/* Paper Upload */}
                        <div>
                            <Typography variant="h6" color="blue-gray" className="mb-4">
                                Paper Upload
                            </Typography>
                            <Card className="border border-dashed border-gray-300 hover:border-orange-500 transition-colors">
                                <CardBody className="flex flex-col items-center justify-center p-8 text-center">
                                    <DocumentArrowUpIcon className="h-12 w-12 text-gray-400 mb-4" />
                                    <Typography variant="h6" color="blue-gray" className="mb-2">
                                        {formData.file ? formData.file.name : 'Drop your paper here or click to browse'}
                                    </Typography>
                                    <Typography variant="small" className="text-gray-600 mb-4">
                                        PDF format only, max 10MB
                                    </Typography>
                                    <input
                                        type="file"
                                        accept=".pdf"
                                        onChange={handleFileChange}
                                        className="hidden"
                                        id="paper-upload"
                                    />
                                    <Button
                                        variant="text"
                                        color="orange"
                                        className="flex items-center gap-2"
                                        onClick={() => document.getElementById('paper-upload').click()}
                                    >
                                        Choose File
                                        <PlusIcon className="h-4 w-4" />
                                    </Button>
                                </CardBody>
                            </Card>
                        </div>

                        {/* Error and Success Alerts */}
                        {error && showError && (
                            <Alert
                                color="red"
                                icon={<ExclamationCircleIcon className="h-6 w-6" />}
                                className="mb-4 relative"
                                action={
                                    <IconButton
                                        variant="text"
                                        color="white"
                                        size="sm"
                                        className="!absolute top-2 right-2 hover:!opacity-75"
                                        onClick={() => setShowError(false)}
                                    >
                                        <XMarkIcon className="h-5 w-5" strokeWidth={2} />
                                    </IconButton>
                                }
                            >
                                {error}
                            </Alert>
                        )}
                        {success && showSuccess && (
                            <Alert
                                color="green"
                                icon={<CheckCircleIcon className="h-6 w-6" />}
                                className="mb-4 relative"
                                action={
                                    <IconButton
                                        variant="text"
                                        color="white"
                                        size="sm"
                                        className="!absolute top-2 right-2 hover:!opacity-75"
                                        onClick={() => setShowSuccess(false)}
                                    >
                                        <XMarkIcon className="h-5 w-5" strokeWidth={2} />
                                    </IconButton>
                                }
                            >
                                {success}
                            </Alert>
                        )}

                        {/* Submit Button */}
                        <Button
                            color="orange"
                            className="w-full"
                            onClick={() => setOpen(true)}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit Paper'}
                        </Button>
                    </form>
                </CardBody>
            </Card>

            {/* Confirmation Modal */}
            <ConfirmationModal
                open={open}
                handleOpen={() => setOpen(!open)}
                titleOfModal="Confirm Submission"
                message="Are you sure you want to submit your paper? Please ensure all information is correct before proceeding."
                actionOnConfirm={handleSubmit}
            />
        </div>
    );
}

export default AddNewSubmissionForm;




