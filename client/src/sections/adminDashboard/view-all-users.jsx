
import React, { useEffect, useState } from 'react';
import { UserTable } from './components/user-table';
import PageWrapper from '../../components/page-wrapper';
import OptionsHeader from '../../components/options-header';

function ViewAllUsers() {
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://conference-website-rp.onrender.com/api/admin/all-users', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          setAllUsers(data);
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
        <OptionsHeader href='/admin/dashboard' title='View All Users' />
        {allUsers.length > 0 ? (
          <UserTable allUsers={allUsers} />
        ) : (
          'No users found.'
        )}
      </PageWrapper>
    </>
  );
}

export default ViewAllUsers;
