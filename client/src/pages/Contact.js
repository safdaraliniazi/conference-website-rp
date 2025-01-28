import React, { useState } from "react";
import { Typography } from "@material-tailwind/react";
import PageWrapper from "../components/page-wrapper";

const contacts = [
	{
		name: 'Prof. BBVL Deepak',
		title: 'Convener, IPDIMS',
		position: 'Associate Professor',
		department: 'Department of Industrial Design',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462855(o)'
	},
	{
		name: 'Prof. Dayal R Parhi',
		title: 'Chairman, IPDIMS',
		position: 'Professor (HAG)',
		department: 'Department of Mechanical Engineering',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462514(o)'
	},
	{
		name: 'Prof. Mohit Lal',
		title: 'Coordinator, IPDIMS',
		position: 'Assistant Professor',
		department: 'Department of Industrial Design',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462856 (o)'
	},
	{
		name: 'Prof. Dibya P Jean',
		title: 'Coordinator, IPDIMS',
		position: 'Associate Professor & Head of the Department',
		department: 'Department of Industrial Design',
		institution: 'National Institute of Technology, Rourkela',
		phone: 'Tel. 0661 2462855 (o)'
	}
];

const Contact = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [message, setMessage] = useState('');
	const [errors, setErrors] = useState({});

	const validateEmail = (email) => {
		const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(String(email).toLowerCase());
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

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

		const contactData = {
			firstName,
			lastName,
			email,
			message
		};

		try {
			const response = await fetch('https://conference-website-rp.onrender.com/api/general/contact-us-mail', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(contactData)
			});

			if (response.ok) {
				alert('Message sent successfully!');
				// Clear the form fields
				setFirstName('');
				setLastName('');
				setEmail('');
				setMessage('');
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
		<>
			<PageWrapper containerClassName="text-center">
				<Typography
					variant="h5"
					color="blue-gray"
					className="mb-4 !text-base lg:!text-2xl text-center"
				>
					Customer Care
				</Typography>
				<Typography
					variant="h1"
					color="blue-gray"
					className="mb-4 !text-3xl lg:!text-5xl text-center"
				>
					We&apos;re Here to Help
				</Typography>
				<Typography className="font-normal !text-lg lg:mb-20 mx-auto max-w-3xl !text-gray-500 text-center">
					Whether it&apos;s a question about our services, a request for
					technical assistance, or suggestions for improvement, our team is
					eager to hear from you.
				</Typography>
				<section className="bg-white dark:bg-gray-900">
					<div className="container px-6 mx-auto">
						<div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
							<div className="grid grid-cols-1 gap-12 md:grid-cols-2">
								{contacts.map((contact, index) => (
									<div key={index} className="mb-8">
										<h2 className="mt-4 text-base font-medium text-gray-800 dark:text-white">{contact.name}</h2>
										<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{contact.title}</p>
										<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{contact.position}</p>
										<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{contact.department}</p>
										<p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{contact.institution}</p>
										<p className="mt-2 text-sm text-blue-500 dark:text-blue-400">{contact.phone}</p>
									</div>
								))}
							</div>

							<div className="p-4 py-6 rounded-lg bg-gray-50 dark:bg-gray-800 md:p-8">
								<form onSubmit={handleSubmit}>
									<div className="-mx-2 md:items-center md:flex">
										<div className="flex-1 px-2">
											<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">First Name</label>
											<input
												type="text"
												placeholder="John"
												value={firstName}
												onChange={(e) => setFirstName(e.target.value)}
												className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
											{errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
										</div>

										<div className="flex-1 px-2 mt-4 md:mt-0">
											<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Last Name</label>
											<input
												type="text"
												placeholder="Doe"
												value={lastName}
												onChange={(e) => setLastName(e.target.value)}
												className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											/>
											{errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
										</div>
									</div>

									<div className="mt-4">
										<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
										<input
											type="email"
											placeholder="johndoe@example.com"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											className="block w-full px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
										/>
										{errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
									</div>

									<div className="w-full mt-4">
										<label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Message</label>
										<textarea
											className="block w-full h-32 px-5 py-2.5 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg md:h-56 dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
											placeholder="Message"
											value={message}
											onChange={(e) => setMessage(e.target.value)}
										></textarea>
										{errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
									</div>

									<button className="w-full px-6 py-3 mt-4 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
										Send message
									</button>
								</form>
							</div>
						</div>
					</div>
				</section>
			</PageWrapper>
		</>
	);
};

export default Contact;