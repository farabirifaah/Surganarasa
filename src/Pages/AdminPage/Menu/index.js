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
  const [category, setCategory] = useState(' ');
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [oldImage, setOldImage] = useState(null);
  const [price, setPrice] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);
  const [isHighlighted, setIsHighlighted] = useState(false); // New state for highlighting
  const [measurement, setMeasurement] = useState('');
  const [selectedVariants, setSelectedVariants] = useState([]);
  const [variantSubOptions, setVariantSubOptions] = useState({}); // State for sub-options
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

  const measurements = ['ons', 'kg', 'pcs', 'porsi', 'gr', 'gelas', 'buah'];

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

  useEffect(() => {
    fetchData();
    fetchCategories();
    fetchTypes();
  }, []);

  const openModal = (menu = null) => {
    if (menu) {
      setMenuName(menu.menuName);
      setCategory(menu.category);
      setType(menu.type);
      setDescription(menu.description || '');
      setPrice(menu.price || '');
      setIsAvailable(menu.isAvailable || false);
      setIsHighlighted(menu.isHighlighted || false); // Set highlighted state
      setMeasurement(menu.measurement || '');

      const currentVariants = menu.variants && Array.isArray(menu.variants) ? menu.variants : [];
      setSelectedVariants(currentVariants.map(v => v.name));
      setVariantSubOptions(
        currentVariants.reduce((acc, v) => {
          acc[v.name] = { subOptions: v.subOptions || [] };
          return acc;
        }, {})
      );

      setEditingMenuId(menu.id);
      setImage(null);
      setOldImage(menu.image)
    } else {
      setMenuName('');
      setCategory('');
      setType('');
      setDescription('');
      setPrice('');
      setIsAvailable(false);
      setIsHighlighted(false); // Reset highlighted state
      setMeasurement('');
      setImage(null);
      setEditingMenuId(null);
      setSelectedVariants([]);
      setVariantSubOptions({});
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
    setIsHighlighted(false); // Reset highlighted state
    setMeasurement('');
    setImage(null);
    setEditingMenuId(null);
    setSelectedVariants([]);
    setNewVariant('');
    setVariantSubOptions({});
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
    setIsLoading(true);
  
    if (!menuName || !category || !type || !description || !price || !measurement) {
      setErrorMessage('Please fill in all fields.');
      setIsLoading(false);
      return;
    }
  
    try {
      let imageURL = '';
  
      // Check if editing an existing menu and no new image is uploaded
      if (editingMenuId && !image) {
        const currentMenu = menuItems.find((menu) => menu.id === editingMenuId);
        imageURL = currentMenu ? currentMenu.image : '';
      } else if (image) {
        const compressedImage = await handleImageCompression(image);
        const imageRef = ref(storage, `menu_images/${compressedImage.name}`);
        const snapshot = await uploadBytes(imageRef, compressedImage);
        imageURL = await getDownloadURL(snapshot.ref);
      }
  
      const variantsWithSubOptions = selectedVariants.map((variant) => ({
        name: variant,
        subOptions: variantSubOptions[variant]?.subOptions || [],
      }));
  
      const menuData = {
        menuName,
        category,
        type,
        description,
        price: parseFloat(price),
        isAvailable,
        isHighlighted, // Save highlighted state
        measurement,
        variants: variantsWithSubOptions,
        image: imageURL,
      };
  
      if (editingMenuId) {
        const menuRef = doc(db, 'menu', editingMenuId);
        await updateDoc(menuRef, menuData);
      } else {
        await addDoc(collection(db, 'menu'), menuData);
      }
  
      closeModal();
      fetchData();
    } catch (error) {
      console.error('Error saving document: ', error);
      setErrorMessage('Error saving document: ' + error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleAddVariant = () => {
    if (newVariant && !selectedVariants.includes(newVariant)) {
      setSelectedVariants([...selectedVariants, newVariant]);
      setVariantSubOptions({ ...variantSubOptions, [newVariant]: { subOptions: [] } });
      setNewVariant('');
    }
  };

  const handleSubOptionChange = (variant, value) => {
    setVariantSubOptions({
      ...variantSubOptions,
      [variant]: {
        ...variantSubOptions[variant],
        newSubOption: value,
      },
    });
  };

  const handleAddSubOption = (variant) => {
    const newSubOption = variantSubOptions[variant]?.newSubOption?.trim();
    if (newSubOption && !variantSubOptions[variant].subOptions?.includes(newSubOption)) {
      setVariantSubOptions({
        ...variantSubOptions,
        [variant]: {
          ...variantSubOptions[variant],
          subOptions: [...(variantSubOptions[variant].subOptions || []), newSubOption],
          newSubOption: '',
        },
      });
    }
  };

  const handleDeleteVariant = (variantName) => {
    setSelectedVariants(selectedVariants.filter((variant) => variant !== variantName));
    const newVariantSubOptions = { ...variantSubOptions };
    delete newVariantSubOptions[variantName];
    setVariantSubOptions(newVariantSubOptions);
  };

  const handleDeleteSubOption = (variant, subOption) => {
    setVariantSubOptions({
      ...variantSubOptions,
      [variant]: {
        ...variantSubOptions[variant],
        subOptions: variantSubOptions[variant].subOptions.filter((so) => so !== subOption),
      },
    });
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

  const handleToggleHighlight = async (menu) => {
    const updatedHighlight = !menu.isHighlighted;
    const menuRef = doc(db, 'menu', menu.id);
    try {
      await updateDoc(menuRef, { isHighlighted: updatedHighlight });
      fetchData();
    } catch (error) {
      console.error('Error updating highlight status: ', error);
    }
  };

  const TABLE_HEAD = ["No.","Image", "Menu Name", "Category", "Type", "Description", "Price", "Available", "Highlighted", "Measurement", "Variants", "Actions"];

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
          <div className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={isHighlighted}
              onChange={() => setIsHighlighted(!isHighlighted)}
              className="mr-2"
            />
            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
              Highlighted
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
              <div key={index} className="mb-4">
                <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                  {variant}
                </Typography>
                <div className="flex items-center mb-2">
                  <Input
                    color="gray"
                    size="lg"
                    placeholder={`option for ${variant}`}
                    value={variantSubOptions[variant]?.newSubOption || ''}
                    onChange={(e) => handleSubOptionChange(variant, e.target.value)}
                    className="mr-2"
                  />
                  <Button onClick={() => handleAddSubOption(variant)}>option</Button>
                  <IconButton
                    className="ml-2"
                    onClick={() => handleDeleteVariant(variant)}
                    variant="text"
                  >
                    <TrashIcon className="h-5 w-5 text-red-500" />
                  </IconButton>
                </div>
                {variantSubOptions[variant]?.subOptions?.length > 0 && (
                  <ul className="mt-2">
                    {variantSubOptions[variant].subOptions.map((subOption, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <span>{subOption}</span>
                        <IconButton
                          className="ml-2"
                          onClick={() => handleDeleteSubOption(variant, subOption)}
                          variant="text"
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </IconButton>
                      </li>
                    ))}
                  </ul>
                )}
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
             <img
              className="h-64 mt-2 w-64 rounded-lg object-cover object-center"
              src={oldImage}
              alt={activeTitle}
            />
          </div>
        </DialogBody>
        <DialogFooter>
          <Button className="ml-auto" onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Loading...' : (editingMenuId ? 'Update Menu Item' : 'Add Menu Item')}
          </Button>
        </DialogFooter>
      </Dialog>

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
              menuItems.map((menu, index) => (
                <tr key={menu.id} className={`even:bg-blue-gray-50/50`}>
                  <td className='p-4'>
                    {index + 1}.
                  </td>
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
                      {menu.isHighlighted ? 'Yes' : 'No'}
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
                    <Button
                      onClick={() => handleToggleHighlight(menu)}
                      className={`ml-2 ${menu.isHighlighted ? 'bg-red-500' : 'bg-green-500'} text-white`}
                    >
                      {menu.isHighlighted ? 'Unhighlight' : 'Highlight'}
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
