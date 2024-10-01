import React, { useState } from "react";
import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
  Accordion,
  AccordionHeader,
  AccordionBody,
  Alert,
  Input,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  PowerIcon,
  UserGroupIcon,
  PhotoIcon,
  HandRaisedIcon,
  InboxStackIcon,
  MapIcon,
  ListBulletIcon,
  CubeTransparentIcon,
  ChevronDownIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  Bars3Icon,
  RectangleStackIcon,
  TableCellsIcon,
  ViewColumnsIcon,
  RectangleGroupIcon,
  PhoneIcon
} from "@heroicons/react/24/solid"; // Ensure XMarkIcon is imported
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase"; // import Firebase auth
import { signOut } from "firebase/auth"; // import signOut function

// Define the menu data structure
const dataMenu = [
  // {
  //   id: 1,
  //   icon: <PresentationChartBarIcon className="h-4 w-5" />,
  //   title: "Dashboard",
  //   link: "/dashboard",
  // },
  {
    id: 2,
    icon: <ListBulletIcon className="h-4 w-5" />,
    title: "Data",
    subItems: [
     {
      id: 23,
      title: "Slide Show",
      link: "/admin/slideShow",
      icon: <PhotoIcon strokeWidth={3} className="h-4 w-5" />,
     },
      {
       id: 23,
       title: "Service",
       link: "/admin/service",
       icon: <HandRaisedIcon strokeWidth={3} className="h-4 w-5" />,
      },
      {
        id: 21,
        title: "Package",
        link: "/admin/package",
        icon: <InboxStackIcon strokeWidth={3} className="h-4 w-5" />,
      },
      {
       id: 22,
       title: "Venue",
       link: "/admin/venue",
       icon: <MapIcon strokeWidth={3} className="h-4 w-5" />,
     },
    ],
  },
  {
   id: 3,
   icon: <RectangleStackIcon className="h-4 w-5" />,
   title: "Menu",
   subItems: [
    {
     id: 31,
     title: "Menu Type",
     link: "/admin/menu/menu-type",
     icon: <TableCellsIcon strokeWidth={3} className="h-4 w-5" />,
    },
    {
     id: 32,
     title: "Menu Category",
     link: "/admin/menu/menu-category",
     icon: <ViewColumnsIcon strokeWidth={3} className="h-4 w-5" />,
    },
    {
     id: 33,
     title: "Menu List",
     link: "/admin/menu/menu-list",
     icon: <RectangleGroupIcon strokeWidth={3} className="h-4 w-5" />,
    },
    
   ],
 },
  
  {
   id: 13,
   icon: <UserGroupIcon className="h-4 w-5" />,
   title: "Customer",
   link: "/admin/broadcast",
 },
 {
  id: 14,
  icon: <PhoneIcon className="h-4 w-5" />,
  title: "Contact",
  link: "/admin/contact",
},
  {
    id: 15,
    icon: <PowerIcon className="h-4 w-5" />,
    title: "Log Out",
    link: "/logout",
  },
];
export default dataMenu;

export function LeftNavigation() {
  const [open, setOpen] = useState(0);
  const [openAlert, setOpenAlert] = useState(true);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [sidebarOpen, setSidebarOpen] = useState(false); // State for mobile sidebar visibility
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate(); // Hook to navigate programmatically

  const handleOpen = (value) => {
    setOpen(open === value ? 0 : value);
  };

  // Determine if a link is active
  const isActive = (link) => location.pathname === link;

  // Filter menu items based on the search query
  const filteredMenu = dataMenu.reduce((acc, item) => {
    const matchesItem = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const filteredSubItems = item.subItems
      ? item.subItems.filter((subItem) =>
          subItem.title.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

    if (matchesItem || filteredSubItems.length > 0) {
      acc.push({
        ...item,
        subItems: filteredSubItems,
      });
    }

    return acc;
  }, []);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      navigate("/login"); // Navigate to login page after logout
    } catch (error) {
      console.error("Logout Error:", error.message);
    }
  };

  return (
    <React.Fragment>
      {/* Mobile toggle button */}
      <button
        className="absolute top-4 left-4 md:hidden p-2 z-10"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {/* Toggle button icon */}
        <Bars3Icon width={20} height={20}/>
      </button>
      <div className={`fixed inset-0 z-30 md:relative ${sidebarOpen ? "block" : "hidden"} md:block`}>
        {/* Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black opacity-50" onClick={() => setSidebarOpen(false)}></div>
        )}
        <Card className={`h-full w-full max-w-[18rem] p-4 shadow-xl shadow-blue-gray-900/5 ${sidebarOpen ? "absolute" : "relative"} md:relative`}>
          
          {/* Close button for the mobile menu */}
          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="absolute top-4 left-4 -m-2.5 rounded-md p-2.5 text-black md:hidden"
          >
            <span className="sr-only">Close menu</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
          
          <div className="mb-2 flex items-center gap-4 p-4">
            {/* Logo or brand image can go here */}
          </div>
          <div className="p-2">
            <Input
              size="md"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              label="Search menu"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <List>
            {filteredMenu.map((item) =>
              item.subItems && item.subItems.length > 0 ? (
                <Accordion
                  key={item.id}
                  open={open === item.id}
                  icon={
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${open === item.id ? "rotate-180" : ""}`}
                    />
                  }
                >
                  <ListItem className={`p-0 ${isActive(item.link) ? "bg-gray-200" : ""}`} selected={open === item.id}>
                    <AccordionHeader onClick={() => handleOpen(item.id)} className="border-b-0 p-2">
                      <ListItemPrefix>{item.icon}</ListItemPrefix>
                      <Typography variant="small" color="blue-gray" className="mr-auto ml-2 font-light">
                        {item.title}
                      </Typography>
                    </AccordionHeader>
                  </ListItem>
                  <AccordionBody className="py-1">
                    <List className="p-0">
                      {item.subItems.map((subItem) => (
                        <ListItem key={subItem.id} className={`p-0 ${isActive(subItem.link) ? "bg-blue-100" : ""}`}>
                          <Link to={subItem.link} className="flex ml-3 items-center w-full h-full p-2">
                            <ListItemPrefix>{subItem.icon}</ListItemPrefix>
                            <Typography variant="small" color="blue-gray" className="ml-2 font-light">{subItem.title}</Typography>
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </AccordionBody>
                </Accordion>
              ) : (
                <ListItem key={item.id} className={`p-0 ${isActive(item.link) ? "bg-blue-100" : ""}`}>
                  <Link
                    to={item.link}
                    className="flex items-center w-full h-full p-2"
                    onClick={item.title === "Log Out" ? handleLogout : undefined} // Trigger logout on click
                  >
                    <ListItemPrefix>{item.icon}</ListItemPrefix>
                    <Typography color="blue-gray" variant="small" className="ml-2 font-light">{item.title}</Typography>
                    {item.chip && (
                      <ListItemSuffix>
                        <Chip {...item.chip} className="rounded-full" />
                      </ListItemSuffix>
                    )}
                  </Link>
                </ListItem>
              )
            )}
          </List>
          {/* <Alert open={openAlert} className="mt-auto" onClose={() => setOpenAlert(false)}>
            <CubeTransparentIcon className="mb-4 h-12 w-12" />
            <Typography variant="h6" className="mb-1">
              Upgrade to PRO
            </Typography>
            <Typography variant="small" className="font-normal opacity-80">
              Upgrade to Material Tailwind PRO and get even more components, plugins, advanced features and premium.
            </Typography>
            <div className="mt-4 flex gap-3">
              <Typography
                as="a"
                href="#"
                variant="small"
                className="font-medium opacity-80"
                onClick={() => setOpenAlert(false)}
              >
                Dismiss
              </Typography>
              <Typography as="a" href="#" variant="small" className="font-medium">
                Upgrade Now
              </Typography>
            </div>
          </Alert> */}
        </Card>
      </div>
    </React.Fragment>
  );
}
