import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { getDocs, collection } from 'firebase/firestore';
import {
  Typography,
  Card,
} from "@material-tailwind/react";

const ContactAdmin = () => {
  const [contacts, setContacts] = useState([]);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'contacts'));
      const contactsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setContacts(contactsList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const TABLE_HEAD = ["First Name", "Last Name", "Email", "Phone Number", "Message"];

  return (
    <div className='container mx-auto mt-10'>
      <Card className="h-full w-full overflow-scroll">
        <div className='flex flex-auto flex-row justify-between m-10'>
          <Typography variant='h4'>
            Contacts
          </Typography>
        </div>
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {contacts.length > 0 ? (
              contacts.map((contact) => (
                <tr key={contact.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {contact.firstName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {contact.lastName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {contact.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {contact.phoneNumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {contact.message}
                    </Typography>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="5">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ContactAdmin;
