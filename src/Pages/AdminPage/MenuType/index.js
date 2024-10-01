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
import { XMarkIcon } from "@heroicons/react/24/outline";

const AdminMenuType = () => {
  const [typeName, setTypeName] = useState('');
  const [sequence, setSequence] = useState(0); // State for sequence number
  const [menuTypes, setMenuTypes] = useState([]);
  const [editingTypeId, setEditingTypeId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'menuType'));
      const typeList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuTypes(typeList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (menuType = null) => {
    if (menuType) {
      setTypeName(menuType.typeName);
      setSequence(menuType.sequence); // Set the sequence when editing
      setEditingTypeId(menuType.id);
    } else {
      setTypeName('');
      setSequence(0); // Reset sequence when adding new type
      setEditingTypeId(null);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTypeName('');
    setSequence(0); // Reset sequence when closing modal
    setEditingTypeId(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (editingTypeId) {
        const typeRef = doc(db, 'menuType', editingTypeId);
        await updateDoc(typeRef, { typeName, sequence }); // Update sequence along with typeName
      } else {
        await addDoc(collection(db, 'menuType'), { typeName, sequence }); // Add sequence when creating new type
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this menu type?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'menuType', id));
        alert('Menu type deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const TABLE_HEAD = ["Sequence", "Menu Type Name", "Actions"]; // Added "Sequence" to table header

  return (
    <div className='container mx-auto mt-10'>
      {/* Modal */}
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingTypeId ? 'Edit Menu Type' : 'Add Menu Type'}
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
              Menu Type Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="e.g. Beverages"
              value={typeName}
              onChange={(e) => setTypeName(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Sequence Number
            </Typography>
            <Input
              type="number" // Input type set to number for sequence
              color="gray"
              size="lg"
              placeholder="e.g. 1"
              value={sequence}
              onChange={(e) => setSequence(Number(e.target.value))} // Update sequence state
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            {editingTypeId ? 'Update Menu Type' : 'Add Menu Type'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Table */}
      <Card className="h-full w-full overflow-scroll">
        <div className='flex flex-auto flex-row justify-between m-10'>
          <Typography variant='h4'>
            Menu Types
          </Typography>
          <Button onClick={() => openModal()} variant="gradient" className="ml-1">
            Add Menu Type
          </Button>
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
            {menuTypes.length > 0 ? (
              menuTypes.map((menuType) => (
                <tr key={menuType.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menuType.sequence} {/* Display the sequence number */}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menuType.typeName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton onClick={() => openModal(menuType)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(menuType.id)} >
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="3">
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

export default AdminMenuType;
