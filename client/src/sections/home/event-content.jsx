import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
  Typography,
} from "@material-tailwind/react";
import { DocumentTextIcon, BeakerIcon } from "@heroicons/react/24/solid";

const TRACKS = [
  {
    label: "Track 1",
    value: "track1",
    icon: DocumentTextIcon,
    title: "Innovative Product Design",
    topics: [
      "Computer Aided Design",
      "Design Aesthetics",
      "Design for Cost & Sustainability",
      "Design Creativity & Optimization",
      "Design for Sustainability",
      "Human Factors and Ergonomics in Design",
      "UX/UI Design",
      "Human Computer Interaction",
      "Materials Selection for Design",
    ],
  },
  {
    label: "Track 2",
    value: "track2",
    icon: BeakerIcon,
    title: "Intelligent Manufacturing Systems",
    topics: [
      "Artificial Intelligence in manufacturing processes",
      "Optimization and simulation",
      "Process planning and Scheduling",
      "Smart Manufacturing",
      "Virtual Manufacturing",
      "Robotics, Mechatronics & Automation",
      "Precision engineering and metrology",
      "Supply Chain Management",
      "CAD/CAM/CAE",
    ],
  },
];

export function EventContent() {
  return (
    <section className="relative py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent" />

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col items-center mb-16">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
            <DocumentTextIcon className="h-8 w-8 text-orange-500" />
          </div>
          <Typography variant="h6" className="text-center mb-2 text-orange-500 font-semibold">
            Call for Papers
          </Typography>
          <Typography variant="h3" className="text-center text-gray-900 font-bold mb-4">
            Conference Tracks
          </Typography>
          <Typography
            variant="lead"
            className="text-center text-gray-600 max-w-3xl mx-auto"
          >
            Technical papers are solicited on the topics pertaining to the scope of the conference will include, but are not limited to, the following:
          </Typography>
        </div>

        {/* Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs value="track1">
            <TabsHeader className="bg-orange-50 border-b border-orange-100">
              {TRACKS.map(({ label, value, icon: Icon }) => (
                <Tab key={value} value={value} className="w-full">
                  <div className="flex items-center justify-center gap-2 py-1">
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{label}</span>
                  </div>
                </Tab>
              ))}
            </TabsHeader>

            <TabsBody className="mt-8">
              {TRACKS.map(({ value, title, topics }) => (
                <TabPanel key={value} value={value} className="py-4">
                  <div className="bg-white rounded-xl p-8 shadow-md">
                    <Typography variant="h4" color="orange" className="font-bold mb-6 text-center">
                      {title}
                    </Typography>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {topics.map((topic, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-3 p-4 rounded-lg bg-orange-50/50 hover:bg-orange-50 transition-colors duration-300"
                        >
                          <div className="h-2 w-2 rounded-full bg-orange-500" />
                          <Typography className="font-medium text-gray-700">
                            {topic}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabPanel>
              ))}
            </TabsBody>
          </Tabs>
        </div>
      </div>
    </section>
  );
}

export default EventContent;
