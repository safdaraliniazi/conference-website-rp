import { Button, Typography } from '@material-tailwind/react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { CalendarDaysIcon, UserGroupIcon, AcademicCapIcon } from '@heroicons/react/24/solid'

function JoinNow() {
    const features = [
        {
            icon: <CalendarDaysIcon className="h-6 w-6" />,
            title: "Two Days of Learning",
            description: "Intensive technical sessions and workshops"
        },
        {
            icon: <UserGroupIcon className="h-6 w-6" />,
            title: "Networking Opportunities",
            description: "Connect with industry experts and peers"
        },
        {
            icon: <AcademicCapIcon className="h-6 w-6" />,
            title: "Expert Speakers",
            description: "Learn from leading researchers and practitioners"
        }
    ]

    return (
        <section className="relative py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />

            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <Typography
                            variant="h6"
                            className="text-orange-500 font-semibold mb-2"
                        >
                            Join Us
                        </Typography>
                        <Typography
                            variant="h3"
                            className="text-gray-900 font-bold mb-4"
                        >
                            Be Part of IPDIMS 2024
                        </Typography>
                        <Typography
                            variant="lead"
                            className="text-gray-600 max-w-2xl mx-auto"
                        >
                            Experience an exceptional conference featuring cutting-edge research,
                            industry insights, and valuable networking opportunities.
                        </Typography>
                    </div>

                    {/* Features Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 w-full">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="p-2 rounded-lg bg-orange-100">
                                        {feature.icon}
                                    </div>
                                    <Typography variant="h6" className="text-gray-900">
                                        {feature.title}
                                    </Typography>
                                </div>
                                <Typography className="text-gray-600">
                                    {feature.description}
                                </Typography>
                            </div>
                        ))}
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 md:p-12 w-full max-w-4xl text-center relative overflow-hidden">
                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full opacity-10">
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                        </div>

                        <Typography
                            variant="h4"
                            className="text-white font-bold mb-4"
                        >
                            Ready to Join IPDIMS 2024?
                        </Typography>
                        <Typography
                            className="text-white/90 mb-8 max-w-2xl mx-auto"
                        >
                            Register now to secure your spot and be part of this prestigious conference.
                            Early bird registration discounts available!
                        </Typography>
                        <NavLink to="/registration">
                            <Button
                                size="lg"
                                className="bg-white text-orange-500 hover:bg-orange-50 transition-colors"
                            >
                                Register Now
                            </Button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default JoinNow