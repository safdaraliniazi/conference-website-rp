import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';
import { Button } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { ConfirmationModal } from '../../../components/confirmation-modal';

function AddNewSubmissionForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [members, setMembers] = useState([]);
    const [selectedTrack, setSelectedTrack] = useState('');

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    // confirmation modal
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(!open);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {

        // e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('members', JSON.stringify(members)); // Convert the array to a JSON string
        formData.append('track', selectedTrack);

        // console.log(file, name, email, members, selectedTrack);

        try {
            const response = await fetch('https://conference-website-rp.onrender.com/api/users/add-new-submission', {
                method: 'POST',
                body: formData,
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error submitting form: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);

            // Refresh the list of files after successful upload

        } catch (error) {
            setError(error.message);
            console.error(error);
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <aside className="">
                    <div className="sticky top-[100px] bg-gray-100 p-8 rounded">
                        <h2 className="font-bold text-2xl">Instructions</h2>
                        <ul className="list-disc mt-4 list-inside">
                            <li>
                                All users must provide a valid email address and password to create
                                an account.
                            </li>
                            <li>
                                Users must not use offensive, vulgar, or otherwise inappropriate
                                language in their name or profile information
                            </li>
                            <li>Users must not create multiple accounts for the same person.</li>
                        </ul>
                    </div>
                </aside>
                <form
                // onSubmit={handleSubmit}
                >
                    {/* full name */}
                    <div className="mb-5">
                        <label
                            htmlFor="name"
                            className="mb-3 block text-base font-medium text-black"
                        >
                            Full Name
                        </label>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Full Name"
                            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                        />
                    </div>


                    {/* email */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-3 block text-base font-medium text-black"
                        >
                            Email Address
                        </label>
                        <input
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                        />
                    </div>

                    {/* members */}
                    <div className="mb-5">
                        <label className="mb-3 block text-base font-medium text-black">
                            Add Members
                        </label>
                        <ol className="ml-5 list-decimal list-inside">
                            {members.map((member, index) => (
                                <li key={index} className="flex mb-5 items-center">
                                    {member.name} - {member.email}
                                    <TrashIcon
                                        className='h-4 w-4 ml-5 cursor-pointer'
                                        onClick={() => {
                                            const newMembers = members.filter((_, i) => i !== index);
                                            setMembers(newMembers);
                                        }} />
                                </li>
                            ))}
                        </ol>
                        <div className="-mx-3 flex flex-wrap items-center">
                            <div className="w-full px-3 sm:flex-1 mb-5">
                                <input
                                    type="text"
                                    name="membername"
                                    id="membername"
                                    placeholder="Enter Member Name"
                                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                                />
                            </div>
                            <div className="w-full px-3 sm:flex-1 mb-5">
                                <input
                                    type="text"
                                    name="memberemail"
                                    id="memberemail"
                                    placeholder="Enter Member Email"
                                    className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                                />
                            </div>
                            <div className="w-full px-3 sm:w-auto mb-5">
                                <Button onClick={() => {
                                    const memberName = document.getElementById('membername').value;
                                    const memberEmail = document.getElementById('memberemail').value;
                                    setMembers([...members, { name: memberName, email: memberEmail }]);
                                    document.getElementById('membername').value = '';
                                    document.getElementById('memberemail').value = '';
                                }}>
                                    <PlusIcon className='h-5 w-5' />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* track */}
                    <div className="mb-5">
                        <label
                            htmlFor="track"
                            className="mb-3 block text-base font-medium text-black"
                        >
                            Track Applying For
                        </label>
                        <select
                            name="track"
                            id="track"
                            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                            value={selectedTrack}
                            onChange={(event) => { setSelectedTrack(event.target.value) }}
                        >
                            <option value="">Select a track</option>
                            <option value="1-innovative-product-design">Innovative Product Design</option>
                            <option value="2-intelligent-manufacturing-systems">Intelligent Manufacturing Systems</option>
                        </select>
                    </div>

                    {/* paper */}
                    <div className="mb-5 pt-3">
                        <label
                            htmlFor="email"
                            className="mb-5 block text-base font-semibold text-black sm:text-xl"
                        >
                            Add Paper
                        </label>
                        <input onChange={handleFileChange} type="file" name="file" id="file" className="sr-only" />
                        <label htmlFor="file"
                            className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center">
                            <div>
                                <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                    Drop files here
                                </span>
                                <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                    Or
                                </span>
                                <span
                                    className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                    {file ? file.name : 'Choose a file'}
                                </span>
                            </div>
                        </label>
                    </div>


                    <div>
                        {/* <Button type='submit' className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Add Submission
                        </Button> */}

                        <Button
                            className='hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none'
                            onClick={handleOpen}
                        >
                            Add Submission
                        </Button>
                        <ConfirmationModal
                            open={open}
                            handleOpen={handleOpen}
                            titleOfModal='Add Submission'
                            message='Are you sure you want to add this submission?'
                            actionOnConfirm={handleSubmit}
                        />
                    </div>
                </form>


            </div>
            {error && <p>Error: {error}</p>}
        </>
    )
}

export default AddNewSubmissionForm




