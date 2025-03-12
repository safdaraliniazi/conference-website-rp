import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import { Typography } from '@material-tailwind/react';
import OptionsCard from '../sections/adminDashboard/components/optionscard';
import PageWrapper from '../components/page-wrapper';
import {
    UsersIcon,
    DocumentTextIcon,
    BellIcon,
    ClipboardDocumentCheckIcon,
    UserGroupIcon,
    CalendarDaysIcon
} from "@heroicons/react/24/solid";
import API_BASE_URL from "../config/api";

const options = [
    {
        title: 'View All Users',
        description: 'Manage and monitor all registered users. View profiles, update roles, and maintain user access control.',
        href: '/admin/dashboard/view-all-users',
        icon: <UsersIcon className="w-8 h-8" />,
    },
    {
        title: 'View All Submissions',
        description: 'Access and manage all conference submissions. Review papers, assign reviewers, and track submission status.',
        href: '/admin/dashboard/view-all-user-submissions',
        icon: <DocumentTextIcon className="w-8 h-8" />,
    },
    {
        title: 'Manage Announcements',
        description: 'Create and manage conference announcements. Keep participants informed about important updates and deadlines.',
        href: '/admin/dashboard/manage-announcements',
        icon: <BellIcon className="w-8 h-8" />,
    }
];

function AdminDashboard() {
    const navigate = useNavigate();
    const { user, logout, isUserValid } = useContext(UserContext);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalSubmissions: 0,
        activeAnnouncements: 0
    });

    useEffect(() => {
        try {
            if (!isUserValid()) {
                logout();
                navigate('/registration');
            } else {
                if (user?.role !== 'admin') {
                    navigate('/user/dashboard');
                }
            }
        } catch (error) {
            logout();
        }
    }, []);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('token');
                const [usersRes, submissionsRes, announcementsRes] = await Promise.all([
                    fetch(`${API_BASE_URL}/api/admin/all-users`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${API_BASE_URL}/api/admin/view-all-user-submissions`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    }),
                    fetch(`${API_BASE_URL}/api/general/get-all-announcements`, {
                        method: 'POST',
                        headers: { 'Authorization': `Bearer ${token}` }
                    })
                ]);

                const [users, submissions, announcements] = await Promise.all([
                    usersRes.json(),
                    submissionsRes.json(),
                    announcementsRes.json()
                ]);

                const activeAnnouncements = announcements.filter(a => new Date(a.date) > new Date()).length;

                setStats({
                    totalUsers: users.length,
                    totalSubmissions: submissions.length,
                    activeAnnouncements
                });
            } catch (error) {
                console.error('Error fetching stats:', error);
            }
        };

        fetchStats();
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
                            Admin Portal
                        </Typography>
                        <Typography
                            variant="h3"
                            className="text-gray-900 font-bold mb-4"
                        >
                            Welcome, {user?.name || 'Admin'}
                        </Typography>
                        <Typography className="font-normal text-gray-600 max-w-2xl mx-auto">
                            Manage and monitor all aspects of IPDIMS 2024. Your role is crucial in maintaining the conference's organization and success.
                        </Typography>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <UserGroupIcon className="w-8 h-8 text-orange-500" />
                                <div>
                                    <Typography variant="h4" className="text-orange-500 font-bold mb-2">
                                        {stats.totalUsers}
                                    </Typography>
                                    <Typography className="text-gray-600">
                                        Total Users
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <ClipboardDocumentCheckIcon className="w-8 h-8 text-orange-500" />
                                <div>
                                    <Typography variant="h4" className="text-orange-500 font-bold mb-2">
                                        {stats.totalSubmissions}
                                    </Typography>
                                    <Typography className="text-gray-600">
                                        Total Submissions
                                    </Typography>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="flex items-center gap-4">
                                <CalendarDaysIcon className="w-8 h-8 text-orange-500" />
                                <div>
                                    <Typography variant="h4" className="text-orange-500 font-bold mb-2">
                                        {stats.activeAnnouncements}
                                    </Typography>
                                    <Typography className="text-gray-600">
                                        Active Announcements
                                    </Typography>
                                </div>
                            </div>
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

export default AdminDashboard;