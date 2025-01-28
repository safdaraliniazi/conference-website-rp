import { Button, Dialog, DialogBody, DialogFooter, DialogHeader } from '@material-tailwind/react'
import React, { useState } from 'react'

function ReviewModal({ review, submissionId }) {
    const [open, setOpen] = React.useState(false);

    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('file', file);
        formData.append('submissionId', submissionId);

        try {
            const response = await fetch('https://conference-website-rp.onrender.com/api/users/submit-revision', {
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
            {error && <p className="text-red-500">{error}</p>}
            <span onClick={handleOpen} className='cursor-pointer hover:underline'>
                Submit Revision
            </span>
            <Dialog size='md' open={open} handler={handleOpen} className='p-5 w-auto'>
                <DialogHeader>Check Submission Review</DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <h2 className="font-bold text-lg">Originality</h2>
                            <p>{review.originality}</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Relationship to Literature</h2>
                            <p>{review.relationshipToLiterature}</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Methodology</h2>
                            <p>{review.methodology}</p>
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Recommendation</h2>
                            <p>{review.recommendation}</p>
                        </div>
                    </div>
                </DialogBody>

                <form onSubmit={handleSubmit}>
                    {/* paper */}
                    <div className="mb-5">
                        <label
                            htmlFor="email"
                            className="mb-3 block text-base font-medium text-black"
                        >
                            Upload paper with aforesaid changes
                        </label>
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
                                    Browse
                                </span>
                            </div>
                        </label>
                    </div>
                    <DialogFooter>
                        <Button
                            variant="text"
                            onClick={handleOpen}
                            className="mr-5"
                        >
                            <span>Close</span>
                        </Button>
                        <Button type='submit' onClick={handleOpen}>
                            <span>Submit</span>
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </>
    )
}

export default ReviewModal