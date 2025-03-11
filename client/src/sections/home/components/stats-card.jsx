import { Typography } from "@material-tailwind/react";

export function StatsCard({ count, title, description }) {
  return (
    <div className="relative bg-white rounded-xl p-6 shadow-md overflow-hidden group">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-white opacity-0 group-hover:opacity-50 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative">
        <Typography
          variant="h2"
          className="text-4xl font-bold text-orange-500 mb-2"
        >
          {count}
        </Typography>

        <Typography
          variant="h6"
          className="font-semibold text-gray-900 mb-2"
        >
          {title}
        </Typography>

        <Typography
          variant="small"
          className="text-gray-600"
        >
          {description}
        </Typography>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
    </div>
  );
}

export default StatsCard;
