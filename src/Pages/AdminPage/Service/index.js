import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../firebase';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import imageCompression from 'browser-image-compression';
import {
  Input,
  Button,
  Dialog,
  Textarea,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
  Card,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Zoom } from 'react-awesome-reveal';

const ServiceAdmin = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [oldImageURL, setOldImageURL] = useState('');  // For keeping the old image
  const [services, setServices] = useState([]);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // New states for image modal
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState('');
  const [activeTitle, setActiveTitle] = useState('');
  const [activeDescription, setActiveDescription] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'service'));
      const servicesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setServices(servicesList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (srv = null) => {
    // Set states for the modal when editing or adding a new service
    if (srv) {
      setTitle(srv.title);
      setDescription(srv.description);
      setOldImageURL(srv.imgelink);  // Keep the old image URL
      setEditingServiceId(srv.id);
    } else {
      setTitle('');
      setDescription('');
      setImage(null);
      setOldImageURL('');
      setEditingServiceId(null);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset fields
    setTitle('');
    setDescription('');
    setImage(null);
    setOldImageURL('');
    setEditingServiceId(null);
    setErrorMessage('');
  };

  const handleImageCompression = async (imageFile) => {
    const options = {
      maxSizeMB: 2,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.error('Error compressing the image: ', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      let imageURL = oldImageURL;  // Set the imageURL to the old image by default

      // If a new image is selected, handle upload
      if (image) {
        const compressedImage = await handleImageCompression(image);
        const imageRef = ref(storage, `service_images/${compressedImage.name}`);
        const snapshot = await uploadBytes(imageRef, compressedImage);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      if (editingServiceId) {
        const serviceRef = doc(db, 'service', editingServiceId);
        await updateDoc(serviceRef, { 
          title, 
          description, 
          imgelink: imageURL, 
        });
      } else {
        await addDoc(collection(db, 'service'), { 
          title, 
          description, 
          imgelink: imageURL, 
        });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this service?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'service', id));
        alert('Service deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const handleImageClick = (srv) => {
    // Set active service for displaying in the dialog
    setActive(srv.imgelink);
    setActiveTitle(srv.title);
    setActiveDescription(srv.description);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const TABLE_HEAD = [ "Image", "Title", "Description", "Actions"];

  return (
    <div className='container mx-auto mt-10'>
      {/* Modal for Adding/Editing Services */}
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingServiceId ? 'Edit Service' : 'Add Service'}
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
              Title
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. Service Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Description
            </Typography>
            <Textarea
              rows={3}
              placeholder="eg. Service Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Image
            </Typography>
            {oldImageURL && (
              <div className="mb-4">
                <img
                  src={oldImageURL}
                  alt="Current Service Image"
                  className="w-24 h-24 object-cover rounded-lg"
                />
              </div>
            )}
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-gray-600"
              accept="image/*"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            {editingServiceId ? 'Update Service' : 'Add Service'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Image Dialog for Viewing Larger Image */}
      <Dialog size="lg" className="bg-white" open={dialogOpen} handler={handleDialogClose}>
        <DialogHeader className="justify-between">
          <Typography variant="h5" color="blue-gray">{activeTitle}</Typography>
        </DialogHeader>
        <DialogBody>
          <Zoom>
            <img
              className="h-64 lg:h-auto md:h-auto sm:h-auto w-full rounded-lg object-cover object-center"
              src={active}
              alt={activeTitle}
              style={{ maxHeight: 600 }}
            />
          </Zoom>
          <Typography className="mt-5 font-normal text-gray-700 text-sm">
            {activeDescription}
          </Typography>
        </DialogBody>
        <DialogFooter>
          <button
            onClick={handleDialogClose}
            style={{ borderRadius: '14px 4px 14px 4px' }}
            className="w-full font-bold bg-mainyellow-900/80 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>

      {/* Table for Displaying Services */}
      <Card className="h-full w-full overflow-scroll">
        <div className='flex flex-auto flex-row justify-between m-10'>
          <Typography variant='h4'>Service</Typography>
          <Button onClick={() => openModal()} variant="gradient">Add Service</Button>
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
            {services.length > 0 ? (
              services.map((srv) => (
                <tr key={srv.id} className={`even:bg-blue-gray-50/50`}>
                   <td className="p-4">
                    {srv.imgelink && (
                      <img
                        src={srv.imgelink}
                        alt={srv.title}
                         className="h-16 w-16 rounded-md cursor-pointer object-cover"
                        onClick={() => handleImageClick(srv)} // Click handler to open image dialog
                      />
                    )}
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">{srv.title}</Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">{srv.description}</Typography>
                  </td>
                  <td className="p-4">
                    <IconButton onClick={() => openModal(srv)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(srv.id)}>
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="4">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default ServiceAdmin;
