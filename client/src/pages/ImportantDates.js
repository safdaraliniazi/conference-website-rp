import React from 'react';
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
    Typography,
    Card,
    CardBody,
    Button,
    Chip,
} from "@material-tailwind/react";
import {
    CalendarIcon,
    DocumentIcon,
    UserGroupIcon,
    AcademicCapIcon,
    ClockIcon,
    BellAlertIcon
} from "@heroicons/react/24/solid";
import PageWrapper from '../components/page-wrapper';


// Last date for submission of full length paper: 15 – 09 - 2024
// Author notification: 15 - 10 – 2024
// Submission of Revised Paper: 30 - 10 - 2024
// Early bird Registration: Till 20 - 11 - 202
// Late Registration: 21 to 27 – 11 - 2024
// Conference Dates: 04 & 05 December 2024

const importantDates = [
    {
        date: '15 September, 2024',
        description: 'Last date for submission of full length paper',
        icon: DocumentIcon,
        category: 'Submission',
        daysLeft: '120', // You can calculate this dynamically
    },
    {
        date: '15 October, 2024',
        description: 'Author notification',
        icon: BellAlertIcon,
        category: 'Notification',
        daysLeft: '150',
    },
    {
        date: '30 October, 2024',
        description: 'Submission of Revised Paper',
        icon: DocumentIcon,
        category: 'Revision',
        daysLeft: '165',
    },
    {
        date: '20 November, 2024',
        description: 'Early bird Registration',
        icon: UserGroupIcon,
        category: 'Registration',
        daysLeft: '186',
    },
    {
        date: '21 - 27 November, 2024',
        description: 'Late Registration',
        icon: ClockIcon,
        category: 'Registration',
        daysLeft: '187',
    },
    {
        date: '04 & 05 December, 2024',
        description: 'Conference Dates',
        icon: AcademicCapIcon,
        category: 'Conference',
        daysLeft: '195',
    }
];

function ImportantDates() {
    return (
        <PageWrapper>
            <div className="text-center mb-12">
                <Typography
                    variant="h6"
                    color="orange"
                    className="mb-2"
                >
                    Key Deadlines
                </Typography>
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4"
                >
                    Important Dates
                </Typography>
                <Typography
                    className="mx-auto max-w-3xl !text-gray-500"
                    variant="lead"
                >
                    Mark your calendar with these crucial dates for IPDIMS 2024. Early submissions and registrations are encouraged.
                </Typography>
            </div>

            {/* Quick Overview Card */}
            <Card className="mb-12 overflow-hidden">
                <CardBody className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="text-center p-4 rounded-lg bg-orange-50">
                            <CalendarIcon className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Conference Dates
                            </Typography>
                            <Typography className="font-normal text-gray-600">
                                04 & 05 December, 2024
                            </Typography>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-blue-gray-50">
                            <DocumentIcon className="h-8 w-8 mx-auto mb-2 text-blue-gray-500" />
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Paper Submission
                            </Typography>
                            <Typography className="font-normal text-gray-600">
                                Due: 15 September, 2024
                            </Typography>
                        </div>
                        <div className="text-center p-4 rounded-lg bg-green-50">
                            <UserGroupIcon className="h-8 w-8 mx-auto mb-2 text-green-500" />
                            <Typography variant="h6" color="blue-gray" className="mb-1">
                                Early Bird Registration
                            </Typography>
                            <Typography className="font-normal text-gray-600">
                                Till 20 November, 2024
                            </Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Detailed Timeline */}
            <Card className="w-full">
                <CardBody className="p-6">
                    <Typography variant="h4" color="blue-gray" className="mb-6">
                        Detailed Timeline
                    </Typography>
                    <div className="w-full">
                        <Timeline>
                            {importantDates.map((date, index) => (
                                <TimelineItem key={index}>
                                    {index !== importantDates.length - 1 && <TimelineConnector />}
                                    <TimelineHeader>
                                        <TimelineIcon className="p-2">
                                            <date.icon className="h-4 w-4" />
                                        </TimelineIcon>
                                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                                            <Typography variant="h5" color="blue-gray">
                                                {date.date}
                                            </Typography>
                                            <Chip
                                                size="sm"
                                                variant="ghost"
                                                value={date.category}
                                                color={
                                                    date.category === 'Conference' ? 'green' :
                                                        date.category === 'Registration' ? 'amber' :
                                                            date.category === 'Submission' ? 'blue' :
                                                                date.category === 'Notification' ? 'purple' :
                                                                    'gray'
                                                }
                                            />
                                        </div>
                                    </TimelineHeader>
                                    <TimelineBody className="pb-8">
                                        <Typography color="gray" className="font-normal text-gray-600">
                                            {date.description}
                                        </Typography>
                                        <Typography className="text-sm text-gray-500 mt-1">
                                            {date.daysLeft} days remaining
                                        </Typography>
                                    </TimelineBody>
                                </TimelineItem>
                            ))}
                        </Timeline>
                    </div>
                </CardBody>
            </Card>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <Button size="lg" color="orange" className="mx-2">
                    Submit Paper
                </Button>
                <Button size="lg" variant="outlined" color="blue-gray" className="mx-2">
                    Register Now
                </Button>
            </div>
        </PageWrapper>
    );
}

export default ImportantDates;