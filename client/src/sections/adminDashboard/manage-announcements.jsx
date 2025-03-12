import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/page-wrapper';
import OptionsHeader from '../../components/options-header';
import { AnnouncementTable } from './components/announcements-table';
import API_BASE_URL from "../../config/api";
import { Alert } from "@material-tailwind/react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

function ManageAnnouncements() {
  const [allAnnouncements, setAllAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const fetchAnnouncements = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/general/get-all-announcements`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAllAnnouncements(data);
        setError(null);
      } else {
        setError('Failed to fetch announcements');
      }
    } catch (error) {
      setError('Error fetching announcements: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const handleAddAnnouncement = async (newAnnouncement) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/add-new-announcement`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newAnnouncement)
      });

      if (response.ok) {
        // Fetch the updated list of announcements
        await fetchAnnouncements();
        setAlertMessage('Announcement added successfully!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
        return true;
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add announcement');
      }
    } catch (error) {
      setError('Error adding announcement: ' + error.message);
      return false;
    }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/api/admin/delete-announcement/${announcementId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        setAllAnnouncements(prev => prev.filter(a => a._id !== announcementId));
        setAlertMessage('Announcement deleted successfully!');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete announcement');
      }
    } catch (error) {
      setError('Error deleting announcement: ' + error.message);
    }
  };

  return (
    <PageWrapper>
      <div className="relative">
        {/* Success Alert */}
        {showAlert && (
          <div className="fixed top-4 right-4 z-50">
            <Alert
              icon={<CheckCircleIcon className="h-6 w-6" />}
              className="bg-orange-500 text-white font-medium"
              dismissible={{
                onClose: () => setShowAlert(false),
              }}
            >
              {alertMessage}
            </Alert>
          </div>
        )}

        <OptionsHeader
          href='/admin/dashboard'
          title='Manage Announcements'
          subtitle='Create and manage conference announcements'
        />

        {error && (
          <Alert color="red" className="mb-4">
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
          </div>
        ) : (
          <AnnouncementTable
            allAnnouncements={allAnnouncements}
            onAddAnnouncement={handleAddAnnouncement}
            onDeleteAnnouncement={handleDeleteAnnouncement}
          />
        )}
      </div>
    </PageWrapper>
  );
}

export default ManageAnnouncements;