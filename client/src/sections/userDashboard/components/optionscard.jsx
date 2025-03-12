import React from 'react';
import { Typography, Card, CardBody, CardHeader } from '@material-tailwind/react';
import { NavLink } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

function OptionsCard({ category }) {
    return (
        <Card className="group relative overflow-hidden bg-white hover:shadow-lg transition-all duration-300">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

            <CardHeader
                floated={false}
                className="relative h-56 bg-gradient-to-br from-orange-500/10 to-orange-600/10"
            >
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 rounded-full bg-orange-100 group-hover:bg-orange-200 transition-colors duration-300">
                        <svg
                            className="w-8 h-8 text-orange-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                            />
                        </svg>
                    </div>
                </div>
            </CardHeader>

            <CardBody className="relative">
                <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-2 font-bold group-hover:text-orange-500 transition-colors duration-300"
                >
                    {category.title}
                </Typography>
                <Typography
                    variant="small"
                    color="gray"
                    className="mb-4 line-clamp-3"
                >
                    {category.description}
                </Typography>
                <NavLink
                    to={category.href}
                    className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium transition-colors duration-300"
                >
                    View Details
                    <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </NavLink>
            </CardBody>
        </Card>
    );
}

export default OptionsCard;
