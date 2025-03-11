import React from 'react';
import {
    Card,
    CardBody,
    Typography,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineIcon,
    TimelineBody,
} from "@material-tailwind/react";
import PageWrapper from '../components/page-wrapper';
import { DocumentTextIcon, ExclamationTriangleIcon, DocumentCheckIcon, ClockIcon } from "@heroicons/react/24/solid";

const SUBMISSION_STEPS = [
    {
        title: "Register on the Website",
        description: "Create an account on the conference website to access the submission portal.",
    },
    {
        title: "Prepare Your Manuscript",
        description: "Follow the Springer format guidelines and ensure your paper meets all requirements.",
    },
    {
        title: "Submit via Portal",
        description: "Upload your paper through the submission system along with required metadata.",
    },
    {
        title: "Track Your Submission",
        description: "Monitor the status of your paper through your dashboard.",
    },
];

function Submission() {
    const [activeTab, setActiveTab] = React.useState("guidelines");

    return (
        <PageWrapper>
            <div className="text-center mb-12">
                <Typography
                    variant="h6"
                    color="orange"
                    className="mb-2"
                >
                    Paper Submission
                </Typography>
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4"
                >
                    Submit Your Research
                </Typography>
                <Typography
                    className="mx-auto max-w-3xl !text-gray-500"
                    variant="lead"
                >
                    Share your innovative research with the academic community. Follow our submission guidelines to ensure your paper meets all requirements.
                </Typography>
            </div>

            {/* Submission Process Timeline */}
            <div className="mb-12 px-4 md:px-8">
                <Timeline>
                    {SUBMISSION_STEPS.map((step, index) => (
                        <TimelineItem key={index}>
                            {index !== SUBMISSION_STEPS.length - 1 && <TimelineConnector />}
                            <TimelineHeader>
                                <TimelineIcon className="p-2">
                                    <ClockIcon className="h-4 w-4" />
                                </TimelineIcon>
                                <Typography variant="h5" color="blue-gray">
                                    {step.title}
                                </Typography>
                            </TimelineHeader>
                            <TimelineBody className="pb-8">
                                <Typography color="gray" className="font-normal text-gray-600">
                                    {step.description}
                                </Typography>
                            </TimelineBody>
                        </TimelineItem>
                    ))}
                </Timeline>
            </div>

            {/* Main Content Tabs */}
            <div className="w-full">
                <Tabs value={activeTab} className="overflow-visible">
                    <TabsHeader className="relative z-0 mb-8">
                        <Tab value="guidelines" onClick={() => setActiveTab("guidelines")}>
                            <div className="flex items-center gap-2">
                                <DocumentTextIcon className="w-5 h-5" />
                                Submission Guidelines
                            </div>
                        </Tab>
                        <Tab value="format" onClick={() => setActiveTab("format")}>
                            <div className="flex items-center gap-2">
                                <DocumentCheckIcon className="w-5 h-5" />
                                Format Requirements
                            </div>
                        </Tab>
                        <Tab value="policy" onClick={() => setActiveTab("policy")}>
                            <div className="flex items-center gap-2">
                                <ExclamationTriangleIcon className="w-5 h-5" />
                                Plagiarism Policy
                            </div>
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}
                        className="overflow-visible"
                    >
                        <TabPanel value="guidelines" className="p-0">
                            <Card className="mt-6 w-full">
                                <CardBody className="p-6">
                                    <Typography variant="h4" color="blue-gray" className="mb-4">
                                        Submission Guidelines
                                    </Typography>
                                    <Typography className="mb-4 text-justify font-normal text-gray-600">
                                        Prospective authors from India are invited to submit manuscripts reporting original, unpublished research and recent developments in the topics related to the conference. Submissions must include title, abstract, author affiliation with email address and keywords as per template.
                                    </Typography>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                        <li>Papers should be 6-8 pages in length</li>
                                        <li>All papers must be original and not simultaneously submitted elsewhere</li>
                                        <li>At least one author must register for the conference</li>
                                        <li>Similarity index must be less than 15% (checked via Turnitin)</li>
                                    </ul>
                                    <Button className="mt-6" color="orange">
                                        Download Template
                                    </Button>
                                </CardBody>
                            </Card>
                        </TabPanel>
                        <TabPanel value="format" className="p-0">
                            <Card className="mt-6 w-full">
                                <CardBody className="p-6">
                                    <Typography variant="h4" color="blue-gray" className="mb-4">
                                        Format Requirements
                                    </Typography>
                                    <Typography className="mb-4 font-normal text-gray-600">
                                        Papers must follow the Springer conference proceedings format:
                                    </Typography>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                        <li>Use the provided LaTeX or Word template</li>
                                        <li>Paper size: A4 (210 × 297 mm)</li>
                                        <li>Margins: 2.5 cm on all sides</li>
                                        <li>Font: Times New Roman</li>
                                        <li>Title: 14pt, bold</li>
                                        <li>Author names: 11pt</li>
                                        <li>Main text: 10pt</li>
                                        <li>High-quality figures and tables</li>
                                        <li>References in IEEE format</li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </TabPanel>
                        <TabPanel value="policy" className="p-0">
                            <Card className="mt-6 w-full">
                                <CardBody className="p-6">
                                    <Typography variant="h4" color="blue-gray" className="mb-4">
                                        Policy on Plagiarism
                                    </Typography>
                                    <Typography className="mb-4 font-normal text-gray-600">
                                        We maintain a strict policy against plagiarism to ensure the originality and integrity of all published work.
                                    </Typography>
                                    <ul className="list-disc pl-6 space-y-2 text-gray-600">
                                        <li>Authors must submit original and unpublished research work</li>
                                        <li>Papers must not be under consideration for publication elsewhere</li>
                                        <li>All papers undergo plagiarism check using Turnitin software</li>
                                        <li>Maximum acceptable similarity index is 15%</li>
                                        <li>Papers found to be plagiarized at any stage will be rejected</li>
                                        <li>Authors are collectively responsible for the content of their manuscript</li>
                                    </ul>
                                </CardBody>
                            </Card>
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
                <Button size="lg" color="orange" className="mx-2">
                    Submit Your Paper
                </Button>
                <Button size="lg" variant="outlined" color="blue-gray" className="mx-2">
                    Contact Support
                </Button>
            </div>
        </PageWrapper>
    );
}

export default Submission;