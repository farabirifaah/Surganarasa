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
  const [imageFile, setImageFile] = useState(null); // New state for image File
  const [videoUrl, setVideoUrl] = useState(null); // New state for image File
  const [existingImage, setExistingImage] = useState(''); // New state for existing image URL
  const [packages, setPackages] = useState([]);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isBestSeller, setIsBestSeller] = useState(false);
  const [isHighlight, setIsHighlight] = useState(false);
  const [isOther, setIsOther] = useState(false);
  
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
    if (pkg) {
      setName(pkg.name);
      setVideoUrl(pkg.videoUrl);
      setDescription(pkg.description);
      setPax(pkg.pax);
      setPrice(pkg.price);
      setExistingImage(pkg.imageSrc); // Set existing image URL
      setImageFile(null); // Reset image File
      setIsBestSeller(pkg.isBestSeller);
      setIsHighlight(pkg.isHighlight);
      setIsOther(pkg.isOther);
      setEditingPackageId(pkg.id);
    } else {
      setName('');
      setVideoUrl('');
      setDescription('');
      setPax('');
      setPrice('');
      setImageFile(null);
      setExistingImage(''); // Reset existing image URL
      setIsBestSeller(false);
      setIsHighlight(false);
      setIsOther(false);
      setEditingPackageId(null);
    }
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setName('');
    setVideoUrl('');
    setDescription('');
    setPax('');
    setPrice('');
    setImageFile(null);
    setExistingImage('');
    setIsBestSeller(false);
    setIsHighlight(false);
    setIsOther(false);
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
      let imageURL = existingImage; // Default to existing image
      if (imageFile) {
        const compressedImage = await handleImageCompression(imageFile);
        const imageRef = ref(storage, `package_images/${compressedImage.name}`);
        const snapshot = await uploadBytes(imageRef, compressedImage);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      if (editingPackageId) {
        const packageRef = doc(db, 'package', editingPackageId);
        await updateDoc(packageRef, { 
          name, 
          videoUrl,
          description, 
          pax, 
          price, 
          imageSrc: imageURL, 
          isBestSeller, 
          isHighlight,
          isOther
        });
      } else {
        await addDoc(collection(db, 'package'), { 
          name, 
          videoUrl,
          description, 
          pax, 
          price, 
          imageSrc: imageURL, 
          isBestSeller, 
          isHighlight,
          isOther
        });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
      setErrorMessage('Failed to save the package. Please try again.');
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
        alert('Failed to delete the package. Please try again.');
      }
    }
  };

  const handleImageClick = (pkg) => {
    setActive(pkg.imageSrc);
    setActiveTitle(pkg.name);
    setActiveDescription(pkg.description);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent form submission
    }
  };

  const TABLE_HEAD = [ "Image", "Name", "Description", "Pax", "Price", "Best Seller", "Highlight", "Other", "Actions"];

  return (
    <div className='container mx-auto mt-10'>
      {/* Modal */}
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4 max-h-screen overflow-y-auto">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingPackageId ? 'Edit Package' : 'Add Package'}
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
            <Textarea
              rows={3}
              placeholder="eg. Package Name"
              onKeyDown={handleKeyDown}
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
              onKeyDown={handleKeyDown}
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
          <div className="w-full">
              <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                Video URL
              </Typography>
              <Input
                color="gray"
                size="lg"
                placeholder="https://..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
              />
            </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Image
            </Typography>
            <input
              type="file"
              onChange={(e) => {
                if (e.target.files[0]) {
                  setImageFile(e.target.files[0]);
                }
              }}
              className="block w-full text-gray-600"
              accept="image/*"
            />
            {/* Show existing image when editing and no new image is selected */}
            {editingPackageId && existingImage && !imageFile && (
              <div className="mt-2">
                <img src={existingImage} alt="Existing Package" className="h-64 w-64 object-cover rounded" />
              </div>
            )}
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
              checked={isOther}
              onChange={(e) => setIsOther(e.target.checked)}
              className="mr-2"
            />
            <span>Is Other</span>
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
            {editingPackageId ? 'Update Package' : 'Add Package'}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Image Dialog */}
      <Dialog size="lg" className="bg-white" open={dialogOpen} handler={handleDialogClose}>
        <DialogHeader className="justify-between">
          <p>{" "}</p>
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
          <Typography className="mt-5 font-normal text-white text-sm">
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

      {/* Table */}
      <Card className="h-full w-full overflow-scroll">
        <div className='flex flex-auto flex-row justify-between m-10'>
          <Typography variant='h4'>
            Package
          </Typography>
          <Button onClick={() => openModal()} variant="gradient">
            Add Package
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
            {packages.length > 0 ? (
              packages.map((pkg) => (
                <tr key={pkg.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    {pkg.imageSrc && (
                      <img
                        src={pkg.imageSrc}
                        alt={pkg.name}
                        className="h-16 w-16 rounded-md cursor-pointer object-cover"
                        onClick={() => handleImageClick(pkg)} // Add click handler
                      />
                    )}
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {pkg.name}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal max-w-[40rem]">
                      {pkg.description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {pkg.pax}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Rp. {pkg.price}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {pkg.isBestSeller ? 'Yes' : 'No'}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {pkg.isHighlight ? 'Yes' : 'No'}
                    </Typography>
                  </td>
                  <td className="p-4 text-center">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {pkg.isOther ? 'Yes' : 'No'}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <IconButton onClick={() => openModal(pkg)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(pkg.id)} >
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="9">
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

export default AdminPackage;
