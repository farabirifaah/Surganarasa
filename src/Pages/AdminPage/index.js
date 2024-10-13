import React, {useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { LeftNavigation } from '../../Parts/LeftNavigation';
import { useAuth } from '../../Auth';
import { signOut } from "firebase/auth";
import { auth } from "../../firebase"; // import Firebase auth
import AdminPackage from './Package';
import AdminVenue from './Venue';
import AdminService from './Service';
import HeroService from './SlideShow';
import AdminCustomer from './Customer';
import AdminMenuType from './MenuType';
import AdminMenu from './Menu';
import AdminMenuCategory from './MenuCategory';
import ContactAdmin from './Contact';
import FeatureAdmin from './Feature/Feature';
import GalleryAdmin from './Gallery';

const Home = () => <div>Home Page</div>;

const AdminPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

    const { currentUser } = useAuth();
    

    const handleLogout = async () => {
      try {
        await signOut(auth);
        setIsLoggedIn(false); // Reset login status
      } catch (error) {
        console.error("Error signing out: ", error); // Handle errors if necessary
      }
    };

    return (
      <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor:'#F6F8FB' }}>
        <LeftNavigation />
        <div style={{ flex: 1, overflow: 'auto', padding: '0px', margin: "0px" }}>
          <Routes>
            {/* Protecting admin routes */}
            <Route path="/" element={currentUser ? <Home /> : <Navigate to="/login" />} />
            <Route path="package" element={currentUser ? <AdminPackage /> : <Navigate to="/login" />} />
            <Route path="venue" element={currentUser ? <AdminVenue /> : <Navigate to="/login" />} />
            <Route path="feature" element={currentUser ? <FeatureAdmin /> : <Navigate to="/login" />} />
            <Route path="service" element={currentUser ? <AdminService /> : <Navigate to="/login" />} />
            <Route path="gallery" element={currentUser ? <GalleryAdmin /> : <Navigate to="/login" />} />
            <Route path="slideShow" element={currentUser ? <HeroService /> : <Navigate to="/login" />} />
            <Route path="broadcast" element={currentUser ? <AdminCustomer /> : <Navigate to="/login" />} />
            <Route path="contact" element={currentUser ? <ContactAdmin /> : <Navigate to="/login" />} />
            <Route path="menu/menu-type" element={currentUser ? <AdminMenuType /> : <Navigate to="/login" />} />
            <Route path="menu/menu-category" element={currentUser ? <AdminMenuCategory /> : <Navigate to="/login" />} />
            <Route path="menu/menu-list" element={currentUser ? <AdminMenu /> : <Navigate to="/login" />} />
            {/* Add a login route */}
          </Routes>
        </div>
      </div>
    );
};

export default AdminPage;
