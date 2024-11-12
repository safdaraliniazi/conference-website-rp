import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, IconButton, Input, Tab, Tabs, TabsHeader, Tooltip, Typography } from '@material-tailwind/react';
import { MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import ReviewerSelect from './reviewerSelect';
import AcceptOrRejectSubmissionModal from './accept-or-reject-submission-modal';
import * as XLSX from 'xlsx';


function ViewAllSubmissionsTable() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);
    const [allReviewers, setAllReviewers] = useState([]);

    const handleDownloadExcel = () => {
        // Define headers for the Excel file with only necessary details
        const headers = ["Name", "Email", "File Name", "Track", "Status", "Recommendation"];

        // Map `files` data to the format needed for Excel
        const data = files.map(file => [
            file.name,                               // Name of the file submitter
            file.email,                              // Email of the file submitter
            file.filename,                           // File name
            file.track,                              // Track information
            file.status,                             // Submission status
            file.review.recommendation,              // Review recommendation (e.g., accept/reject)
            // file.reviewer                            // Reviewer ID
        ]);

        // Add headers at the top of data
        const worksheetData = [headers, ...data];

        // Create a new workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

        // Append worksheet to workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, "Submissions");

        // Generate Excel file and trigger download
        XLSX.writeFile(workbook, "submissions.xlsx");
    };


    // view all user submissions
    useEffect(() => {
        // Fetch the list of files from the server with Authorization header
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/admin/view-all-user-submissions', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });

                if (!response.ok) {
                    throw new Error(`Error fetching files: ${response.statusText}`);
                }

                const data = await response.json();
                setFiles(data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    // get all reviewers
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch('http://localhost:5000/api/admin/all-reviewers', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setAllReviewers(data);
                    console.log('All reviewers:', data);
                } else {
                    console.error('Failed to fetch users');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);


    const TABS = [
        {
            label: "All",
            value: "all",
        },
        {
            label: "Monitored",
            value: "monitored",
        },
        {
            label: "Unmonitored",
            value: "unmonitored",
        },
    ];

    const TABLE_HEAD = ["Name", "File Name", "Status", "Members", "Track", "Reviewer", ""];

    const handleFileClick = (filename) => {
        // Open the file in a new tab with Authorization header
        const token = localStorage.getItem('token');
        const url = `http://localhost:5000/api/admin/view-all-user-submissions/${filename}`;

        fetch(url, {
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
                window.open(newUrl, '_blank');
            })
            .catch(error => {
                setError(error.message);
                console.error('Error opening file:', error);
            });
    };
    return (

        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Card className="h-full w-full">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-8 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Members list
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                See information about all members
                            </Typography>
                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <Button variant="outlined" size="sm" onClick={handleDownloadExcel}>
                                Download Excel File
                            </Button>
                            <Button className="flex items-center gap-3" size="sm">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
                            </Button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
                        <Tabs value="all" className="w-full md:w-max">
                            <TabsHeader>
                                {TABS.map(({ label, value }) => (
                                    <Tab key={value} value={value}>
                                        &nbsp;&nbsp;{label}&nbsp;&nbsp;
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </Tabs>
                        <div className="w-full md:w-72">
                            <Input
                                label="Search"
                                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-0">
                    <table className="mt-4 w-full min-w-max table-auto text-left">
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
                                            className="font-normal leading-none opacity-70"
                                        >
                                            {head}
                                        </Typography>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {files.map(
                                (submission, index) => {
                                    const isLast = index === files.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={submission._id}>
                                            {/* columns */}
                                            <td className={classes}>
                                                <div className="flex items-center gap-3">
                                                    <Avatar src={'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80'} alt={submission.name} size="sm" />
                                                    <div className="flex flex-col">
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal"
                                                        >
                                                            {submission.name}
                                                        </Typography>
                                                        <Typography
                                                            variant="small"
                                                            color="blue-gray"
                                                            className="font-normal opacity-70"
                                                        >
                                                            {submission.email}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* file name */}
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        <span className='cursor-pointer' onClick={() => handleFileClick(submission.filename)}>
                                                            {submission.filename}
                                                        </span>
                                                    </Typography>
                                                </div>
                                            </td>

                                            {/* status */}
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        variant="ghost"
                                                        size="sm"
                                                        value={submission.status}
                                                        color={"blue-gray"}
                                                    />
                                                </div>
                                            </td>

                                            {/* members */}
                                            <td className={classes}>
                                                <ul>
                                                    {submission.members.map((member) => {
                                                        return <li key={member.email}>{member.name} - {member.email}</li>
                                                    })}
                                                </ul>
                                            </td>

                                            {/* track */}
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {submission.track.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}
                                                    </Typography>
                                                </div>
                                            </td>

                                            {/* reviewer */}
                                            <td className={classes}>
                                                <div className="flex flex-col items-start">
                                                    <ReviewerSelect
                                                        submissionId={submission._id}
                                                        currentReviewer={submission.reviewer}
                                                        allReviewers={allReviewers}
                                                    />
                                                </div>
                                            </td>

                                            {/* action */}
                                            <td className={classes}>
                                                <div className="flex flex-col text-center">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {submission.action === "View Screenshot" ? (
                                                            <AcceptOrRejectSubmissionModal submissionId={submission._id} image={submission.screenshot} />
                                                        ) : (
                                                            <div>_</div>
                                                        )}
                                                    </Typography>
                                                </div>
                                            </td>

                                        </tr>
                                    );
                                },
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Page 1 of 10
                    </Typography>
                    <div className="flex gap-2">
                        <Button variant="outlined" size="sm">
                            Previous
                        </Button>
                        <Button variant="outlined" size="sm">
                            Next
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </div>
    )
}

export default ViewAllSubmissionsTable