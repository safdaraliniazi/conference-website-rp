import React from 'react'
import {
    Typography,
    Card,
    CardBody,
    Button,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Carousel,
    IconButton,
    Chip,
} from '@material-tailwind/react'
import PageWrapper from '../components/page-wrapper'
import {
    HomeIcon,
    MapPinIcon,
    PhoneIcon,
    BuildingOfficeIcon,
    TruckIcon,
    CurrencyRupeeIcon,
    ClockIcon,
    ArrowLongRightIcon,
    WifiIcon,
    UserGroupIcon,
    AcademicCapIcon,
    BuildingLibraryIcon,
    BanknotesIcon,
} from '@heroicons/react/24/solid'

const CAMPUS_IMAGES = [
    {
        src: "/images/campus/nit-main.jpg",
        alt: "NIT Rourkela Main Building",
        title: "Main Academic Building"
    },
    {
        src: "/images/campus/id-dept.jpg",
        alt: "Industrial Design Department",
        title: "Department of Industrial Design"
    },
    {
        src: "/images/campus/guest-house.jpg",
        alt: "Institute Guest House",
        title: "Institute Guest House"
    }
];

const ACCOMMODATION_OPTIONS = [
    {
        title: "Institute Guest House",
        description: "Limited rooms available on first-come-first-serve basis",
        features: [
            "Air-conditioned rooms",
            "Attached bathroom",
            "Wi-Fi facility",
            "Dining facility",
        ],
        charges: "₹1000-1500 per night",
        availability: "Limited rooms",
        icon: BuildingOfficeIcon,
        color: "orange",
        amenities: [
            { icon: WifiIcon, text: "Free Wi-Fi" },
            { icon: UserGroupIcon, text: "24/7 Service" },
            { icon: BuildingLibraryIcon, text: "Dining Hall" },
            { icon: BanknotesIcon, text: "Reasonable Rates" },
        ]
    },
    {
        title: "Student Hostels",
        description: "Separate accommodation for boys and girls",
        features: [
            "Basic amenities",
            "Common areas",
            "Wi-Fi facility",
            "Mess facility",
        ],
        charges: "₹500-800 per night",
        availability: "Subject to availability",
        icon: HomeIcon,
        color: "blue",
        amenities: [
            { icon: WifiIcon, text: "Wi-Fi Access" },
            { icon: UserGroupIcon, text: "Common Areas" },
            { icon: BuildingLibraryIcon, text: "Mess Facility" },
            { icon: BanknotesIcon, text: "Economic Option" },
        ]
    },
]

const TRANSPORT_OPTIONS = [
    {
        mode: "By Air",
        details: [
            "Nearest Airports:",
            "- Jharsiguda (IXJ): 230 km",
            "- Ranchi (IXR): 190 km",
            "- Bhubaneswar (BBI): 340 km",
        ],
        icon: TruckIcon,
        color: "blue",
        estimatedTime: "3-4 hours from airport",
        frequency: "Daily flights available",
    },
    {
        mode: "By Train",
        details: [
            "Rourkela Railway Station (ROU)",
            "- On Howrah-Mumbai main line",
            "- Well connected to major cities",
            "- 7 km from NIT campus",
        ],
        icon: TruckIcon,
        color: "green",
        estimatedTime: "20-30 mins from station",
        frequency: "Multiple trains daily",
    },
    {
        mode: "By Road",
        details: [
            "Well-connected by highways",
            "- NH-143 connects to major cities",
            "- Regular bus services available",
            "- Taxi services available from station",
        ],
        icon: TruckIcon,
        color: "orange",
        estimatedTime: "Varies by source",
        frequency: "24/7 accessibility",
    },
]

function VenueAccommodation() {
    const [activeTab, setActiveTab] = React.useState("venue")

    return (
        <PageWrapper>
            <div className="text-center mb-12">
                <Typography
                    variant="h6"
                    color="orange"
                    className="mb-2"
                >
                    Location & Stay
                </Typography>
                <Typography
                    variant="h2"
                    color="blue-gray"
                    className="mb-4"
                >
                    Venue & Accommodation
                </Typography>
                <Typography
                    className="mx-auto max-w-3xl !text-gray-500"
                    variant="lead"
                >
                    Experience the vibrant academic atmosphere at NIT Rourkela during IPDIMS 2024
                </Typography>
            </div>

            {/* Quick Info Cards */}
            <div className="grid gap-6 md:grid-cols-3 mb-12">
                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <span className="p-3 rounded-full bg-orange-50">
                                <MapPinIcon className="h-6 w-6 text-orange-500" />
                            </span>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Conference Venue
                                </Typography>
                                <Typography variant="small" className="font-normal text-gray-600">
                                    Department of Industrial Design
                                    <br />
                                    NIT Rourkela, Odisha-769008
                                </Typography>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <span className="p-3 rounded-full bg-blue-gray-50">
                                <ClockIcon className="h-6 w-6 text-blue-gray-500" />
                            </span>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Conference Dates
                                </Typography>
                                <Typography variant="small" className="font-normal text-gray-600">
                                    December 4-5, 2024
                                    <br />
                                    9:00 AM onwards
                                </Typography>
                            </div>
                        </div>
                    </CardBody>
                </Card>

                <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                    <CardBody className="p-6">
                        <div className="flex items-center gap-4">
                            <span className="p-3 rounded-full bg-green-50">
                                <CurrencyRupeeIcon className="h-6 w-6 text-green-500" />
                            </span>
                            <div>
                                <Typography variant="h6" color="blue-gray">
                                    Accommodation
                                </Typography>
                                <Typography variant="small" className="font-normal text-gray-600">
                                    Guest House & Hostels
                                    <br />
                                    Available at nominal charges
                                </Typography>
                            </div>
                        </div>
                    </CardBody>
                </Card>
            </div>

            {/* Main Content Tabs */}
            <Card className="w-full">
                <CardBody className="p-6">
                    <Tabs value={activeTab} className="overflow-visible">
                        <TabsHeader className="relative z-0 mb-8">
                            <Tab value="venue" onClick={() => setActiveTab("venue")}>
                                <div className="flex items-center gap-2">
                                    <MapPinIcon className="w-5 h-5" />
                                    Venue Details
                                </div>
                            </Tab>
                            <Tab value="accommodation" onClick={() => setActiveTab("accommodation")}>
                                <div className="flex items-center gap-2">
                                    <HomeIcon className="w-5 h-5" />
                                    Accommodation
                                </div>
                            </Tab>
                            <Tab value="reach" onClick={() => setActiveTab("reach")}>
                                <div className="flex items-center gap-2">
                                    <TruckIcon className="w-5 h-5" />
                                    How to Reach
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
                            <TabPanel value="venue" className="p-0">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    <div>
                                        <Typography variant="h4" color="blue-gray" className="mb-4">
                                            Conference Venue
                                        </Typography>
                                        <Typography className="font-normal text-gray-600 mb-6">
                                            The conference will be held at the Department of Industrial Design, National Institute of Technology Rourkela. The campus is known for its beautiful landscape, modern facilities, and vibrant academic atmosphere.
                                        </Typography>
                                        <Card className="mb-6 bg-gray-50">
                                            <CardBody>
                                                <div className="space-y-4">
                                                    <div className="flex items-center gap-2">
                                                        <MapPinIcon className="h-5 w-5 text-orange-500" />
                                                        <Typography className="font-normal text-gray-700">
                                                            NIT Rourkela, Odisha-769008
                                                        </Typography>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <PhoneIcon className="h-5 w-5 text-orange-500" />
                                                        <Typography className="font-normal text-gray-700">
                                                            Contact: +91-XXX-XXX-XXXX
                                                        </Typography>
                                                    </div>
                                                    <Button
                                                        variant="text"
                                                        className="flex items-center gap-2"
                                                        color="orange"
                                                    >
                                                        Get Directions
                                                        <ArrowLongRightIcon strokeWidth={2} className="w-4 h-4" />
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                        <Carousel
                                            className="rounded-xl"
                                            navigation={({ setActiveIndex, activeIndex, length }) => (
                                                <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
                                                    {new Array(length).fill("").map((_, i) => (
                                                        <span
                                                            key={i}
                                                            className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
                                                                }`}
                                                            onClick={() => setActiveIndex(i)}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        >
                                            {CAMPUS_IMAGES.map((image, index) => (
                                                <div key={index} className="h-[300px] w-full relative">
                                                    <img
                                                        src={image.src}
                                                        alt={image.alt}
                                                        className="h-full w-full object-cover"
                                                    />
                                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/75 to-transparent p-4">
                                                        <Typography color="white" variant="h6">
                                                            {image.title}
                                                        </Typography>
                                                    </div>
                                                </div>
                                            ))}
                                        </Carousel>
                                    </div>
                                    <div className="h-[600px] rounded-lg overflow-hidden">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            title="map"
                                            marginHeight="0"
                                            marginWidth="0"
                                            scrolling="no"
                                            src="https://maps.google.com/maps?width=100%&amp;height=600&amp;hl=en&amp;q=National%20Institute%20of%20Technology,%20Sector%201,%20Rourkela,%20Odisha&amp;ie=UTF8&amp;t=&amp;z=14&amp;iwloc=B&amp;output=embed"
                                        ></iframe>
                                    </div>
                                </div>
                            </TabPanel>

                            <TabPanel value="accommodation" className="p-0">
                                <Typography variant="h4" color="blue-gray" className="mb-6">
                                    Accommodation Options
                                </Typography>
                                <div className="grid gap-6 lg:grid-cols-2">
                                    {ACCOMMODATION_OPTIONS.map((option, index) => (
                                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <CardBody className="p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className={`p-3 rounded-full bg-${option.color}-50`}>
                                                        <option.icon className={`h-6 w-6 text-${option.color}-500`} />
                                                    </span>
                                                    <div>
                                                        <Typography variant="h5" color="blue-gray">
                                                            {option.title}
                                                        </Typography>
                                                        <Typography variant="small" className="font-normal text-gray-600">
                                                            {option.description}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-4 mb-4">
                                                    {option.amenities.map((amenity, i) => (
                                                        <div key={i} className="flex items-center gap-2">
                                                            <amenity.icon className={`h-5 w-5 text-${option.color}-500`} />
                                                            <Typography className="font-normal text-gray-600">
                                                                {amenity.text}
                                                            </Typography>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div className="flex justify-between items-center mt-4">
                                                    <Chip
                                                        value={option.charges}
                                                        variant="ghost"
                                                        color={option.color}
                                                        icon={<CurrencyRupeeIcon className="h-4 w-4" />}
                                                    />
                                                    <Button
                                                        variant="text"
                                                        color={option.color}
                                                        className="flex items-center gap-2"
                                                    >
                                                        Book Now
                                                        <ArrowLongRightIcon strokeWidth={2} className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </TabPanel>

                            <TabPanel value="reach" className="p-0">
                                <Typography variant="h4" color="blue-gray" className="mb-6">
                                    How to Reach
                                </Typography>
                                <div className="grid gap-6 lg:grid-cols-3">
                                    {TRANSPORT_OPTIONS.map((option, index) => (
                                        <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                                            <CardBody className="p-6">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className={`p-3 rounded-full bg-${option.color}-50`}>
                                                        <option.icon className={`h-6 w-6 text-${option.color}-500`} />
                                                    </span>
                                                    <div>
                                                        <Typography variant="h5" color="blue-gray">
                                                            {option.mode}
                                                        </Typography>
                                                        <Chip
                                                            value={option.estimatedTime}
                                                            variant="ghost"
                                                            size="sm"
                                                            color={option.color}
                                                            icon={<ClockIcon className="h-3 w-3" />}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2 mb-4">
                                                    {option.details.map((detail, i) => (
                                                        <Typography key={i} className="font-normal text-gray-600">
                                                            {detail}
                                                        </Typography>
                                                    ))}
                                                </div>
                                                <div className="mt-4">
                                                    <Typography variant="small" className="font-normal text-gray-500">
                                                        Frequency: {option.frequency}
                                                    </Typography>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    ))}
                                </div>
                            </TabPanel>
                        </TabsBody>
                    </Tabs>
                </CardBody>
            </Card>

            {/* Call to Action */}
            <Card className="mt-12 bg-blue-gray-50">
                <CardBody className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div>
                            <Typography variant="h5" color="blue-gray" className="mb-2">
                                Need Assistance with Accommodation?
                            </Typography>
                            <Typography className="font-normal text-gray-600">
                                Our team is here to help you with your stay arrangements
                            </Typography>
                        </div>
                        <div className="flex gap-4">
                            <Button color="orange" className="flex items-center gap-2">
                                Book Accommodation
                                <ArrowLongRightIcon strokeWidth={2} className="h-4 w-4" />
                            </Button>
                            <Button variant="outlined" color="blue-gray">
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
        </PageWrapper>
    )
}

export default VenueAccommodation