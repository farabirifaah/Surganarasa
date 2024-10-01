import React, { useEffect, useState, useRef } from "react";
import { Zoom } from "react-awesome-reveal";
import TitleComponent from "../../Components/title";
import { useNavigate } from 'react-router-dom';
import {
    Typography,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { db } from '../../firebase';
import { collection, getDocs, query, where, orderBy, limit } from 'firebase/firestore';

const MenuSection = ({ totalMaxData = 8, classes, showButton = true }) => {
    const [active, setActive] = useState('');
    const [activeDescription, setActiveDescription] = useState('');
    const [activeTitle, setActiveTitle] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [menuTypes, setMenuTypes] = useState([]);
    const [products, setProducts] = useState([]);
    const [activeTab, setActiveTab] = useState('All');
    const [variants, setVariants] = useState([]); // State to hold variants
    const [selectedVariant, setSelectedVariant] = useState(''); // State for selected variant

    const handleImageClick = (product) => {
        setActive(product.image);
        setActiveDescription(product.description);
        setActiveTitle(product.menuName);
        setVariants(product.variants || []); // Load variants for the selected product
        setSelectedVariant(product.variants && product.variants.length > 0 ? product.variants[0].name : ''); // Select the first variant by default
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedVariant(''); // Reset the selected variant on close
    };

    const fetchMenuTypes = async () => {
        try {
            const menuTypeCollection = collection(db, 'menuType');
            const menuTypeQuery = query(menuTypeCollection, orderBy('sequence'));
            const menuTypeSnapshot = await getDocs(menuTypeQuery);
            const menuTypeList = menuTypeSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            const allMenuType = { id: 'all', typeName: 'All' };
            setMenuTypes([allMenuType, ...menuTypeList]);
            if (menuTypeList.length > 0) {
                setActiveTab('All');
            }
        } catch (error) {
            console.error('Error fetching menu types: ', error);
        }
    };

    const fetchProducts = async (menuType) => {
        try {
            const menuCollection = collection(db, 'menu');
            let q;

            if (menuType === 'All') {
                q = query(menuCollection, where('isAvailable', '==', true), limit(totalMaxData)); // Limit to 8 products
            } else {
                q = query(menuCollection, where('type', '==', menuType), where('isAvailable', '==', true), limit(totalMaxData)); // Limit to 8 products
            }

            const menuSnapshot = await getDocs(q);
            const productList = menuSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProducts(productList);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    const formatAmount = (amount) => {
        return `${parseFloat(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
    };

    useEffect(() => {
        fetchMenuTypes();
    }, []);

    useEffect(() => {
        if (activeTab) {
            fetchProducts(activeTab);
        }
    }, [activeTab]);

    const navigate = useNavigate();

    const sectionRef = useRef(null);

    return (
        <section id="menuSection" ref={sectionRef}>
            <div className={`bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center`}>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <Zoom>
                        <TitleComponent
                            classes="text-mainyellow-900"
                            title="Menu"
                            description="Setiap hidangan dalam menu kami dirancang untuk menciptakan kenangan indah, menjadikan momen Anda semakin istimewa."
                            descClass="text-white"
                        />
                    </Zoom>
                    {
                        !showButton && (
                            <button
                                    style={{ borderRadius: "14px 4px 14px 4px" }}
                                    className="w-64 ml-2 my-5 bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-maingreen-900 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/Surgana%20Rasa-Menu-v5-rev_7-7%20(1)_compressed.pdf?alt=media&token=968dfbce-59ab-42c8-a543-855de4e4a603", "_blank")}
                                >
                                    buku menu pdf
                                </button>
                        )
                    }
                    
                    <Tabs value={activeTab}>
                        <div className="overflow-x-auto mt-8">
                            <TabsHeader
                                className="rounded-none bg-transparent p-0 whitespace-nowrap"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-mainyellow-900 shadow-none rounded-none",
                                }}
                            >
                                {menuTypes.map(({ id, typeName }, index) => (
                                    <Tab
                                        key={id}
                                        value={typeName}
                                        onClick={() => setActiveTab(typeName)}
                                        className={`text-mainyellow-900`}
                                    >
                                        <Zoom delay={index * 150}>
                                            <p className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                                                {typeName}
                                            </p>
                                        </Zoom>
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </div>

                        <TabsBody className="max-w-5xl">
                            {menuTypes.map(({ id, typeName }) => (
                                <TabPanel key={id} value={typeName}>
                                    <Typography>{" "}</Typography>
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.slice(0, totalMaxData).map((product, index) => ( // Slice the product array
                            
                            <Zoom delay={index * 150}>
                                <div
                                key={product.id}
                                className="group relative cursor-pointer"
                                onClick={() => handleImageClick(product)}
                            >
                                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-72">
                                    <img
                                        alt={product.imageAlt}
                                        src={product.image}
                                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                    />
                                </div>
                                <div className="mt-4 flex justify-between">
                                    <div className="w-full">
                                        <h3
                                            className="w-full font-semibold"
                                            style={{
                                                fontFamily: "David Libre",
                                                fontSize: 20,
                                                color: "#FFBB00",
                                                textAlign: "center",
                                                marginBottom: 12,
                                            }}
                                        >
                                            <a>
                                                <span className="absolute inset-0 " />
                                                {product.menuName}
                                            </a>
                                        </h3>
                                        <div className="flex justify-between">
                                            <p
                                                className="text-lg font-semibold text-mainyellow-900"
                                                style={{ fontFamily: "David Libre" }}
                                            >
                                                Rp. {formatAmount(product.price)}
                                            </p>
                                            <p
                                                className="text-sm font-semibold text-white"
                                                style={{ fontFamily: "David Libre" }}
                                            >
                                                / {product.measurement}
                                            </p>
                                        </div>
                                        <p className="mt-2 text-sm text-white">
                                            {product.description}
                                        </p>

                                       {product.variants.length > 0 &&
                                         <p className="mt-2 text-sm text-red-800">
                                         klik gambar untuk melihat varian
                                     </p>
                                       }
                                    </div>
                                </div>
                            </div>
                            </Zoom>
                        ))}
                    </div>
                    {
                        showButton && (
                            <Zoom delay={500}>
                            <div className="mx-auto max-w-96 mt-20 flex">
                                <button
                                    style={{ borderRadius: "14px 4px 14px 4px" }}
                                    className="w-full bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => navigate('/menu')}
                                >
                                    Lihat Semua Menu
                                </button>
                                <button
                                    style={{ borderRadius: "14px 4px 14px 4px" }}
                                    className="w-full ml-2 bg-maingreen-900 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                    type="button"
                                    onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/Surgana%20Rasa-Menu-v5-rev_7-7%20(1)_compressed.pdf?alt=media&token=968dfbce-59ab-42c8-a543-855de4e4a603", "_blank")}
                                >
                                    buku menu pdf
                                </button>
                            </div>
                        </Zoom>
                        
                        )
                    }
                    
                        
                </div>
            </div>

            <Dialog size="lg" className="bg-[url('/src/Assets/bg4.svg')]  overflow-y-auto max-h-dvh" open={dialogOpen} handler={handleDialogClose}>
                <DialogHeader className="justify-between">
                    <Typography variant="h6" className="w-full font-semibold"
                        style={{ fontFamily: "David Libre", fontSize: 26, color: "#FFBB00", textAlign: "center" }}>
                        {activeTitle}
                    </Typography>
                </DialogHeader>
                <DialogBody>
                    <Zoom>
                        <a href={active} target="_blank" rel="noopener noreferrer">
                            <img
                                className="h-full w-full rounded-lg object-cover object-center"
                                src={active}
                                alt={activeTitle}
                                style={{ maxHeight: 600 }}
                            />
                        </a>
                    </Zoom>
                    
                    {/* Variants Radio Buttons */}
                    <div className="mt-4">
                        <p className="mt-2 text-md text-white">
                            varian : 
                        </p>
                        {variants.map((variant) => (
                            <div key={variant.name} className="flex items-center">
                                <input
                                    type="radio"
                                    id={variant.name}
                                    name="variant"
                                    value={variant.name}
                                    checked={selectedVariant === variant.name}
                                    onChange={() => {
                                        setSelectedVariant(variant.name);
                                        if(variant.image)
                                            setActive(variant.image); // Assuming variant has an imageUrl property
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor={variant.name} className="text-white">{variant.name}</label>
                            </div>
                        ))}
                    </div>

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
        </section>
    );
};

export default MenuSection;