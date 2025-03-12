import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Input,
    Typography,
    Button,
    Chip,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    UserGroupIcon,
    UserIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    ShieldCheckIcon,
    PencilSquareIcon,
    TrashIcon,
    XMarkIcon
} from "@heroicons/react/24/solid";
import ChangeUserRole from "./change-user-role";

export function UserTable({ allUsers }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const TABS = [
        {
            label: "All Users",
            value: "all",
            icon: UserGroupIcon
        },
        {
            label: "Authors",
            value: "author",
            icon: UserIcon
        },
        {
            label: "Reviewers",
            value: "reviewer",
            icon: AcademicCapIcon
        },
        {
            label: "Admins",
            value: "admin",
            icon: ShieldCheckIcon
        }
    ];

    const TABLE_HEAD = ["User", "Role", "Institution", "Contact", "Actions"];

    const getRoleIcon = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return <ShieldCheckIcon className="h-4 w-4" />;
            case 'reviewer':
                return <AcademicCapIcon className="h-4 w-4" />;
            case 'author':
                return <UserIcon className="h-4 w-4" />;
            default:
                return <UserIcon className="h-4 w-4" />;
        }
    };

    const getRoleColor = (role) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'blue';
            case 'reviewer':
                return 'green';
            case 'author':
                return 'orange';
            default:
                return 'blue-gray';
        }
    };

    const filteredUsers = allUsers.filter(user => {
        const matchesSearch = (
            user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (user.institution || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.role.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (activeTab === 'all') return matchesSearch;
        return matchesSearch && user.role.toLowerCase() === activeTab;
    });

    const handleDeleteUser = async (userId) => {
        // Implement delete functionality here
        console.log('Delete user:', userId);
        setOpenDialog(false);
    };

    return (
        <div className="relative">
            <Card className="h-full w-full overflow-hidden">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                All Users
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Manage and monitor conference participants
                            </Typography>
                        </div>
                        <Button
                            color="orange"
                            size="sm"
                            className="flex items-center gap-2"
                        >
                            <UserIcon className="h-4 w-4" />
                            Add New User
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
                                label="Search users"
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
                            {filteredUsers.map((user, index) => {
                                const isLast = index === filteredUsers.length - 1;
                                const classes = isLast
                                    ? "p-4"
                                    : "p-4 border-b border-blue-gray-50";

                                return (
                                    <tr key={user._id} className="hover:bg-orange-50/50 transition-colors">
                                        {/* User */}
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <Avatar
                                                    src={user.avatar || "https://static.thenounproject.com/png/1743561-200.png"}
                                                    alt={user.fullName}
                                                    size="sm"
                                                    className="border-2 border-orange-100"
                                                />
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-semibold"
                                                    >
                                                        {user.fullName}
                                                    </Typography>
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="opacity-70"
                                                    >
                                                        {user.email}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </td>

                                        {/* Role */}
                                        <td className={classes}>
                                            <div className="w-max">
                                                <ChangeUserRole
                                                    role={user.role}
                                                    email={user.email}
                                                    className="flex items-center gap-2"
                                                >
                                                    {getRoleIcon(user.role)}
                                                    <span>{user.role}</span>
                                                </ChangeUserRole>
                                            </div>
                                        </td>

                                        {/* Institution */}
                                        <td className={classes}>
                                            <div className="flex items-center gap-2">
                                                <BuildingLibraryIcon className="h-4 w-4 text-blue-gray-500" />
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {user.institution || 'N/A'}
                                                </Typography>
                                            </div>
                                        </td>

                                        {/* Contact */}
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {user.phone || 'N/A'}
                                            </Typography>
                                        </td>

                                        {/* Actions */}
                                        <td className={classes}>
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="text"
                                                    color="blue"
                                                    size="sm"
                                                    className="flex items-center gap-2"
                                                >
                                                    <PencilSquareIcon className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                                <Button
                                                    variant="text"
                                                    color="red"
                                                    size="sm"
                                                    className="flex items-center gap-2"
                                                    onClick={() => {
                                                        setSelectedUser(user);
                                                        setOpenDialog(true);
                                                    }}
                                                >
                                                    <TrashIcon className="h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Showing {filteredUsers.length} users
                    </Typography>
                </CardFooter>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} handler={() => setOpenDialog(false)}>
                <DialogHeader>Confirm Deletion</DialogHeader>
                <DialogBody divider>
                    Are you sure you want to delete {selectedUser?.fullName}? This action cannot be undone.
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => setOpenDialog(false)}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="red"
                        onClick={() => handleDeleteUser(selectedUser?._id)}
                    >
                        <span>Confirm Delete</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default UserTable;
