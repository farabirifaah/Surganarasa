import React, { useEffect, useState } from 'react';
import { db, storage } from '../../../firebase';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import imageCompression from 'browser-image-compression';
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
import { Zoom } from 'react-awesome-reveal';

const AdminMenu = () => {
  const [menuName, setMenuName] = useState('');
  const [category, setCategory] = useState('');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [measurement, setMeasurement] = useState('');
  const [variants, setVariants] = useState([]);
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [editingMenuId, setEditingMenuId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [newVariant, setNewVariant] = useState('');
  const [variantImages, setVariantImages] = useState({}); // State for variant images
  const [dialogOpen, setDialogOpen] = useState(false);
  const [active, setActive] = useState('');
  const [activeTitle, setActiveTitle] = useState('');
  const [activeDescription, setActiveDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const measurements = ['ons', 'kg', 'pcs', 'portion'];

  const fetchData = async () => {
    try {
      const menuQuerySnapshot = await getDocs(collection(db, 'menu'));
      const menuList = menuQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMenuItems(menuList);
    } catch (error) {
      console.error('Error fetching menu data: ', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const categoryQuerySnapshot = await getDocs(collection(db, 'menuCategory'));
      const categoryList = categoryQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoryList);
    } catch (error) {
      console.error('Error fetching categories: ', error);
    }
  };

  const fetchTypes = async () => {
    try {
      const typeQuerySnapshot = await getDocs(collection(db, 'menuType'));
      const typeList = typeQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTypes(typeList);
    } catch (error) {
      console.error('Error fetching types: ', error);
    }
  };

  const fetchVariants = async () => {
    try {
      const variantQuerySnapshot = await getDocs(collection(db, 'menuVariants'));
      const variantList = variantQuerySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setVariants(variantList);
    } catch (error) {
      console.error('Error fetching variants: ', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchTypes();
    fetchVariants();
  }, []);

  const openModal = (menu = null) => {
    if (menu) {
      setMenuName(menu.menuName);
      setCategory(menu.category);
      setType(menu.type);
      setDescription(menu.description || '');
      setPrice(menu.price || '');
      setIsAvailable(menu.isAvailable || false);
      setMeasurement(menu.measurement || '');

      // Ensure variants are defined and load them safely
      const currentVariants = menu.variants && Array.isArray(menu.variants) ? menu.variants.map(v => v.name) : [];
      setSelectedVariants(currentVariants);

      setEditingMenuId(menu.id);
      setImage(null);
      
      // Initialize variant images state
      const currentVariantImages = {};
      (menu.variants || []).forEach(variant => {
          currentVariantImages[variant.name] = variant.image || ''; // Initialize with existing image URL
      });
      setVariantImages(currentVariantImages);
    } else {
      setMenuName('');
      setCategory('');
      setType('');
      setDescription('');
      setPrice('');
      setIsAvailable(false);
      setMeasurement('');
      setImage(null);
      setEditingMenuId(null);
      setSelectedVariants([]);
      setVariantImages({}); // Reset variant images on new entry
    }
    setNewVariant('');
    setIsModalOpen(true);
    setErrorMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMenuName('');
    setCategory('');
    setType('');
    setDescription('');
    setPrice('');
    setIsAvailable(false);
    setMeasurement('');
    setImage(null);
    setEditingMenuId(null);
    setSelectedVariants([]);
    setNewVariant('');
    setVariantImages({}); // Reset on close
    setErrorMessage('');
  };

  const handleImageCompression = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    return await imageCompression(file, options);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true); // Start loading state

    // Validate inputs
    if (!menuName || !category || !type || !description || !price || !measurement) {
      setErrorMessage('Please fill in all fields.');
      setIsLoading(false); // Stop loading state
      return;
    }

    try {
      let imageURL;

      // Only compress and upload the new main image if provided
      if (image) {
        const compressedImage = await handleImageCompression(image);
        const imageRef = ref(storage, `menu_images/${compressedImage.name}`);
        const snapshot = await uploadBytes(imageRef, compressedImage);
        imageURL = await getDownloadURL(snapshot.ref);
      }

      if (editingMenuId) {
        const menuRef = doc(db, 'menu', editingMenuId);
        await updateDoc(menuRef, { 
          menuName, 
          category, 
          type, 
          description, 
          price: parseFloat(price), 
          isAvailable, 
          measurement,
          ...(imageURL ? { image: imageURL } : {}), // Include image only if a new image is provided
          variants: await Promise.all(selectedVariants.map(async (variant) => {
            const variantImage = variantImages[variant];
            if (variantImage) {
              // Only compress and upload the new variant image if provided
              const compressedVariantImage = await handleImageCompression(variantImage);
              const variantImageRef = ref(storage, `variant_images/${compressedVariantImage.name}`);
              const snapshot = await uploadBytes(variantImageRef, compressedVariantImage);
              return { name: variant, image: await getDownloadURL(snapshot.ref) };
            }
            return { name: variant }; // Return variant without an image if none provided
          })),
        });
      } else {
        await addDoc(collection(db, 'menu'), { 
          menuName, 
          category, 
          type, 
          description, 
          price: parseFloat(price), 
          isAvailable, 
          measurement,
          variants: await Promise.all(selectedVariants.map(async (variant) => {
            const variantImage = variantImages[variant];
            if (variantImage) {
              // Only compress and upload the new variant image if provided
              const compressedVariantImage = await handleImageCompression(variantImage);
              const variantImageRef = ref(storage, `variant_images/${compressedVariantImage.name}`);
              const snapshot = await uploadBytes(variantImageRef, compressedVariantImage);
              return { name: variant, image: await getDownloadURL(snapshot.ref) };
            }
            return { name: variant }; // Return variant without an image if none provided
          })),
          image: imageURL, // Always set the image if it's a new document
        });
      }
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
      setErrorMessage('Error saving document: ' + error.message);
    } finally {
      setIsLoading(false); // Stop loading state after the operation
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this menu item?');
    if (confirmDelete) {
      try {
        await deleteDoc(doc(db, 'menu', id));
        alert('Menu item deleted successfully!');
        fetchData();
      } catch (error) {
        console.error('Error deleting document: ', error);
      }
    }
  };

  const handleToggleAvailability = async (menu) => {
    const updatedAvailability = !menu.isAvailable;
    const menuRef = doc(db, 'menu', menu.id);
    try {
      await updateDoc(menuRef, { isAvailable: updatedAvailability });
      fetchData();
    } catch (error) {
      console.error('Error updating availability: ', error);
    }
  };

  const TABLE_HEAD = ["Image", "Menu Name", "Category", "Type", "Description", "Price", "Available", "Measurement", "Variants", "Actions"];

  const handleAddVariant = () => {
    if (newVariant && !selectedVariants.includes(newVariant)) {
      setSelectedVariants([...selectedVariants, newVariant]);
      setVariantImages({ ...variantImages, [newVariant]: null }); // Initialize state for new variant image
      setNewVariant(''); // Clear the input field
    }
  };

  const handleVariantImageChange = (variant, file) => {
    setVariantImages({
      ...variantImages,
      [variant]: file, // Update the image for the specific variant
    });
  };

  return (
    <div className='container mx-auto mt-10'>
      <Dialog size="sm" open={isModalOpen} handler={closeModal} className="p-4">
        <DialogHeader className="relative m-0 block">
          <Typography variant="h4" color="blue-gray">
            {editingMenuId ? 'Edit Menu Item' : 'Add Menu Item'}
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
        <DialogBody className="space-y-4 pb-6 max-h-[70vh] overflow-y-auto">
          {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Menu Name
            </Typography>
            <Input
              color="gray"
              size="lg"
              placeholder="e.g. Ice Cream Vanilla"
              value={menuName}
              onChange={(e) => setMenuName(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Category
            </Typography>
            <select
              className="block w-full mt-2 p-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.categoryName}>{cat.categoryName}</option>
              ))}
            </select>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Type
            </Typography>
            <select
              className="block w-full mt-2 p-2 border rounded"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Select a type</option>
              {types.map((t) => (
                <option key={t.id} value={t.typeName}>{t.typeName}</option>
              ))}
            </select>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Description
            </Typography>
            <textarea
              className="block w-full mt-2 p-2 border rounded"
              rows="4"
              placeholder="Enter description here"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Price
            </Typography>
            <Input
              color="gray"
              size="lg"
              type="number"
              placeholder="e.g. 9.99"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isAvailable}
              onChange={() => setIsAvailable(!isAvailable)}
              className="mr-2"
            />
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Available
            </Typography>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Measurement
            </Typography>
            <select
              className="block w-full mt-2 p-2 border rounded"
              value={measurement}
              onChange={(e) => setMeasurement(e.target.value)}
            >
              <option value="">Select a measurement</option>
              {measurements.map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Variants
            </Typography>
            <div className="flex mb-4">
              <Input
                color="gray"
                size="lg"
                placeholder="Add new variant"
                value={newVariant}
                onChange={(e) => setNewVariant(e.target.value)}
                className="mr-2"
              />
              <Button onClick={handleAddVariant}>Add</Button>
            </div>
            {selectedVariants.map((variant, index) => (
              <div key={index} className="flex items-center mb-2">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  {variant}
                </Typography>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleVariantImageChange(variant, e.target.files[0])}
                  className="ml-2"
                />
              </div>
            ))}
          </div>
          <div>
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Upload Image
            </Typography>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="block w-full mt-2 p-2 border rounded"
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Loading...' : (editingMenuId ? 'Update Menu Item' : 'Add Menu Item')}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Dialog for showing images */}
      <Dialog size="lg" className="bg-white max-h-svh" open={dialogOpen} handler={() => setDialogOpen(false)}>
        <DialogHeader className="justify-between">
          <Typography variant="h6" color="blue-gray">
            {activeTitle}
          </Typography>
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
            onClick={() => setDialogOpen(false)}
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
            Menu Items
          </Typography>
          <Button onClick={() => openModal()} variant="gradient" className="ml-1">
            Add Menu Item
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
            {menuItems.length > 0 ? (
              menuItems.map((menu) => (
                <tr key={menu.id} className={`even:bg-blue-gray-50/50`}>
                  <td className="p-4">
                    {menu.image && (
                      <img
                        src={menu.image}
                        alt={menu.menuName}
                        className="h-16 w-16 rounded-md cursor-pointer object-cover"
                        onClick={() => {
                          setActive(menu.image);
                          setActiveTitle(menu.menuName);
                          setActiveDescription(menu.description);
                          setDialogOpen(true);
                        }}
                      />
                    )}
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menu.menuName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menu.category}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menu.type}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menu.description}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      Rp. {menu.price.toFixed(2)}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menu.isAvailable ? 'Yes' : 'No'}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {menu.measurement}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {Array.isArray(menu.variants) && menu.variants.length > 0
                        ? menu.variants.map(v => v.name).join(', ') 
                        : 'None'}
                    </Typography>
                  </td>
                  <td className="p-4 flex items-center">
                    <IconButton onClick={() => openModal(menu)} className="mr-2">
                      <PencilSquareIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <IconButton color='red' onClick={() => handleDelete(menu.id)}>
                      <TrashIcon color='white' width={16} height={16}/>
                    </IconButton>
                    <Button
                      onClick={() => handleToggleAvailability(menu)}
                      className={`ml-2 ${menu.isAvailable ? 'bg-red-500' : 'bg-green-500'} text-white`}
                    >
                      {menu.isAvailable ? 'Unavailable' : 'Available'}
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="py-2 px-4 border-b text-center" colSpan="10">
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

export default AdminMenu;
