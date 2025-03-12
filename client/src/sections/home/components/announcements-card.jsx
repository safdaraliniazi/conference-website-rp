import React, { useEffect, useState } from 'react';
import {
  Card,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import API_BASE_URL from "../../../config/api";

export function AnnouncementsCard() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/general/get-all-announcements`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch announcements');
        }

        const data = await response.json();

        // Filter for active announcements (date is in the future)
        const activeAnnouncements = data.filter(announcement =>
          new Date(announcement.date) > new Date()
        );

        // Sort by date (most recent first)
        const sortedAnnouncements = activeAnnouncements.sort((a, b) =>
          new Date(b.date) - new Date(a.date)
        );

        setAnnouncements(sortedAnnouncements);
        setError(null);
      } catch (error) {
        console.error('Failed to fetch announcements:', error);
        setError('Failed to load announcements');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <Card shadow={false}>
      <CardBody className="h-full p-5 flex flex-col items-center rounded-2xl bg-gray-900 opacity-0.5">
        <Typography variant="h4" className="text-left mb-5" color="white">
          Latest Announcements
        </Typography>
        {loading ? (
          <div className="flex justify-center items-center p-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : error ? (
          <Typography color="red" className="text-center">
            {error}
          </Typography>
        ) : announcements.length === 0 ? (
          <Typography color="white" className="text-center">
            No active announcements at this time.
          </Typography>
        ) : (
          <Typography
            color="white"
            className="mt-2 mb-10 text-base w-full lg:w-10/12 text-justify font-normal"
          >
            <ul className="space-y-4">
              {announcements.map((announcement) => (
                <li key={announcement._id} className="border-l-4 border-orange-500 pl-4">
                  <Typography color="white" className="mb-1 font-semibold">
                    {announcement.title}
                  </Typography>
                  <Typography color="gray" className="text-sm mb-2">
                    {new Date(announcement.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </Typography>
                  <Typography color="white" className="text-sm">
                    {announcement.description}
                  </Typography>
                </li>
              ))}
            </ul>
          </Typography>
        )}
      </CardBody>
    </Card>
  );
}

export default AnnouncementsCard;