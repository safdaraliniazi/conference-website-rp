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
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Textarea,
} from "@material-tailwind/react";
import {
    MagnifyingGlassIcon,
    BellIcon,
    BellAlertIcon,
    BellSlashIcon,
    CalendarDaysIcon,
    PencilSquareIcon,
    TrashIcon,
    PlusIcon,
} from "@heroicons/react/24/solid";

export function AnnouncementTable({ allAnnouncements, onAddAnnouncement, onEditAnnouncement, onDeleteAnnouncement }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
    const [openAddDialog, setOpenAddDialog] = useState(false);
    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [editingAnnouncement, setEditingAnnouncement] = useState({
        title: '',
        description: '',
        date: ''
    });
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0]
    });

    const TABS = [
        {
            label: "All Announcements",
            value: "all",
            icon: BellIcon
        },
        {
            label: "Active",
            value: "active",
            icon: BellAlertIcon
        },
        {
            label: "Archived",
            value: "archived",
            icon: BellSlashIcon
        }
    ];

    const TABLE_HEAD = ["Title", "Description", "Date", "Status", "Actions"];

    const getStatusColor = (date) => {
        const announcementDate = new Date(date);
        const now = new Date();
        const isActive = announcementDate > now;
        return isActive ? "green" : "blue-gray";
    };

    const filteredAnnouncements = allAnnouncements.filter(announcement => {
        const matchesSearch = (
            announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            announcement.description.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const announcementDate = new Date(announcement.date);
        const now = new Date();
        const isActive = announcementDate > now;

        if (activeTab === 'all') return matchesSearch;
        if (activeTab === 'active') return matchesSearch && isActive;
        if (activeTab === 'archived') return matchesSearch && !isActive;

        return matchesSearch;
    });

    const handleAddNewAnnouncement = async () => {
        if (!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.date) {
            return;
        }

        const success = await onAddAnnouncement(newAnnouncement);
        if (success) {
            setNewAnnouncement({
                title: '',
                description: '',
                date: new Date().toISOString().split('T')[0]
            });
            setOpenAddDialog(false);
        }
    };

    const handleDeleteConfirm = async () => {
        if (selectedAnnouncement) {
            await onDeleteAnnouncement(selectedAnnouncement._id);
            setOpenDialog(false);
            setSelectedAnnouncement(null);
        }
    };

    const handleEditClick = (announcement) => {
        setEditingAnnouncement({
            title: announcement.title,
            description: announcement.description,
            date: new Date(announcement.date).toISOString().split('T')[0]
        });
        setSelectedAnnouncement(announcement);
        setOpenEditDialog(true);
    };

    const handleEditSubmit = async () => {
        if (!editingAnnouncement.title || !editingAnnouncement.description || !editingAnnouncement.date) {
            return;
        }

        const success = await onEditAnnouncement(selectedAnnouncement._id, editingAnnouncement);
        if (success) {
            setOpenEditDialog(false);
            setSelectedAnnouncement(null);
            setEditingAnnouncement({
                title: '',
                description: '',
                date: ''
            });
        }
    };

    return (
        <div className="relative">
            <Card className="h-full w-full overflow-hidden">
                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-4 flex items-center justify-between">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Announcements
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                Manage and monitor conference announcements
                            </Typography>
                        </div>
                        <Button
                            color="orange"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => setOpenAddDialog(true)}
                        >
                            <PlusIcon className="h-4 w-4" />
                            Add Announcement
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
                                label="Search announcements"
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
                            {filteredAnnouncements.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-4 text-center">
                                        <Typography color="gray">
                                            No announcements found
                                        </Typography>
                                    </td>
                                </tr>
                            ) : (
                                filteredAnnouncements.map((announcement, index) => {
                                    const isLast = index === filteredAnnouncements.length - 1;
                                    const classes = isLast
                                        ? "p-4"
                                        : "p-4 border-b border-blue-gray-50";

                                    return (
                                        <tr key={announcement._id} className="hover:bg-orange-50/50 transition-colors">
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-semibold"
                                                >
                                                    {announcement.title}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal line-clamp-2"
                                                >
                                                    {announcement.description}
                                                </Typography>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-2">
                                                    <CalendarDaysIcon className="h-4 w-4 text-blue-gray-500" />
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal"
                                                    >
                                                        {new Date(announcement.date).toLocaleDateString()}
                                                    </Typography>
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="w-max">
                                                    <Chip
                                                        size="sm"
                                                        variant="ghost"
                                                        value={
                                                            <div className="flex items-center gap-2">
                                                                {new Date(announcement.date) > new Date() ? (
                                                                    <BellAlertIcon className="h-4 w-4" />
                                                                ) : (
                                                                    <BellSlashIcon className="h-4 w-4" />
                                                                )}
                                                                <span>
                                                                    {new Date(announcement.date) > new Date() ? 'Active' : 'Archived'}
                                                                </span>
                                                            </div>
                                                        }
                                                        color={getStatusColor(announcement.date)}
                                                    />
                                                </div>
                                            </td>
                                            <td className={classes}>
                                                <div className="flex items-center gap-2">
                                                    <Button
                                                        variant="text"
                                                        color="blue"
                                                        size="sm"
                                                        className="flex items-center gap-2"
                                                        onClick={() => handleEditClick(announcement)}
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
                                                            setSelectedAnnouncement(announcement);
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
                                })
                            )}
                        </tbody>
                    </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                        Showing {filteredAnnouncements.length} announcement{filteredAnnouncements.length !== 1 ? 's' : ''}
                    </Typography>
                </CardFooter>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDialog} handler={() => setOpenDialog(false)}>
                <DialogHeader>Confirm Deletion</DialogHeader>
                <DialogBody divider>
                    Are you sure you want to delete the announcement "{selectedAnnouncement?.title}"? This action cannot be undone.
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
                        onClick={handleDeleteConfirm}
                    >
                        <span>Confirm Delete</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Edit Announcement Dialog */}
            <Dialog open={openEditDialog} handler={() => setOpenEditDialog(false)} size="md">
                <DialogHeader>Edit Announcement</DialogHeader>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input
                            label="Title"
                            value={editingAnnouncement.title}
                            onChange={(e) => setEditingAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                        />
                        <Textarea
                            label="Description"
                            value={editingAnnouncement.description}
                            onChange={(e) => setEditingAnnouncement(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <Input
                            type="date"
                            label="Date"
                            value={editingAnnouncement.date}
                            onChange={(e) => setEditingAnnouncement(prev => ({ ...prev, date: e.target.value }))}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => {
                            setOpenEditDialog(false);
                            setSelectedAnnouncement(null);
                            setEditingAnnouncement({
                                title: '',
                                description: '',
                                date: ''
                            });
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="orange"
                        onClick={handleEditSubmit}
                        disabled={!editingAnnouncement.title || !editingAnnouncement.description || !editingAnnouncement.date}
                    >
                        <span>Save Changes</span>
                    </Button>
                </DialogFooter>
            </Dialog>

            {/* Add Announcement Dialog */}
            <Dialog open={openAddDialog} handler={() => setOpenAddDialog(false)} size="md">
                <DialogHeader>Add New Announcement</DialogHeader>
                <DialogBody divider>
                    <div className="grid gap-6">
                        <Input
                            label="Title"
                            value={newAnnouncement.title}
                            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, title: e.target.value }))}
                        />
                        <Textarea
                            label="Description"
                            value={newAnnouncement.description}
                            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, description: e.target.value }))}
                        />
                        <Input
                            type="date"
                            label="Date"
                            value={newAnnouncement.date}
                            onChange={(e) => setNewAnnouncement(prev => ({ ...prev, date: e.target.value }))}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => {
                            setOpenAddDialog(false);
                            setNewAnnouncement({
                                title: '',
                                description: '',
                                date: new Date().toISOString().split('T')[0]
                            });
                        }}
                        className="mr-1"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="gradient"
                        color="orange"
                        onClick={handleAddNewAnnouncement}
                        disabled={!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.date}
                    >
                        <span>Add Announcement</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </div>
    );
}

export default AnnouncementTable;
