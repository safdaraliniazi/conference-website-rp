import { Select, Option } from '@material-tailwind/react';
import React, { useState } from 'react';
import axios from 'axios';
import { ConfirmationModal } from '../../../components/confirmation-modal';


const ChangeUserRole = ({ role, email }) => {
    const [selectedRole, setSelectedRole] = useState(role);
    const [newRole, setNewRole] = useState(null);
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleConfirm = async () => {
        const token = localStorage.getItem('token');
        setSelectedRole(newRole);

        try {
            await axios.post(`https://conference-website-rp.onrender.com/api/admin/change-user-role`,
                { email, role: newRole },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
        } catch (error) {
            console.error('Error updating role:', error);
        }
        handleOpen(); // Close the modal after confirmation
    };

    const handleRoleChange = (newRole) => {
        setNewRole(newRole);
        handleOpen(); // Open the confirmation modal
    };

    return (
        <>
            <Select
                value={selectedRole}
                label="Role"
                className="block w-full px-3 py-2 rounded-md shadow-sm sm:text-sm"
                onChange={(value) => handleRoleChange(value)} // Directly use the value passed by Material Tailwind's Select
            >
                <Option value="user">User</Option>
                <Option value="reviewer">Reviewer</Option>
                <Option value="admin">Admin</Option>
            </Select>
            <ConfirmationModal
                open={open}
                handleOpen={handleOpen}
                titleOfModal='Change User Role'
                message={`Are you sure you want to change the role to ${newRole}?`}
                actionOnConfirm={handleConfirm}
            />
        </>
    );
};

export default ChangeUserRole;