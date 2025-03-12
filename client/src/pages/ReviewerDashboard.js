import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Typography } from '@material-tailwind/react';
import OptionsCard from '../sections/userDashboard/components/optionscard';
import PageWrapper from '../components/page-wrapper';
import { ClipboardDocumentListIcon, DocumentCheckIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

const options = [
    {
        title: 'Review Submissions',
        description: 'Access and review assigned paper submissions. Provide detailed feedback and recommendations for improvements.',
        href: '/reviewer/dashboard/view-assigned-submissions',
        icon: <DocumentCheckIcon className="w-8 h-8" />,
    },
    {
        title: 'Review Guidelines',
        description: 'Access detailed guidelines and criteria for paper review. Ensure consistent and high-quality feedback.',
        href: '/reviewer/dashboard/guidelines',
        icon: <ClipboardDocumentListIcon className="w-8 h-8" />,
    },
    {
        title: 'Communication',
        description: 'Communicate with authors and committee members. Access messaging system for clarifications.',
        href: '/reviewer/dashboard/communication',
        icon: <ChatBubbleLeftRightIcon className="w-8 h-8" />,
    },
];

function ReviewerDashboard() {
    const navigate = useNavigate();
    const { user, login, logout, isUserValid } = useContext(UserContext);

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
            <div className="relative py-12">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />

                <div className="relative container mx-auto px-4">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <Typography
                            variant="h6"
                            className="text-orange-500 font-semibold mb-2"
                        >
                            Reviewer Portal
                        </Typography>
                        <Typography
                            variant="h3"
                            className="text-gray-900 font-bold mb-4"
                        >
                            Welcome, {user?.name || 'Reviewer'}
                        </Typography>
                        <Typography className="font-normal text-gray-600 max-w-2xl mx-auto">
                            Thank you for contributing to IPDIMS 2024. Your expertise helps maintain the quality and standards of our conference.
                        </Typography>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <Typography variant="h4" className="text-orange-500 font-bold mb-2">
                                5
                            </Typography>
                            <Typography className="text-gray-600">
                                Pending Reviews
                            </Typography>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <Typography variant="h4" className="text-orange-500 font-bold mb-2">
                                12
                            </Typography>
                            <Typography className="text-gray-600">
                                Completed Reviews
                            </Typography>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <Typography variant="h4" className="text-orange-500 font-bold mb-2">
                                3
                            </Typography>
                            <Typography className="text-gray-600">
                                Days Until Deadline
                            </Typography>
                        </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {options.map((option, index) => (
                            <OptionsCard key={index} category={option} />
                        ))}
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
}

export default ReviewerDashboard;