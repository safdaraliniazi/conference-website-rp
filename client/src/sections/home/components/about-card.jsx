import { Typography } from "@material-tailwind/react";
import { BuildingOfficeIcon } from "@heroicons/react/24/solid";

export function AboutCard({ title, description }) {
  return (
    <div className="relative h-full bg-white rounded-xl shadow-md overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white opacity-50" />

      {/* Content */}
      <div className="relative p-8">
        {/* Icon */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-100 mb-6">
          <BuildingOfficeIcon className="h-6 w-6 text-orange-500" />
        </div>

        {/* Title */}
        <Typography
          variant="h5"
          className="text-gray-900 font-bold mb-4"
        >
          {title}
        </Typography>

        {/* Description */}
        <Typography
          variant="paragraph"
          className="text-gray-600 leading-relaxed"
        >
          {description}
        </Typography>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
    </div>
  );
}

export default AboutCard;
