import React from 'react';
import {
  Typography,
  Card,
  CardBody,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Avatar,
} from "@material-tailwind/react";
import { UserGroupIcon, AcademicCapIcon, BuildingLibraryIcon, GlobeAsiaAustraliaIcon } from "@heroicons/react/24/solid";
import PageWrapper from "../components/page-wrapper";

const CORE_TEAM = [
  {
    name: "Prof. K Umamaheswar Rao",
    role: "Patron",
    description: "Director, National Institute of Technology, Rourkela",
    image: "/images/profs/Prof. K Umamaheswar.jpeg"
  },
  {
    name: "Prof. B B Biswal",
    role: "Program Chair",
    description: "Vice Chancellor, Odisha University of Technology and Research, Bhubaneswar",
    image: "/images/profs/Prof. B B biswal.jpeg",
  },
  {
    name: "Prof. D R K Parhi",
    role: "Chairman",
    description: "Dept. of Mechanical Engineering, National Institute of Technology, Rourkela",
    image: "/images/profs/Prof. Parhi.jpg",
  },
  {
    name: "Prof. B B V L Deepak",
    role: "Convener",
    description: "Dept. of Industrial Design, National Institute of Technology, Rourkela",
    image: "/images/profs/Prof. Deepak.jpg",
  },
  {
    name: "Prof. Dibya P Jena",
    role: "Coordinator",
    description: "Dept. of Industrial Design, National Institute of Technology, Rourkela",
    image: "/images/profs/Prof. D P Jena.jpg",
  },
  {
    name: "Prof. Mohit Lal",
    role: "Coordinator",
    description: "Dept. of Industrial Design, National Institute of Technology, Rourkela",
    image: "/images/profs/prof. M Lal.jpg",
  },
];

const LOCAL_COMMITTEE = [
  "Prof. S Murugan, National Institute of Technology, Rourkela, India",
  "Prof. J Srinivas, National Institute of Technology, Rourkela, India",
  "Prof. U C Pati, National Institute of Technology, Rourkela, India",
  "Prof. M R khan, National Institute of Technology, Rourkela, India",
  "Prof. S Gopalkrishna, National Institute of Technology, Rourkela, India",
  "Prof. S Kar, National Institute of Technology, Rourkela, India",
  "Prof. S K Das, National Institute of Technology, Rourkela, India",
  "Prof. S Susovan, National Institute of Technology, Rourkela, India",
  "Prof. P S Balaji, National Institute of Technology, Rourkela, India",
  "Prof. K Naik, National Institute of Technology, Rourkela, India",
  "Prof. S Heramith, National Institute of Technology, Rourkela, India",
];

const NATIONAL_ADVISORY = [
  "Prof. Amarendra Kr. Das, Indian Institute of Technology, Guwahati, India",
  "Prof. Dilip Kr. Pratihar, Indian Institute of Technology, Khargpur, India",
  "Prof. Debkumar Chakrabarti, Indian Institute of Technology, Guwahati, India",
  "Prof. J. Ramkumar, Indian Institute of Technology, Kanpur, India",
  "Prof. Abhishek Singh, Indian Institute of Technology, Guwahati, India",
  "Prof. Sarkar Sagar, Indian Institute of Technology, Delhi, India",
  "Prof. Sharmistha Banerjee, Indian Institute of Technology, Guwahati, India",
  "Prof. Sandip Ghosh, Indian Institute of Technology (BHU), Varanasi",
  "Prof. Amitesh Kumar, Indian Institute of Technology (BHU), Varanasi",
  "Prof. Soumya Gangopadhyay, Indian Institute of Technology, Bhilai",
  // ... rest of the national advisory board members
];

const INTERNATIONAL_ADVISORY = [
  "Prof. P N Rao, University of Northern Iowa, U.S",
  "Prof. Satyandra K. Gupta, University of Southern California, Los Angeles, California",
  "Prof. Prasad KDV Yarlagadda, Queensland University of Technology, Australia",
  "Prof. Immanuel Edinbarough, University Of Texas Rio Grande Valley, Texas, USA.",
  "Prof. Dimitris Drikakis, University of Nicosia, UK",
  "Dr. Harshika Singh, Politecnico di Milano, Milano Bovisa - Via La Masa, ITALY",
  "Prof. Dražan Kozak, University of Slavonski Brod, Croatia",
  "Prof. Elbrus CAFEROV, Istanbul Technical University, Turkey",
  "Prof. Elena Scutelnicu, Dunărea de Jos, University of Galaţi, Romania",
  "Prof. Carlos F. Rodriguez, Universidad de los Andes, Colombia",
  "Prof. Anand Amrit, Dura Automotive System, Auburn Hills, Michigan, USA",
  "Prof. Aezeden Mohamed, UNITECH university, Papua New Guinea",
  "Prof. Mohammad T. Khasawneh, Binghamton University, New York",
];

function Committee() {
  const [activeTab, setActiveTab] = React.useState("core");

  return (
    <PageWrapper>
      <div className="text-center mb-12">
        <Typography
          variant="h6"
          color="orange"
          className="mb-2"
        >
          Conference Committee
        </Typography>
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-4"
        >
          Meet Our Team
        </Typography>
        <Typography
          className="mx-auto max-w-3xl !text-gray-500"
          variant="lead"
        >
          Distinguished academicians and researchers leading IPDIMS 2024
        </Typography>
      </div>

      {/* Core Team Grid */}
      <div className="mb-12">
        <Typography variant="h4" color="blue-gray" className="mb-6">
          Core Committee
        </Typography>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CORE_TEAM.map((member, index) => (
            <Card key={index} className="overflow-hidden">
              <CardBody className="p-4">
                <div className="flex items-center gap-4">
                  <Avatar
                    size="xxl"
                    variant="circular"
                    src={member.image}
                    alt={member.name}
                    className="border-2 border-orange-500"
                  />
                  <div>
                    <Typography variant="h5" color="blue-gray">
                      {member.name}
                    </Typography>
                    <Typography variant="h6" color="orange" className="mb-2">
                      {member.role}
                    </Typography>
                    <Typography variant="small" className="font-normal text-gray-600">
                      {member.description}
                    </Typography>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>

      {/* Advisory Boards Tabs */}
      <Card className="w-full">
        <CardBody className="p-6">
          <Tabs value={activeTab} className="overflow-visible">
            <TabsHeader className="relative z-0 mb-8">
              <Tab value="local" onClick={() => setActiveTab("local")}>
                <div className="flex items-center gap-2">
                  <BuildingLibraryIcon className="w-5 h-5" />
                  Local Committee
                </div>
              </Tab>
              <Tab value="national" onClick={() => setActiveTab("national")}>
                <div className="flex items-center gap-2">
                  <AcademicCapIcon className="w-5 h-5" />
                  National Advisory
                </div>
              </Tab>
              <Tab value="international" onClick={() => setActiveTab("international")}>
                <div className="flex items-center gap-2">
                  <GlobeAsiaAustraliaIcon className="w-5 h-5" />
                  International Advisory
                </div>
              </Tab>
            </TabsHeader>
            <TabsBody
              animate={{
                initial: { y: 250 },
                mount: { y: 0 },
                unmount: { y: 250 },
              }}
              className="overflow-visible"
            >
              <TabPanel value="local" className="p-0">
                <Card className="mt-6 w-full">
                  <CardBody className="p-6">
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      Local Organizing Committee
                    </Typography>
                    <div className="grid gap-4 md:grid-cols-2">
                      {LOCAL_COMMITTEE.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <UserGroupIcon className="w-5 h-5 text-orange-500" />
                          <Typography className="font-normal text-gray-600">
                            {member}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel value="national" className="p-0">
                <Card className="mt-6 w-full">
                  <CardBody className="p-6">
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      National Advisory Board
                    </Typography>
                    <div className="grid gap-4 md:grid-cols-2">
                      {NATIONAL_ADVISORY.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <AcademicCapIcon className="w-5 h-5 text-blue-500" />
                          <Typography className="font-normal text-gray-600">
                            {member}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </TabPanel>
              <TabPanel value="international" className="p-0">
                <Card className="mt-6 w-full">
                  <CardBody className="p-6">
                    <Typography variant="h4" color="blue-gray" className="mb-4">
                      International Advisory Board
                    </Typography>
                    <div className="grid gap-4 md:grid-cols-2">
                      {INTERNATIONAL_ADVISORY.map((member, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                          <GlobeAsiaAustraliaIcon className="w-5 h-5 text-green-500" />
                          <Typography className="font-normal text-gray-600">
                            {member}
                          </Typography>
                        </div>
                      ))}
                    </div>
                  </CardBody>
                </Card>
              </TabPanel>
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </PageWrapper>
  );
}

export default Committee;