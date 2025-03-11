import { Typography, Button } from "@material-tailwind/react";
import AboutCard from "./components/about-card";
import { Carousel } from "@material-tailwind/react";
import { InformationCircleIcon } from "@heroicons/react/24/solid";

const EVENT_INFO = [
  {
    title: "About NIT Rourkela",
    description:
      "NIT Rourkela is an institution of national importance with a reputation for excellence in research, consultancy, and education at the undergraduate, postgraduate, and doctoral levels. It is passionately committed to making our country a world leader in technology and science, and to inculcate this commitment among all its students. Our target is to be known worldwide for our academic standards and to be counted among the best technological institutes in India in terms of innovation, entrepreneurship, and intellectual wealth creation.",
    // subTitle: "Presentation",
  },
];

export function AboutEvent() {
  return (
    <section className="container mx-auto flex flex-col items-center px-4 py-16 bg-gray-50">
      {/* Header Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
          <InformationCircleIcon className="h-8 w-8 text-orange-500" />
        </div>
        <Typography variant="h6" className="text-center mb-2 text-orange-500 font-semibold">
          About
        </Typography>
        <Typography variant="h3" className="text-center text-gray-900 font-bold mb-6">
          IPDIMS 2024
        </Typography>
      </div>

      {/* Main Description */}
      <div className="max-w-4xl mx-auto mb-12">
        <Typography
          variant="lead"
          className="text-gray-600 leading-relaxed mb-8"
        >
          Product Design is the idea generation to commercialize the product by a systematic approach, conceptualize and evaluate ideas to create a product. The product designer's role is to combine art, science, and technology to create new products that people can use. Their evolving role has been facilitated by digital tools that now allow designers to communicate, visualize, analyze and produce tangible ideas in a way that would have taken greater man power in the past.
        </Typography>
        <Typography
          variant="lead"
          className="text-gray-600 leading-relaxed mb-8"
        >
          Smart Manufacturing is a broad category of manufacturing with the goal of optimizing concept generation, production, and product transaction. While manufacturing can be defined as the multi-phase process of creating a product out of raw materials, smart manufacturing is a subset that employs computer control and high levels of adaptability.
        </Typography>
        <Typography
          variant="lead"
          className="text-gray-600 leading-relaxed"
        >
          The theme IPDIMS-24 discusses the current issues that are facing in industries. This conference covers a wide range of fields like Computer Science, Electronics, Electrical, Automation, Robotics, 3D Printing, Smart Manufacturing, Mechatronics, Composite Materials and many more. The research related to all fields of engineering likely to be covered in this conference. Experts from industries and academia deliver the keynote lecture at this conference.
        </Typography>
      </div>

      {/* Publication Notice */}
      <div className="w-full max-w-4xl mx-auto p-6 bg-orange-50 rounded-xl mb-12">
        <Typography
          variant="paragraph"
          className="text-center text-orange-900 font-medium"
        >
          Select papers from the conference will be published by Springer as a proceedings book volume. Springer will conduct quality checks on the accepted papers and only papers that pass these checks will be published.
        </Typography>
      </div>

      {/* Cards and Carousel Section */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        {EVENT_INFO.map((props, idx) => (
          <div key={idx} className="transform transition-all duration-300 hover:scale-[1.02]">
            <AboutCard {...props} />
          </div>
        ))}

        <div className="h-[400px] transform transition-all duration-300 hover:scale-[1.02]">
          <Carousel
            className="rounded-xl h-full"
            navigation={({ setActiveIndex, activeIndex, length }) => (
              <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                {new Array(length).fill("").map((_, i) => (
                  <span
                    key={i}
                    className={`block h-2 w-2 cursor-pointer rounded-full transition-all ${activeIndex === i ? "bg-orange-500 w-8" : "bg-orange-300"
                      }`}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            )}
          >
            <img
              src="/images/past_ipdims/DSC_0006.JPG"
              alt="Past IPDIMS Conference"
              className="h-full w-full object-cover"
            />
            <img
              src="/images/past_ipdims/DSC_0129.JPG"
              alt="Past IPDIMS Event"
              className="h-full w-full object-cover"
            />
            <img
              src="/images/past_ipdims/DSC_0213.JPG"
              alt="IPDIMS Conference Highlights"
              className="h-full w-full object-cover"
            />
          </Carousel>
        </div>

        <div className="md:col-span-2 transform transition-all duration-300 hover:scale-[1.02]">
          <AboutCard
            title="About Industrial Design Department"
            description="Industrial Design involves designing of products of daily life such as mobile phones, cars, home interiors, furniture, home decor, packaging and branding, and so on in such a way so that it makes the modern human life easy and more pleasurable. The field also includes designing of workplaces and tools/equipment in industries to make them safer and more user friendly. The present-day academic activities of Industrial Design are very broad with this due reason. Department of Industrial Design at National Institute of Technology Rourkela was established in 2010 to flourish in the emerging areas of design fields. The Industrial Design department at NIT Rourkela has specialized faculties in all important areas of industrial design such as product design, ergonomics & UX/UI."
          />
        </div>
      </div>

      {/* Call to Action */}
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

export default AboutEvent;
