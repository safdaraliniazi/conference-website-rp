import React, { useEffect, useState } from 'react'
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, Chip, IconButton, Input, Tab, Tabs, TabsHeader, Tooltip, Typography } from '@material-tailwind/react';
import { MagnifyingGlassIcon, PencilIcon, UserPlusIcon } from '@heroicons/react/24/solid';
import ReviewModal from './review-modal';
import RegisterModal from './register-modal';
import ViewScreenshotModal from './view-screenshot-modal';
import UpdatePaymentDetails from './update-payment-details';


function ViewMySubmissionsTable() {
    const [files, setFiles] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the list of files from the server with Authorization header
        const fetchFiles = async () => {
            try {
                const response = await fetch('https://conference-website-rp.onrender.com/api/users/view-my-submissions', {
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


    // Function to handle file click to get pdf file from server
    const handleFileClick = (filename) => {
        // Open the file in a new tab with Authorization header
        const token = localStorage.getItem('token');
        const url = `https://conference-website-rp.onrender.com/api/users/view-my-submissions/${filename}`;

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
                window.open(newUrl, '_blank');
            })
            .catch(error => {
                setError(error.message);
                console.error('Error opening file:', error);
            });
    };



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

    const TABLE_HEAD = ["Name", "File Name", "Status", "Members", "Track", "Action"];
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
                            <Button variant="outlined" size="sm">
                                view all
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
                                            {/* name and email */}
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

                                            {/* action */}
                                            <td className={classes}>
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {submission.action === "Submit Revision" ? (
                                                            <ReviewModal review={submission.review} submissionId={submission._id} />
                                                        ) : submission.action === "Register Now" ? (
                                                            <RegisterModal submissionId={submission._id} />
                                                        ) : submission.action === "Update Payment Details" ? (
                                                            <UpdatePaymentDetails submissionId={submission._id} />
                                                        ) : submission.action === "View Screenshot" ? (
                                                            <ViewScreenshotModal submissionId={submission._id} image={submission.screenshot} />
                                                        ) : (
                                                            <div>{submission.action}</div>
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

export default ViewMySubmissionsTable