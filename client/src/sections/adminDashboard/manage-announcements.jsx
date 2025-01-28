
import React, { useEffect, useState } from 'react';
import PageWrapper from '../../components/page-wrapper';
import OptionsHeader from '../../components/options-header';
import { AnnouncementTable } from './components/announcements-table';
import AddNewAnnouncementForm from './components/add-new-announcement-form';


function ManageAnnouncements() {
  const [allAnnouncements, setAllAnnouncements] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://conference-website-rp.onrender.com/api/general/get-all-announcements', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAllAnnouncements(data);
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchUsers();
  }, []);


  return (
    <>
      <PageWrapper>
        <OptionsHeader href='/admin/dashboard' title='Manage Announcments' />
        <AddNewAnnouncementForm />
        {allAnnouncements.length > 0 ? (
          <AnnouncementTable allAnnouncements={allAnnouncements} />
        ) : (
          'No announcements yet.'
        )}
      </PageWrapper>
    </>
  );
}

export default ManageAnnouncements;