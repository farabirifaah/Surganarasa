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

const AdminPackage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [pax, setPax] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);
  const [packages, setPackages] = useState([]);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  
  // New states for image modal
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState('');
  const [activeTitle, setActiveTitle] = useState('');
  const [activeDescription, setActiveDescription] = useState('');

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'package'));
      const packagesList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPackages(packagesList);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const openModal = (pkg = null) => {
    // Set states for the modal when editing or adding a new package
    if (pkg) {
      setName(pkg.name);
      setDescription(pkg.description);
      setPax(pkg.pax);
      setPrice(pkg.price);
      setImage(pkg.imageSrc);
      setIsBestSeller(pkg.isBestSeller);
      setIsHighlight(pkg.isHighlight);
      setEditingPackageId(pkg.id);
    } else {
      setName('');
      setDescription('');
      setPax('');
      setPrice('');
      setImage(null);
      setIsBestSeller(false);
      setIsHighlight(false);
      setEditingPackageId(null);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    // Reset fields
    setName('');
    setDescription('');
    setPax('');
    setPrice('');
    setImage(null);
    setIsBestSeller(false);
    setIsHighlight(false);
    setEditingPackageId(null);
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
      let imageURL = '';

      if (image) {
        const compressedImage = await handleImageCompression(image);
        const imageRef = ref(storage, `package_images/${compressedImage.name}`);
        const snapshot = await uploadBytes(imageRef, compressedImage);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      if (editingPackageId) {
        const packageRef = doc(db, 'package', editingPackageId);
        await updateDoc(packageRef, { 
          name, 
          description, 
          pax, 
          price, 
          imageSrc: imageURL, 
          isBestSeller, 
          isHighlight 
        });
      } else {
        await addDoc(collection(db, 'package'), { 
          name, 
          description, 
          pax, 
          price, 
          imageSrc: imageURL, 
          isBestSeller, 
          isHighlight 
        });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this package?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'package', id));
        alert('Package deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const handleImageClick = (pkg) => {
    // Set active package for displaying in the dialog
    setActive(pkg.imageSrc);
    setActiveTitle(pkg.name);
    setActiveDescription(pkg.description);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const TABLE_HEAD = ["Name", "Description", "Pax", "Price", "Image", "Best Seller", "Highlight", "Actions"];

  return (
    <div className='container mx-auto mt-10'>
      {/* Modal for Adding/Editing Packages */}
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingPackageId ? 'Edit Service' : 'Add Service'}
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
              Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="eg. Package Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Description
            </Typography>
            <Textarea
              rows={3}
              placeholder="eg. Package Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Pax
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. 5"
                value={pax}
                onChange={(e) => setPax(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Price
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="eg. $100"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Image
            </Typography>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full text-gray-600"
              accept="image/*"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isBestSeller}
              onChange={(e) => setIsBestSeller(e.target.checked)}
              className="mr-2"
            />
            <span>Best Seller</span>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isHighlight}
              onChange={(e) => setIsHighlight(e.target.checked)}
              className="mr-2"
            />
            <span>Highlight</span>
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit}>
            {editingPackageId ? 'Update Service' : 'Add Service'}
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

      {/* Table for Displaying Packages */}
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
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">{pkg.name}</Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">{pkg.description}</Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">{pkg.pax}</Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">Rp. {pkg.price}</Typography>
                  </td>
                  <td className="p-4">
                    {pkg.imageSrc && (
                      <img
                        src={pkg.imageSrc}
                        alt={pkg.name}
                        className="h-10 w-10 object-cover rounded-full cursor-pointer"
                        onClick={() => handleImageClick(pkg)} // Click handler to open image dialog
                      />
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">{pkg.isBestSeller ? 'Yes' : 'No'}</Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">{pkg.isHighlight ? 'Yes' : 'No'}</Typography>
                  </td>
                  <td className="p-4">
                    <IconButton onClick={() => openModal(pkg)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(pkg.id)}>
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
};

export default AdminPackage;
