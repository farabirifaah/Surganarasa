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
    const [selectedSubOption, setSelectedSubOption] = useState(''); // State for selected sub-option

    const handleImageClick = (product) => {
        setActive(product.image);
        setActiveDescription(product.description);
        setActiveTitle(product.menuName);
        setVariants(product.variants || []); // Load variants for the selected product
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setDialogOpen(false);
        setSelectedSubOption(''); // Reset the selected sub-option on close
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

            // const allMenuType = { id: 'all', typeName: 'All' };
            const highlightedMenuType = { id: 'highlightedMenu', typeName: 'Our Menu' };
            setMenuTypes([highlightedMenuType, ...menuTypeList]);
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
// console.log(menuType)
            if (menuType === 'All') {
                q = query(menuCollection, where('isAvailable', '==', true), where('isHighlighted', '==', true), limit(totalMaxData)); // Limit to 8 products
            }
            else if (menuType === 'Our Menu') {
                q = query(menuCollection, where('isAvailable', '==', true), where('isHighlighted', '==', true), limit(totalMaxData)); // Limit to 8 products
            }
            else {
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
        return `${Math.round(amount)
          .toString()
          .replace(/\d(?=(\d{3})+$)/g, "$&,")}`;
      };

    useEffect(() => {
        fetchMenuTypes();
    }, []);

    useEffect(() => {
        if (activeTab) {
            fetchProducts(activeTab);
        }
    }, [activeTab]);

    const formatList = (text) => {
        return text.split('\n').map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ));
      };

    const navigate = useNavigate();

    const sectionRef = useRef(null);

    return (
        <section id="menuSection" 
            ref={sectionRef} 
            className={`bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px]  ` + classes}



        >
            <div className="w-full h-full">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <Zoom>
                        <TitleComponent
                            classes="text-mainyellow-900"
                            title="Menu Terbaik Kami"
                            description="Setiap hidangan dalam menu kami dirancang untuk menciptakan kenangan indah, menjadikan momen Anda semakin istimewa."
                            descClass="text-white"
                        />
                    </Zoom>
                    <div className="items-center flex flex-col sm:flex-row sm:flex-wrap sm:grid-cols-2 justify-between mt-10">
                       <Zoom>
                        <p className="text-mainyellow-900">
                                Jelajahi semua menu spesial kami dengan satu klik. Temukan hidangan favorit Anda sekarang!
                        </p>
                       </Zoom>
                        <Zoom>
                            <a
                                style={{ borderRadius: "14px 4px 14px 4px" }}
                                className="w-64 ml-2 my-5 bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-maingreen-900 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                href="https://surganarasa.com/buku-menu.pdf"
                                target="_blank"
                            >
                                Download Menu PDF
                            </a>
                        </Zoom>

                       </div>
                    <Tabs value={activeTab}>
                        <div className="overflow-x-auto scroll mt-8">
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
                                        <Zoom delay={index * 50}>
                                            <p className=" overflow-hidden text-ellipsis whitespace-nowrap">
                                                {/* {typeName} */}
                                            </p>
                                        </Zoom>
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </div>

                        <TabsBody className="max-w-7xl">
                            {menuTypes.map(({ id, typeName }) => (
                                <TabPanel key={id} value={typeName}>
                                    <Typography>{" "}</Typography>
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>

                    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        {products.slice(0, totalMaxData).map((product, index) => ( // Slice the product array
                            <Zoom delay={index * 100} key={product.id}>
                                <div
                                    className="group relative cursor-pointer"
                                    onClick={() => handleImageClick(product)}
                                >
                                    <div className="h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 
                                lg:aspect-none group-hover:opacity-75 group-hover:scale-105 transition ease-in-out lg:h-72">
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
                                                    Rp. {formatAmount(product.price)},-
                                                </p>
                                                <p
                                                    className="text-sm font-semibold text-white"
                                                    style={{ fontFamily: "David Libre" }}
                                                >
                                                    / {product.measurement}
                                                </p>
                                            </div>
                                            <p className="mt-2 text-sm text-white">
                                                {formatList(product.description)}
                                                
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
                                <div className="mx-auto max-w-96 mt-20 flex \ flex-col md:flex-row gap-2">
                                    <button
                                        style={{ borderRadius: "14px 4px 14px 4px" }}
                                        className="w-full bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                        onClick={() => navigate('/menu')}
                                    >
                                        Lihat Semua Menu Terbaik
                                    </button>
                                    {/* <button
                                        style={{ borderRadius: "14px 4px 14px 4px" }}
                                        className="w-full bg-maingreen-900 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                        type="button"
                                        onClick={() => window.open("https://firebasestorage.googleapis.com/v0/b/surganarasa-36192.appspot.com/o/Surgana%20Rasa-Menu-v5-rev_7-7%20(1)_compressed.pdf?alt=media&token=968dfbce-59ab-42c8-a543-855de4e4a603", "_blank")}
                                    >
                                        buku menu pdf
                                    </button> */}
                                </div>
                            </Zoom>

                        )
                    }


                </div>
            </div>

            <Dialog size="lg" className="bg-[url('/src/Assets/bg4.svg')] p-6  overflow-y-auto max-h-svh" open={dialogOpen} handler={handleDialogClose}>
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
                                className="max-h-[300px] md:max-h-[700px] w-full rounded-lg object-cover"
                                src={active}
                                alt={activeTitle}
                            />
                        </a>
                    </Zoom>

                    {/* Variants and Sub-Options Radio Buttons */}
                    <div className="mt-4">
                       

                        {variants.map((variant) => (
                            <div key={variant.name} className={`grid mb-5 ${variants.length>0 ? "grid-cols-2":" "}`}>
                                <Typography variant="h6" className="text-white">
                                    {variant.name}:
                                </Typography>
                                <br/>
                                {variant.subOptions.map((subOption) => (
                                    <div key={subOption} className={`flex items-center mt-2` }>
                                        <input
                                            type="radio"
                                            id={subOption}
                                            name="subOption"
                                            value={subOption}
                                            checked={selectedSubOption === subOption}
                                            onChange={() => setSelectedSubOption(subOption)}
                                            className="mr-2"
                                        />
                                        <label htmlFor={subOption} className="text-white">
                                            {subOption}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>

                    <Typography className="mt-5 font-normal text-white text-sm">
                        {formatList(activeDescription)}
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
