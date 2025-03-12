import React, { useEffect, useState } from 'react'
import {
    Avatar,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Chip,
    Input,
    Tab,
    Tabs,
    TabsHeader,
    Typography,
    Select,
    Option
} from '@material-tailwind/react';
import {
    MagnifyingGlassIcon,
    DocumentTextIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon,
    DocumentCheckIcon,
    ArrowPathIcon,
    UserGroupIcon,
    CreditCardIcon
} from '@heroicons/react/24/solid';
import API_BASE_URL from "../../../config/api";
import ReviewerSelect from './reviewer-select';
import AcceptOrRejectSubmissionModal from './accept-or-reject-submission-modal';
import * as XLSX from 'xlsx';

function ViewAllSubmissionsTable() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [allReviewers, setAllReviewers] = useState([]);
    const [fileLoading, setFileLoading] = useState(false);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/view-all-user-submissions`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching submissions: ${response.statusText}`);
                }

                const data = await response.json();
                setFiles(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching submissions:', error);
            }
        };

        fetchFiles();
    }, []);

    useEffect(() => {
        const fetchReviewers = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/admin/all-reviewers`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch reviewers');
                }

                const data = await response.json();
                setAllReviewers(data);
            } catch (error) {
                console.error('Error fetching reviewers:', error);
            }
        };

        fetchReviewers();
    }, []);

    const handleFileClick = async (filename) => {
        try {
            setFileLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_BASE_URL}/api/admin/view-all-user-submissions/${filename}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error opening file');
            }

            const blob = await response.blob();
            if (blob.size === 0) {
                throw new Error('File is empty or not accessible');
            }

            // Create object URL and open in new tab
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.click();

            // Clean up
            window.URL.revokeObjectURL(url);
        } catch (error) {
            setError(`Error opening file: ${error.message}`);
            console.error('Error opening file:', error);
        } finally {
            setFileLoading(false);
        }
    };

    const handleExportToExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(
            files.map(file => ({
                Author: file.name,
                Email: file.email,
                Status: file.status,
                Track: file.track.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()),
                Reviewer: file.reviewer ? allReviewers.find(r => r._id === file.reviewer)?.fullName || 'Not Found' : 'Not Assigned',
                SubmissionDate: new Date(file.createdAt).toLocaleDateString()
            }))
        );
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");
        XLSX.writeFile(workbook, "submissions.xlsx");
    };

    const TABS = [
        {
            label: "All",
            value: "all",
            icon: DocumentTextIcon
        },
        {
            label: "Pending",
            value: "pending",
            icon: ClockIcon
        },
        {
            label: "Reviewed",
            value: "reviewed",
            icon: DocumentCheckIcon
        },
        {
            label: "Registered",
            value: "registered",
            icon: CreditCardIcon
        }
    ];

    const TABLE_HEAD = ["Author", "Paper", "Status", "Members", "Track", "Reviewer", "Action"];

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'orange';
            case 'reviewed':
                return 'blue';
            case 'accepted':
                return 'green';
            case 'rejected':
                return 'red';
            case 'revision submitted':
                return 'purple';
            case 'in verification':
                return 'cyan';
            default:
                return 'blue-gray';
        }
    };

    const getStatusIcon = (status) => {
        switch (status.toLowerCase()) {
            case 'pending':
                return <ClockIcon className="h-4 w-4" />;
            case 'reviewed':
                return <DocumentCheckIcon className="h-4 w-4" />;
            case 'accepted':
                return <CheckCircleIcon className="h-4 w-4" />;
            case 'rejected':
                return <XCircleIcon className="h-4 w-4" />;
            case 'revision submitted':
                return <ArrowPathIcon className="h-4 w-4" />;
            case 'in verification':
                return <CreditCardIcon className="h-4 w-4" />;
            default:
                return <DocumentTextIcon className="h-4 w-4" />;
        }
    };

    const filteredFiles = files.filter(file => {
        const matchesSearch = (
            file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.track.toLowerCase().includes(searchQuery.toLowerCase()) ||
            file.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (file.reviewer && allReviewers.find(r => r._id === file.reviewer)?.fullName.toLowerCase().includes(searchQuery.toLowerCase()))
        );

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'pending') return matchesSearch && file.status.toLowerCase() === 'pending';
        if (activeTab === 'reviewed') return matchesSearch && (
            file.status.toLowerCase() === 'reviewed' ||
            file.status.toLowerCase() === 'accepted' ||
            file.status.toLowerCase() === 'rejected'
        );
        if (activeTab === 'registered') return matchesSearch && (
            file.status.toLowerCase() === 'in verification' ||
            file.status.toLowerCase().includes('registered')
        );

        return matchesSearch;
    });

    return (
        <div className="relative">
            {error && (
                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <Typography color="red" className="flex items-center gap-2">
                        <XCircleIcon className="w-5 h-5" />
                        {error}
                    </Typography>
                </div>
            )}

            <Card className="h-full w-full overflow-hidden">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                All Submissions
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Manage and track all conference paper submissions
                            </Typography>
                        </div>
                        <Button
                            color="orange"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={handleExportToExcel}
                        >
                            <DocumentTextIcon className="h-4 w-4" />
                            Export to Excel
                        </Button>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value={activeTab} className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value, icon: Icon }) => (
                                    <Tab
                                        key={value}
                                        value={value}
                                        onClick={() => setActiveTab(value)}
                                        className="flex items-center gap-2"
                                    >
                                        <Icon className="h-4 w-4" />
                                        {label}
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search submissions"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="overflow-x-auto px-0">
                    <table className="w-full min-w-max table-auto text-left">
                        <thead>
                            <tr>
                                {TABLE_HEAD.map((head) => (
                                    <th
                                        key={head}
                                        className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                                    >
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-semibold leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {filteredFiles.map((submission, index) => {
                                const isLast = index === filteredFiles.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={submission._id} className="hover:bg-orange-50/50 transition-colors">
                                        {/* Author */}
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={submission.avatar || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'}
                                                    alt={submission.name}
                                                    size="sm"
                                                    className="border-2 border-orange-100"
                                                />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {submission.name}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="opacity-70"
                                                    >
                                                        {submission.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Paper */}
                                        <td className={classes}>
                                            <Button
                                                variant="text"
                                                color="blue-gray"
                                                className="flex items-center gap-2 normal-case"
                                                onClick={() => handleFileClick(submission.filename)}
                                                disabled={fileLoading}
                                            >
                                                {fileLoading ? (
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-orange-500" />
                                                ) : (
                                                    <DocumentTextIcon className="h-4 w-4" />
                                                )}
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {submission.filename}
                                                </Typography>
                                            </Button>
                                        </td>

                                        {/* Status */}
                                        <td className={classes}>
                                            <div className="w-max">
                                                <Chip
                                                    size="sm"
                                                    variant="ghost"
                                                    value={
                                                        <div className="flex items-center gap-2">
                                                            {getStatusIcon(submission.status)}
                                                            <span>{submission.status}</span>
                                                        </div>
                                                    }
                                                    color={getStatusColor(submission.status)}
                                                />
                                            </div>
                                        </td>

                                        {/* Members */}
                                        <td className={classes}>
                                            <div className="flex flex-col gap-1">
                                                {submission.members.map((member) => (
                                                    <Typography
                                                        key={member.email}
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {member.name}
                                                    </Typography>
                                                ))}
                                            </div>
                                        </td>

                                        {/* Track */}
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {submission.track.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                            </Typography>
                                        </td>

                                        {/* Reviewer */}
                                        <td className={classes}>
                                            <div className="w-48">
                                                <ReviewerSelect
                                                    submissionId={submission._id}
                                                    currentReviewer={submission.reviewer}
                                                    allReviewers={allReviewers}
                                                />
                                            </div>
                                        </td>

                                        {/* Action */}
                                        <td className={classes}>
                                            {submission.action === "View Screenshot" ? (
                                                <AcceptOrRejectSubmissionModal
                                                    submissionId={submission._id}
                                                    image={submission.screenshot}
                                                />
                                            ) : (
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {submission.action || "N/A"}
                                                </Typography>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Showing {filteredFiles.length} submissions
                    </Typography>
                </CardFooter>
            </Card>
        </div>
    );
}

export default ViewAllSubmissionsTable;