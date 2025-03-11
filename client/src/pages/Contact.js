import React, { useState } from "react";
import {
	Typography,
	Card,
	CardBody,
	Button,
	Input,
	Textarea,
	Tabs,
	TabsHeader,
	TabsBody,
	Tab,
	TabPanel,
	Chip,
} from "@material-tailwind/react";
import PageWrapper from "../components/page-wrapper";
import {
	PhoneIcon,
	EnvelopeIcon,
	MapPinIcon,
	UserIcon,
	BuildingOfficeIcon,
	AcademicCapIcon,
	ChatBubbleLeftRightIcon,
	ArrowLongRightIcon,
} from "@heroicons/react/24/solid";
import API_BASE_URL from "../config/api";

const CONTACT_METHODS = [
	{
		icon: PhoneIcon,
		title: "Phone Support",
		description: "Available during conference hours",
		info: "+91-661-2462855",
		color: "orange",
	},
	{
		icon: EnvelopeIcon,
		title: "Email Support",
		description: "Get response within 24 hours",
		info: "ipdims@nitrkl.ac.in",
		color: "blue",
	},
	{
		icon: MapPinIcon,
		title: "Visit Us",
		description: "Department of Industrial Design",
		info: "NIT Rourkela, Odisha-769008",
		color: "green",
	},
];

const CONTACTS = [
	{
		name: 'Prof. BBVL Deepak',
		title: 'Convener, IPDIMS',
		position: 'Associate Professor',
		department: 'Department of Industrial Design',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462855(o)',
		email: 'deepak@nitrkl.ac.in',
		color: 'orange',
	},
	{
		name: 'Prof. Dayal R Parhi',
		title: 'Chairman, IPDIMS',
		position: 'Professor (HAG)',
		department: 'Department of Mechanical Engineering',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462514(o)',
		email: 'parhi@nitrkl.ac.in',
		color: 'blue',
	},
	{
		name: 'Prof. Mohit Lal',
		title: 'Coordinator, IPDIMS',
		position: 'Assistant Professor',
		department: 'Department of Industrial Design',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462856 (o)',
		email: 'mohit@nitrkl.ac.in',
		color: 'green',
	},
	{
		name: 'Prof. Dibya P Jean',
		title: 'Coordinator, IPDIMS',
		position: 'Associate Professor & Head of the Department',
		department: 'Department of Industrial Design',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462855 (o)',
		email: 'dpjena@nitrkl.ac.in',
		color: 'orange',
	}
];

const Contact = () => {
	const [activeTab, setActiveTab] = useState("contact");
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		message: '',
	});
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData(prev => ({
			...prev,
			[name]: value
		}));
		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prev => ({
				...prev,
				[name]: ''
			}));
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { firstName, lastName, email, message } = formData;

		const newErrors = {};
		if (!firstName) newErrors.firstName = 'First name is required';
		if (!lastName) newErrors.lastName = 'Last name is required';
		if (!email) {
			newErrors.email = 'Email is required';
		} else if (!validateEmail(email)) {
			newErrors.email = 'Email is not valid';
		}
		if (!message) newErrors.message = 'Message is required';

		if (Object.keys(newErrors).length > 0) {
			setErrors(newErrors);
			return;
		}

		try {
			const response = await fetch(`${API_BASE_URL}/api/general/contact-us-mail`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(formData)
			});

			if (response.ok) {
				alert('Message sent successfully!');
				setFormData({
					firstName: '',
					lastName: '',
					email: '',
					message: ''
				});
				setErrors({});
			} else {
				alert('Failed to send message.');
			}
		} catch (error) {
			console.error('Error:', error);
			alert('An error occurred while sending the message.');
		}
	};

	return (
		<PageWrapper>
			<div className="text-center mb-12">
				<Typography
					variant="h6"
					color="orange"
					className="mb-2"
				>
					Get in Touch
				</Typography>
				<Typography
					variant="h2"
					color="blue-gray"
					className="mb-4"
				>
					Contact Us
				</Typography>
				<Typography
					className="mx-auto max-w-3xl !text-gray-500"
					variant="lead"
				>
					Have questions about IPDIMS 2024? Our team is here to help you with any inquiries.
				</Typography>
			</div>

			{/* Quick Contact Methods */}
			<div className="grid gap-6 md:grid-cols-3 mb-12">
				{CONTACT_METHODS.map((method, index) => (
					<Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
						<CardBody className="p-6">
							<div className="flex items-center gap-4">
								<span className={`p-3 rounded-full bg-${method.color}-50`}>
									<method.icon className={`h-6 w-6 text-${method.color}-500`} />
								</span>
								<div>
									<Typography variant="h6" color="blue-gray">
										{method.title}
									</Typography>
									<Typography variant="small" className="font-normal text-gray-600">
										{method.description}
										<br />
										{method.info}
									</Typography>
								</div>
							</div>
						</CardBody>
					</Card>
				))}
			</div>

			{/* Main Content */}
			<Card className="w-full">
				<CardBody className="p-6">
					<Tabs value={activeTab} className="overflow-visible">
						<TabsHeader className="relative z-0 mb-8">
							<Tab value="contact" onClick={() => setActiveTab("contact")}>
								<div className="flex items-center gap-2">
									<ChatBubbleLeftRightIcon className="w-5 h-5" />
									Contact Form
								</div>
							</Tab>
							<Tab value="team" onClick={() => setActiveTab("team")}>
								<div className="flex items-center gap-2">
									<UserIcon className="w-5 h-5" />
									Contact Team
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
							<TabPanel value="contact" className="p-0">
								<Card className="p-6 bg-gray-50">
									<form onSubmit={handleSubmit} className="space-y-6">
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<Typography variant="small" color="blue-gray" className="mb-2 font-medium">
													First Name
												</Typography>
												<Input
													type="text"
													placeholder="John"
													name="firstName"
													value={formData.firstName}
													onChange={handleInputChange}
													className="!border-gray-200 focus:!border-orange-500"
													labelProps={{
														className: "hidden",
													}}
													containerProps={{ className: "min-w-[100px]" }}
												/>
												{errors.firstName && (
													<Typography variant="small" color="red" className="mt-1">
														{errors.firstName}
													</Typography>
												)}
											</div>
											<div>
												<Typography variant="small" color="blue-gray" className="mb-2 font-medium">
													Last Name
												</Typography>
												<Input
													type="text"
													placeholder="Doe"
													name="lastName"
													value={formData.lastName}
													onChange={handleInputChange}
													className="!border-gray-200 focus:!border-orange-500"
													labelProps={{
														className: "hidden",
													}}
													containerProps={{ className: "min-w-[100px]" }}
												/>
												{errors.lastName && (
													<Typography variant="small" color="red" className="mt-1">
														{errors.lastName}
													</Typography>
												)}
											</div>
										</div>
										<div>
											<Typography variant="small" color="blue-gray" className="mb-2 font-medium">
												Email Address
											</Typography>
											<Input
												type="email"
												placeholder="johndoe@example.com"
												name="email"
												value={formData.email}
												onChange={handleInputChange}
												className="!border-gray-200 focus:!border-orange-500"
												labelProps={{
													className: "hidden",
												}}
												containerProps={{ className: "min-w-[100px]" }}
											/>
											{errors.email && (
												<Typography variant="small" color="red" className="mt-1">
													{errors.email}
												</Typography>
											)}
										</div>
										<div>
											<Typography variant="small" color="blue-gray" className="mb-2 font-medium">
												Message
											</Typography>
											<Textarea
												placeholder="Your message here..."
												name="message"
												value={formData.message}
												onChange={handleInputChange}
												className="!border-gray-200 focus:!border-orange-500"
												labelProps={{
													className: "hidden",
												}}
												containerProps={{ className: "min-w-[100px]" }}
											/>
											{errors.message && (
												<Typography variant="small" color="red" className="mt-1">
													{errors.message}
												</Typography>
											)}
										</div>
										<Button
											type="submit"
											color="orange"
											className="w-full flex items-center justify-center gap-2"
											size="lg"
										>
											Send Message
											<ArrowLongRightIcon strokeWidth={2} className="h-5 w-5" />
										</Button>
									</form>
								</Card>
							</TabPanel>

							<TabPanel value="team" className="p-0">
								<div className="grid gap-6 lg:grid-cols-2">
									{CONTACTS.map((contact, index) => (
										<Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
											<CardBody className="p-6">
												<div className="flex items-center gap-4 mb-4">
													<span className={`p-3 rounded-full bg-${contact.color}-50`}>
														<AcademicCapIcon className={`h-6 w-6 text-${contact.color}-500`} />
													</span>
													<div>
														<Typography variant="h5" color="blue-gray">
															{contact.name}
														</Typography>
														<Chip
															value={contact.title}
															variant="ghost"
															size="sm"
															color={contact.color}
															className="mt-1"
														/>
													</div>
												</div>
												<div className="space-y-3">
													<div className="flex items-center gap-2">
														<BuildingOfficeIcon className={`h-5 w-5 text-${contact.color}-500`} />
														<Typography className="font-normal text-gray-600">
															{contact.position}
														</Typography>
													</div>
													<div className="flex items-center gap-2">
														<MapPinIcon className={`h-5 w-5 text-${contact.color}-500`} />
														<Typography className="font-normal text-gray-600">
															{contact.department}
														</Typography>
													</div>
													<div className="flex items-center gap-2">
														<PhoneIcon className={`h-5 w-5 text-${contact.color}-500`} />
														<Typography className="font-normal text-gray-600">
															{contact.phone}
														</Typography>
													</div>
													<div className="flex items-center gap-2">
														<EnvelopeIcon className={`h-5 w-5 text-${contact.color}-500`} />
														<Typography className="font-normal text-gray-600">
															{contact.email}
														</Typography>
													</div>
												</div>
											</CardBody>
										</Card>
									))}
								</div>
							</TabPanel>
						</TabsBody>
					</Tabs>
				</CardBody>
			</Card>

			{/* Call to Action */}
			<Card className="mt-12 bg-blue-gray-50">
				<CardBody className="p-6">
					<div className="flex flex-col md:flex-row items-center justify-between gap-4">
						<div>
							<Typography variant="h5" color="blue-gray" className="mb-2">
								Need Immediate Assistance?
							</Typography>
							<Typography className="font-normal text-gray-600">
								Our team is available during conference hours for urgent inquiries
							</Typography>
						</div>
						<div className="flex gap-4">
							<Button color="orange" className="flex items-center gap-2">
								Call Support
								<PhoneIcon className="h-4 w-4" />
							</Button>
							<Button variant="outlined" color="blue-gray" className="flex items-center gap-2">
								Send Email
								<EnvelopeIcon className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</CardBody>
			</Card>
		</PageWrapper>
	);
};

export default Contact;