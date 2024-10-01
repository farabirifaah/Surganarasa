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

const AdminMenuCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [menuCategories, setMenuCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'menuCategory'));
      const categoryList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuCategories(categoryList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (menuCategory = null) => {
    if (menuCategory) {
      setCategoryName(menuCategory.categoryName);
      setEditingCategoryId(menuCategory.id);
    } else {
      setCategoryName('');
      setEditingCategoryId(null);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCategoryName('');
    setEditingCategoryId(null);
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      if (editingCategoryId) {
        const categoryRef = doc(db, 'menuCategory', editingCategoryId);
        await updateDoc(categoryRef, { categoryName });
      } else {
        await addDoc(collection(db, 'menuCategory'), { categoryName });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this menu category?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'menuCategory', id));
        alert('Menu category deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const TABLE_HEAD = ["Menu Category Name", "Actions"];

  return (
    <div className='container mx-auto mt-10'>
      {/* Modal */}
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingCategoryId ? 'Edit Menu Category' : 'Add Menu Category'}
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
              Menu Category Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="e.g. Ice Cream"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            {editingCategoryId ? 'Update Menu Category' : 'Add Menu Category'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Table */}
      <Card className="h-full w-full overflow-scroll">
        <div className='flex flex-auto flex-row justify-between m-10'>
          <Typography variant='h4'>
            Menu Categories
          </Typography>
          <Button onClick={() => openModal()} variant="gradient" className="ml-1">
            Add Menu Category
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
            {menuCategories.length > 0 ? (
              menuCategories.map((menuCategory) => (
                <tr key={menuCategory.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menuCategory.categoryName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton onClick={() => openModal(menuCategory)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(menuCategory.id)} >
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="2">
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

export default AdminMenuCategory;
