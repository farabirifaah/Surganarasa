
import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogPanel,
  PopoverGroup,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from '../../Assets/SR Logo Transparant.png'
import { Fade, Zoom } from 'react-awesome-reveal'
import { useNavigate } from 'react-router-dom'

const navigationLinks = [
  { name: 'Menu', href: '/' },
  { name: 'Service', href: '/' },
  { name: 'Package', href: '/' },
  { name: 'Venue', href: '/' }, // Change href to a reference for scrolling
  { name: 'Investor', href: '#' },
  { name: 'Gallery', href: '#' },
  { name: 'Contact', href: '/' },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY > 1) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scrollToSection = (section) => {
    const target = document.getElementById(section);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false)
  };

  return (
    <header className={`transition-all duration-300 fixed w-full z-10 bg-maingreen-900/0`}>
      <Fade delay={300}>
        <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img alt="" src={logo} className="h-32 w-auto" />
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
                  e.preventDefault(); // Prevent default anchor behavior
                  navigate(link.href)
                  if (link.name === 'Venue') {
                    scrollToSection('venueSection'); // Scroll to venue section
                  }
                  else if (link.name === 'Package') {
                    scrollToSection('packageSection'); // Scroll to venue section
                  }
                  else if (link.name === 'Service') {
                    scrollToSection('serviceSection'); // Scroll to venue section
                  }
                  else if (link.name === 'Contact') {
                    scrollToSection('contactSection'); // Scroll to venue section
                  }
                  else if (link.name === 'Menu') {
                    scrollToSection('menuSection'); // Scroll to venue section
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
            <button 
              style={{ borderRadius: '14px 4px 14px 4px' }}
              className="leading-6 w-36 hover:bg-mainyellow-900 hover:text-maingreen-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 p-1 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
              type="button"
            >
              Reservasi
            </button>
            </Zoom>
          </div>
        </nav>
      </Fade>
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
                        scrollToSection('venueSection'); // Scroll to venue section
                      }
                      else if (link.name === 'Package') {
                        scrollToSection('packageSection'); // Scroll to venue section
                      }
                      else if (link.name === 'Service') {
                        scrollToSection('serviceSection'); // Scroll to venue section
                      }
                      else if (link.name === 'Contact') {
                        scrollToSection('contactSection'); // Scroll to venue section
                      }
                      else if (link.name === 'Menu') {
                        scrollToSection('menuSection'); // Scroll to venue section
                      }
                    }}
                    className="-mx-3 block rounded-lg px-4 py-2 font-light text-sm leading-7 text-white hover:bg-mainyellow-900/50"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
              <div className="py-6">
                <button 
                  style={{ borderRadius: '14px 4px 14px 4px' }}
                  className="leading-6 w-full hover:bg-mainyellow-900 hover:text-maingreen-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 p-1 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
                  type="button"
                >
                  Reservasi
                </button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  )
}
