import { useState, useEffect } from 'react';
import {
  Button,
  Dialog as DialogMT,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
 } from "@material-tailwind/react";
import { Dialog, DialogPanel, PopoverGroup } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import logo from '../../Assets/SR Logo Transparant.png';
import { Fade, Zoom } from 'react-awesome-reveal';
import { useNavigate } from 'react-router-dom';

const navigationLinks = [
  { name: 'Menu', href: '/' },
  { name: 'Service', href: '/' },
  { name: 'Package', href: '/' },
  { name: 'Venue', href: '/' },
  { name: 'Gallery', href: '/' },
  { name: 'Contact', href: '/' },
  // { name: 'Investor', href: '/investor' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)


  // Change navigation background based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 300) {
        setIsScrolled(true); // Change background color when scrolled beyond 300px
      } else {
        setIsScrolled(false); // Reset background color when scrolled above 300px
      }
    };

    window.addEventListener('scroll', handleScroll);
    // Clean up the scroll event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (section) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleOpen = () => setOpen(!open);

  return (
    
    
    <>
    <header
      className={`realtive inset-0 transition-transform sticky duration-300 w-full z-50 top-0 bg-[url('/src/Assets/bg4.svg')] px-8 bg-cover bg-center`}
    >
      <Fade delay={300}>
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-20 md:h-24 w-auto" />
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-white" />
            </button>
          </div>
          <PopoverGroup className="hidden lg:flex lg:gap-x-12">
            {navigationLinks.map((link, index) => (
              <Zoom delay={300 * index} key={index}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(link.href);
                    if (link.name === 'Venue') {
                      scrollToSection('venueSection');
                    } else if (link.name === 'Package') {
                      scrollToSection('packageSection');
                    } else if (link.name === 'Service') {
                      scrollToSection('serviceSection');
                    } else if (link.name === 'Contact') {
                      scrollToSection('contactSection');
                    } else if (link.name === 'Menu') {
                      scrollToSection('menuSection');
                      setOpen(true);
                    } else if (link.name === 'Gallery') {
                      scrollToSection('GallerySection');
                    }
                  }}
                  className="text-sm font-semibold leading-6 text-white"
                >
                  {link.name}
                </a>
              </Zoom>
            ))}
          </PopoverGroup>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <Zoom delay={2100}>
              <a
                href="https://wa.me/qr/JD5WKLTUL5LUC1"
                target="_blank"
                style={{ borderRadius: '14px 4px 14px 4px' }}
                className="leading-6 w-36 hover:bg-mainyellow-900 hover:text-maingreen-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 p-1 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                Reservasi 
              </a>
            </Zoom>
          </div>
        </nav>
      </Fade>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden z-50">
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 py-20 w-full px-6 overflow-scroll sm:max-w-sm sm:ring-1 sm:ring-gray-900/10 bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-white"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root overflow-y-auto">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6 px-2">
                {navigationLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      if (link.name === 'Venue') {
                        scrollToSection('venueSection');
                      } else if (link.name === 'Package') {
                        scrollToSection('packageSection');
                      } else if (link.name === 'Service') {
                        scrollToSection('serviceSection');
                      } else if (link.name === 'Contact') {
                        scrollToSection('contactSection');
                      } else if (link.name === 'Menu') {
                        scrollToSection('menuSection');
                        setOpen(true);

                      } else if (link.name === 'Gallery') {
                        scrollToSection('GallerySection');
                      }
                    }}
                    className="-mx-3 block rounded-lg px-4 py-2 font-light text-sm leading-7 text-white hover:bg-mainyellow-900/50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <a
                  href="https://wa.me/qr/JD5WKLTUL5LUC1"
                  target="_blank"
                  style={{ borderRadius: '14px 4px 14px 4px' }}
                  className="leading-6 w-full hover:bg-mainyellow-900 hover:text-maingreen-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 p-1 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                >
                  Reservasi
                </a>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>



    <DialogMT open={open} size="xl" handler={handleOpen} className="bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center z-50  overflow-y-auto">
    <DialogHeader>
        <Typography variant="h5" color="blue-gray">
            .
        </Typography>
    </DialogHeader>
    <DialogBody className="grid place-items-center gap-4">
        <Typography className="text-mainyellow-900 mb-6 font-medium" variant="h5">
            Hallo Pengunjung Surgana Rasa
        </Typography>

        <ul className="list-disc px-8 text-white"> 
            <li>Presentasi mungkin berbeda dari gambar dan dapat berubah tanpa pemberitahuan sebelumnya.</li> 
            <li>Harga belum termasuk pajak dan biaya layanan.</li> 
            <li>Harap diperhatikan bahwa makanan yang disiapkan mungkin mengandung atau diolah bersama kacang-kacangan, susu, telur, gandum, atau produk laut.</li> 
        </ul>
    </DialogBody>
    <DialogFooter className="space-x-2">
        <Button variant="text" color="white">
            Close
        </Button>
        <button 
            style={{ borderRadius: '14px 4px 14px 4px' }}
            className="w-36 font-bold bg-mainyellow-900/80 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
            type="button"
            onClick={() => {
              setOpen(false);
          }}
        >
            OK
        </button>
    </DialogFooter>
</DialogMT>

</>
  );
}
