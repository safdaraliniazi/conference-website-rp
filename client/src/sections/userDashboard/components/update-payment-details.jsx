import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useState } from 'react'

function UpdatePaymentDetails({ submissionId }) {
    const [open, setOpen] = React.useState(false);
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        const validTypes = ['image/jpeg', 'image/png'];
        const maxSize = 2 * 1024 * 1024; // 2 MB

        if (!validTypes.includes(selectedFile.type)) {
            setError('Only JPEG and PNG files are allowed.');
            setFile(null);
            return;
        }

        if (selectedFile.size > maxSize) {
            setError('File size must be less than 2 MB.');
            setFile(null);
            return;
        }

        setError(null);
        setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file) {
            setError('Please select a file.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('submissionId', submissionId);

        try {
            const response = await fetch('https://conference-website-rp.onrender.com/api/users/register-now', {
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

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <span onClick={handleOpen} className='cursor-pointer hover:underline'>
            Update Payment Details
            </span>
            <Dialog size='xs' open={open} handler={handleOpen} className='p-5 w-auto'>
                <DialogHeader>Update Payment Details</DialogHeader>
                <DialogBody>
                    Your payment verification was failed by the authorites. Please upload different payment details.
                </DialogBody>

                <form onSubmit={handleSubmit}>
                    <div className="mb-5">
                        <input
                            onChange={handleFileChange}
                            type="file"
                            name="file"
                            id="file"
                            className="sr-only"
                        />
                        <label htmlFor="file"
                            className="relative flex items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-3 text-center">
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
                        {error && <p className="text-red-500">{error}</p>}
                    </div>
                    <DialogFooter>
                        <Button
                            variant="text"
                            onClick={handleOpen}
                            className="mr-1"
                        >
                            <span>Close</span>
                        </Button>
                        <Button variant="gradient" type="submit">
                            <span>Submit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    )
}

export default UpdatePaymentDetails