import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";


const events = [
  {
    _id: 1,
    title: 'Event 1',
    year: '2024',
    description: ' - This is the first event.',
    link: '/event1'
  },
  {
    _id: 2,
    title: 'Event 2',
    year: '2024',
    description: ' - This is the second event.',
    link: '/event2'
  },
  {
    _id: 3,
    title: 'Event 3',
    year: '2024',
    description: ' - This is the third event.',
    link: '/event3'
  }
];

export function PastEventsCard() {
  return (
    <Card shadow={false}>
      <CardBody className="h-full p-5 flex flex-col items-center rounded-2xl bg-gray-900 opacity-0.5 ">
        <Typography variant="h4" className="text-left mb-5" color="white">
          Past IPDIMS
        </Typography>

        {/* Move <ul> outside of <Typography> */}
        <ul className="mt-2 mb-10 text-base w-full lg:w-10/12 text-justify font-normal text-white">
          {events.map((event) => (
            <li key={event._id} className="mb-2 flex items-baseline">
              <span className='text-orange-500'>{event.title + ' ' + event.year}</span> {event.description}
              <Link to={event.link}>
                <ArrowTopRightOnSquareIcon className='w-4 h-4 ml-2' />
              </Link>
            </li>
          ))}
        </ul>

      </CardBody>
    </Card>
  );
}


export default PastEventsCard;
