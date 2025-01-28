import { LinkIcon } from '@heroicons/react/24/solid';
import { Button, Radio, Textarea } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import { ConfirmationModal } from '../../../components/confirmation-modal';


function GivePaperFeedbackForm({ submissionId, filename, url }) {
    const [error, setError] = useState(null);
    const [originality, setOriginality] = useState('');
    const [relationshipToLiterature, setRelationshipToLiterature] = useState('');
    const [methodology, setMethodology] = useState('');
    const [recommendation, setRecommendation] = useState('');
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    const handleConfirm = async () => {
        try {
            let apiUrl;
            if (recommendation === 'accept')
                apiUrl = 'https://conference-website-rp.onrender.com/api/reviewer/accept-submission';
            else if (recommendation === 'reject')
                apiUrl = 'https://conference-website-rp.onrender.com/api/reviewer/reject-submission';
            else
                apiUrl = 'https://conference-website-rp.onrender.com/api/reviewer/add-submission-review';

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({
                    submissionId: submissionId,
                    originality: originality,
                    relationshipToLiterature: relationshipToLiterature,
                    methodology: methodology,
                    recommendation: recommendation
                })
            });

            if (!response.ok) {
                throw new Error(`Error submitting form: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(data);

        } catch (error) {
            setError(error.message);
            console.error(error);
        }
        handleOpen(); // Close the modal after confirmation
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleOpen(); // Open the confirmation modal
    };

    return (
        <>
            <div className="grid grid-cols-5 gap-8">
                <aside className="col-span-3">
                    <div className="sticky top-[100px] rounded">
                        {filename &&
                            <div className="flex justify-between font-bold text-lg mb-3" rel='as'>
                                {filename}
                                <a href={url} target='_blank' className='flex gap-2' >Open in new tab <LinkIcon className='w-4 w-4 font-bold' /> </a>
                            </div>
                        }
                        {
                            url && <iframe src={url} title={filename} width='100%' height='700px' />
                        }
                    </div>
                </aside >

                <form className='col-span-2' onSubmit={handleSubmit}>

                    {/* orginality */}
                    <div className="mb-5">
                        <label
                            htmlFor="originality"
                            className="mb-3 block text-base font-medium text-black"
                        >
                            1. Originality: Does the paper contain new and significant information adequate to justify publication?
                        </label>
                        <Textarea
                            label='Originality'
                            onChange={(e) => setOriginality(e.target.value)}
                            type="text"
                            name="originality"
                            id="originality"
                            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                        />
                    </div>


                    {/* reltionship to literature */}
                    <div className="mb-5">
                        <label
                            htmlFor='relationship-to-literature'
                            className="mb-3 block text-base font-medium text-black"
                        >
                            2. Relationship to Literature: Does the paper demonstrate an adequate understanding of the relevant literature in the field and cite an appropriate range of literature sources? Is any significant work ignored?
                        </label>
                        <Textarea
                            label='Relationship to Literature'
                            onChange={(e) => setRelationshipToLiterature(e.target.value)}
                            type="text"
                            name="relationshipToLiterature"
                            id="relationshipToLiterature"
                            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                        />
                    </div>


                    {/* methodology */}
                    <div className="mb-5">
                        <label
                            htmlFor='methodology'
                            className="mb-3 block text-base font-medium text-black"
                        >
                            3. Methodology: Is the paper's argument built on an appropriate base of theory, concepts, or other ideas? Has the research or equivalent intellectual work on which the paper is based been well designed? Are the methods employed appropriate?
                        </label>
                        <Textarea
                            label='Methodology'
                            onChange={(e) => setMethodology(e.target.value)}
                            type="text"
                            name="methodology"
                            id="methodology"
                            className="w-full rounded-md border border-gray-300 bg-white py-3 px-6 text-base font-medium text-black outline-none focus:border-black focus:shadow-md"
                        />
                    </div>


                    {/* recommendation */}
                    <div className="mb-5">
                        <label
                            htmlFor='relationship-to-literature'
                            className="mb-3 block text-base font-medium text-black"
                        >
                            Recommendation
                        </label>
                        <Radio onChange={(e) => setRecommendation(e.target.value)} name="recommendation" value="accept" label='Accept' /> <br />
                        <Radio onChange={(e) => setRecommendation(e.target.value)} name="recommendation" value="minor-revision" label='Minor Revision' /> <br />
                        <Radio onChange={(e) => setRecommendation(e.target.value)} name="recommendation" value="major-revision" label='Major Revision' /> <br />
                        <Radio onChange={(e) => setRecommendation(e.target.value)} name="recommendation" value="reject-resubmit" label='Reject and Resubmit' /> <br />
                        <Radio onChange={(e) => setRecommendation(e.target.value)} name="recommendation" value="reject" label='Reject' />
                    </div>
                    <div>
                        <Button type='submit' className="hover:shadow-form w-full rounded-md bg-black py-3 px-8 text-center text-base font-semibold text-white outline-none">
                            Add Review
                        </Button>
                    </div>
                </form>
            </div >
            {error && <p>Error: {error}</p>}
            <ConfirmationModal
                open={open}
                handleOpen={handleOpen}
                titleOfModal='Submit Review'
                message='Are you sure you want to submit this review?'
                actionOnConfirm={handleConfirm}
            />
        </>
    );
}

export default GivePaperFeedbackForm;