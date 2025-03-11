import { Button, Typography } from "@material-tailwind/react";
import { CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/solid";

function Hero() {
  return (
    <div className="relative min-h-screen w-full">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={process.env.PUBLIC_URL + "/images/event.jpg"}
          alt="Conference Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen px-8">
        <div className="container mx-auto grid min-h-screen place-items-center text-center">
          <div>
            <div className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 mb-6">
              <Typography variant="small" color="white" className="font-medium opacity-80">
                6th International Conference
              </Typography>
            </div>

            <Typography variant="h1" color="white" className="mb-4 lg:max-w-3xl font-bold text-5xl lg:text-6xl">
              IPDIMS 2024
            </Typography>

            <Typography
              variant="lead"
              color="white"
              className="mb-8 w-full md:max-w-full lg:max-w-2xl text-xl opacity-80"
            >
              Innovative Product Design and Intelligent Manufacturing Systems
            </Typography>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <CalendarDaysIcon className="h-5 w-5 text-orange-500" />
                <Typography color="white" className="font-medium">
                  4th & 5th December 2024
                </Typography>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2">
                <MapPinIcon className="h-5 w-5 text-orange-500" />
                <Typography color="white" className="font-medium">
                  NIT Rourkela, India
                </Typography>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="filled"
                color="orange"
                size="lg"
                className="rounded-full px-6"
                href="/submission"
              >
                Submit Paper
              </Button>
              <Button
                variant="outlined"
                color="white"
                size="lg"
                className="rounded-full px-6"
                href="/important-dates"
              >
                Important Dates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
