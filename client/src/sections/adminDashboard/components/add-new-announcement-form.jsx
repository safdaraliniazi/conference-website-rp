import React, { useState } from 'react';
import axios from 'axios';
import { Button } from '@material-tailwind/react';

function AddNewAnnouncementForm() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date, setDate] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await axios.post('https://conference-website-rp.onrender.com/api/admin/add-new-announcement',
                { title, description, date },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );
            // Optionally, handle success (e.g., clear form, show success message)
        } catch (error) {
            console.error('Error adding announcement:', error);
            // Optionally, handle error (e.g., show error message)
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 mb-10">
            <div className="flex-1">
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                    required
                />
            </div>
            <div className="flex-1">
                <label htmlFor="description">Description</label>
                <input
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                    required
                />
            </div>
            <div className="flex-1">
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                    required
                />
            </div>
            <div className="flex-1 flex items-end">
                <Button className='w-full p-4' type="submit">Add Announcement</Button>
            </div>
        </form>
    );
}

export default AddNewAnnouncementForm;