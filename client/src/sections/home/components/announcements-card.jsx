import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";

export function AnnouncementsCard() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch('https://conference-website-rp.onrender.com/api/general/get-all-announcements', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Adjust the token retrieval as needed
          }
        });
        const data = await response.json();
        setAnnouncements(data);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Card shadow={false}>
      <CardBody className="h-full p-5 flex flex-col items-center rounded-2xl bg-gray-900 opacity-0.5 ">
        <Typography variant="h4" className="text-left mb-5" color="white">
          Latest Announcements
        </Typography>
        <Typography
          color="white"
          className="mt-2 mb-10 text-base w-full lg:w-10/12 text-justify font-normal"
        >
          <ul>
            {announcements.map((announcement) => (
              <li key={announcement._id}>
                <Typography color="white" className="mb-2">
                  <span className="text-orange-500">{new Date(announcement.date).toLocaleDateString()}</span> {announcement.title + '-' + announcement.description}
                </Typography>
              </li>
            ))}
          </ul>
        </Typography>
      </CardBody>
    </Card>
  );
}

export default AnnouncementsCard;