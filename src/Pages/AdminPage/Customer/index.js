import React, { useEffect, useState } from 'react';
import { db } from '../../../firebase';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import {
  Input,
  Button,
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import { MegaphoneIcon, XMarkIcon } from "@heroicons/react/24/outline";

const AdminCustomer = () => {
  const [customerName, setCustomerName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customers, setCustomers] = useState([]);
  const [editingCustomerId, setEditingCustomerId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customer'));
      const customersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCustomers(customersList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (customer = null) => {
    if (customer) {
      setCustomerName(customer.customerName);
      setEmail(customer.email);
      setPhoneNumber(customer.phoneNumber);
      setEditingCustomerId(customer.id);
    } else {
      setCustomerName('');
      setEmail('');
      setPhoneNumber('');
      setEditingCustomerId(null);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCustomerName('');
    setEmail('');
    setPhoneNumber('');
    setEditingCustomerId(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (editingCustomerId) {
        const customerRef = doc(db, 'customer', editingCustomerId);
        await updateDoc(customerRef, { 
          customerName, 
          email, 
          phoneNumber 
        });
      } else {
        await addDoc(collection(db, 'customer'), { 
          customerName, 
          email, 
          phoneNumber 
        });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this customer?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'customer', id));
        alert('Customer deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  // New function to handle broadcasting messages
  const handleBroadcast = () => {
    const message = "Hello, this is a broadcast message!";
    const phoneNumbers = customers.map(customer => customer.phoneNumber).join(',');
    const waLink = `https://wa.me/?phone=${phoneNumbers}&text=${encodeURIComponent(message)}`;
    
    // Open the generated WhatsApp link in a new tab
    window.open(waLink, '_blank');
  };

  const TABLE_HEAD = ["Customer Name", "Email", "Phone Number", "Actions"];

  return (
    <div className='container mx-auto mt-10'>
      {/* Modal */}
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingCustomerId ? 'Edit Customer' : 'Add Customer'}
          </Typography>
          <IconButton
            size="sm"
            variant="text"
            className="!absolute right-3.5 top-3.5"
            onClick={closeModal}
          >
            <XMarkIcon className="h-4 w-4 stroke-2" />
          </IconButton>
        </DialogHeader>
        <DialogBody className="space-y-4 pb-6">
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Customer Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. John Doe"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Email
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. john.doe@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Phone Number
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. +1234567890"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            {editingCustomerId ? 'Update Customer' : 'Add Customer'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Table */}
      <Card className="h-full w-full overflow-scroll">
        <div className='flex flex-auto flex-row justify-between m-10'>
          <Typography variant='h4'>
            Customers
          </Typography>
          <div className='flex'>
            {/* <Button variant="filled" onClick={handleBroadcast} className="flex items-center gap-2">
              Send Broadcast{" "}
              <MegaphoneIcon width={20} height={20}/>
            </Button> */}
            <Button onClick={() => openModal()} variant="gradient" className="ml-1">
              Add Customer
            </Button>
          </div>
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
            {customers.length > 0 ? (
              customers.map((customer) => (
                <tr key={customer.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {customer.customerName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {customer.email}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {customer.phoneNumber}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton onClick={() => openModal(customer)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(customer.id)} >
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="4">
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

export default AdminCustomer;
