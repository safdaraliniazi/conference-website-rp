import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import {
    Typography,
    Card,
    CardBody,
    Button,
} from '@material-tailwind/react';
import {
    DocumentPlusIcon,
    DocumentTextIcon,
    ArrowLongRightIcon,
    UserCircleIcon,
} from '@heroicons/react/24/solid';
import PageWrapper from '../components/page-wrapper';

const DASHBOARD_OPTIONS = [
    {
        title: 'Add New Submission',
        description: 'Submit your research paper for IPDIMS 2024. Make sure to follow the submission guidelines and format requirements.',
        href: '/user/dashboard/add-new-submission',
        icon: DocumentPlusIcon,
        color: 'orange',
    },
    {
        title: 'View My Submissions',
        description: 'Track and manage your submitted papers. Check submission status and reviewer feedback.',
        href: '/user/dashboard/view-my-submissions',
        icon: DocumentTextIcon,
        color: 'blue',
    }
];

function UserDashboard() {
    const navigate = useNavigate();
    const { user, logout, isUserValid } = useContext(UserContext);

    useEffect(() => {
        try {
            if (!isUserValid()) {
                logout();
                navigate('/registration');
            }
        } catch (error) {
            logout();
        }
    }, []);

    return (
        <PageWrapper>
            <div className="text-center mb-12">
                <Typography
                    variant="h6"
                    color="orange"
                    className="mb-2"
                >
                    Welcome Back
                </Typography>
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4"
                >
                    Author Dashboard
                </Typography>
                <Typography
                    className="mx-auto max-w-3xl !text-gray-500"
                    variant="lead"
                >
                    Manage your paper submissions for IPDIMS 2024
                </Typography>
            </div>

            {/* User Info Card */}
            <Card className="mb-12 overflow-hidden">
                <CardBody className="p-6">
                    <div className="flex items-center gap-4">
                        <span className="p-3 rounded-full bg-blue-gray-50">
                            <UserCircleIcon className="h-8 w-8 text-blue-gray-500" />
                        </span>
                        <div>
                            <Typography variant="h5" color="blue-gray" className="mb-1">
                                {user?.name || 'Author'}
                            </Typography>
                            <Typography variant="small" className="font-normal text-gray-600">
                                {user?.email || 'author@example.com'}
                            </Typography>
                        </div>
                    </div>
                </CardBody>
            </Card>

            {/* Dashboard Options */}
            <div className="grid gap-6 md:grid-cols-2 mb-12">
                {DASHBOARD_OPTIONS.map((option, index) => (
                    <Card
                        key={index}
                        className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => navigate(option.href)}
                    >
                        <CardBody className="p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <span className={`p-3 rounded-full bg-${option.color}-50`}>
                                    <option.icon className={`h-6 w-6 text-${option.color}-500`} />
                                </span>
                                <Typography variant="h5" color="blue-gray">
                                    {option.title}
                                </Typography>
                            </div>
                            <Typography className="font-normal text-gray-600 mb-4">
                                {option.description}
                            </Typography>
                            <Button
                                variant="text"
                                className="flex items-center gap-2"
                                color={option.color}
                            >
                                Get Started
                                <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                            </Button>
                        </CardBody>
                    </Card>
                ))}
            </div>

            {/* Quick Actions */}
            <Card className="bg-blue-gray-50">
                <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Ready to Submit Your Paper?
                            </Typography>
                            <Typography className="font-normal text-gray-600">
                                Make sure to review the submission guidelines before proceeding
                            </Typography>
                        </div>
                        <div className="flex gap-4">
                            <Button
                                color="orange"
                                className="flex items-center gap-2"
                                onClick={() => navigate('/user/dashboard/add-new-submission')}
                            >
                                New Submission
                                <DocumentPlusIcon className="h-4 w-4" />
                            </Button>
                            <Button
                                variant="outlined"
                                color="blue-gray"
                                className="flex items-center gap-2"
                                onClick={() => navigate('/submission')}
                            >
                                View Guidelines
                                <ArrowLongRightIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </PageWrapper>
    );
}

export default UserDashboard;