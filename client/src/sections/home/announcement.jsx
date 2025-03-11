import { Typography, Button } from "@material-tailwind/react";
import AnnouncementsCard from "./components/announcements-card";
import PastEventsCard from "./components/pastevents-card";
import { BookOpenIcon } from "@heroicons/react/24/solid";

export function Announcements() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-16 my-10">
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
          <BookOpenIcon className="h-8 w-8 text-orange-500" />
        </div>
        <Typography variant="h6" className="text-center mb-2 text-orange-500 font-semibold">
          Publication
        </Typography>
        <Typography variant="h3" className="text-center text-gray-900 font-bold">
          Springer Proceedings
        </Typography>
      </div>

      <div className="max-w-3xl mx-auto text-center mb-12">
        <Typography
          variant="lead"
          className="text-gray-600 leading-relaxed"
        >
          Select papers from the conference will be published by Springer as a proceedings book volume. Springer will conduct quality checks on the accepted papers and only papers that pass these checks will be published.
        </Typography>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <AnnouncementsCard />
        </div>
        <div className="transform transition-all duration-300 hover:scale-[1.02]">
          <PastEventsCard />
        </div>
      </div>

      <div className="mt-12 text-center">
        <Button
          color="orange"
          size="lg"
          className="rounded-full px-8"
          href="/submission"
        >
          Submit Your Paper
        </Button>
      </div>
    </section>
  );
}

export default Announcements;
