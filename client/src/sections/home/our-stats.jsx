"use client";
import { Typography } from "@material-tailwind/react";
import StatsCard from "./components/stats-card";
import { ChartBarIcon } from "@heroicons/react/24/solid";

const STATS = [
  {
    count: "1,500+",
    title: "Participants",
    description: "Global attendees from academia and industry",
  },
  {
    count: "50",
    title: "Speakers",
    description: "Expert speakers and industry leaders",
  },
  {
    count: "20+",
    title: "Workshops",
    description: "Interactive sessions and hands-on learning",
  },
  {
    count: "3",
    title: "Days",
    description: "Of knowledge sharing and networking",
  },
];

export function OurStats() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
            <ChartBarIcon className="h-8 w-8 text-orange-500" />
          </div>
          <Typography variant="h6" className="text-center mb-2 text-orange-500 font-semibold">
            Our Stats
          </Typography>
          <Typography variant="h3" className="text-center text-gray-900 font-bold mb-4">
            Conference Highlights
          </Typography>
          <Typography
            variant="lead"
            className="text-center text-gray-600 max-w-2xl mx-auto"
          >
            This three-day extravaganza brings together the brightest minds,
            leading innovators, and top companies in the field of Artificial
            Intelligence.
          </Typography>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {STATS.map((props, key) => (
            <div
              key={key}
              className="transform transition-all duration-300 hover:scale-105"
            >
              <StatsCard {...props} />
            </div>
          ))}
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-orange-300" />
      </div>
    </section>
  );
}

export default OurStats;