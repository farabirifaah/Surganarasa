import {
  HeroSection,
  VenueSection,
  ServiceSection,
} from "../../Parts";
import PackageSection from "../../Parts/Package";
import { useState, useRef, useEffect } from "react";
import { XMarkIcon, PlayIcon, PauseIcon } from "@heroicons/react/24/outline";
import ReactAudioPlayer from "react-audio-player";
import music from "../../Assets/music.mp3";
import Navigation from "../../Parts/Navigation";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import MenuSection from "../../Parts/Menu";
import ContactSection from "../../Parts/Contact";
import FooterSection from "../../Parts/Footer";
import InstagramFeed from "../../Parts/Gallery";
import FeatureSection from "../../Parts/Features";
import PackageOtherSection from "../../Parts/PackageOther";
import PromoSection from "../../Parts/Promo";

export default function LandingPage() {
  const audioPlayerRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll handler to detect scroll position and change navigation background
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY; // Get current scroll position
      setIsScrolled(currentScrollY > 1080); // Set isScrolled based on scroll position
      // console.log(`Current scroll position: ${currentScrollY}`); // Log scroll position
    };
  
    window.addEventListener('scroll', handleScroll); // Add scroll event listener
  
    // Cleanup on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  

  useEffect(() => {
    // document.title = "Surganarasa"; // Set page title
    setOpen(true); // Open the dialog on page load
  }, []);

  // Toggle modal open state
  const handleOpen = () => setOpen(!open);

  // Play/pause audio based on the current state
  const handlePlay = () => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.audioEl.current.pause();
        setIsPlaying(false);
      } else {
        audioPlayerRef.current.audioEl.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <Navigation />
      <HeroSection />
      <ServiceSection />
      <FeatureSection />
      <PackageSection />
      <PackageOtherSection />
      <VenueSection />
      <InstagramFeed />
      <MenuSection />
      <ContactSection />
      <FooterSection />

      {/* Scroll Position Debug */}

      {/* Audio Player */}
      <ReactAudioPlayer
        ref={audioPlayerRef}
        src={music}
        volume={1}
        controls={false}
      />

      {/* Audio Control and Instagram Button */}
      <div className="fixed bottom-4 right-4 z-40 grid grid-rows-2 gap-2">
        <a
          href="https://www.instagram.com/surganarasarestaurant/"
          className="bg-pink-300 text-white rounded-full p-2 max-w-10"
          target="_blank"

        >
          <svg
            className="h-full w-full"
            fill="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
              clipRule="evenodd"
            />
          </svg>
        </a>

        <a
          href="https://web.facebook.com/p/Surgana-Rasa-100084251025420/?_rdc=1&_rdr"
          className="bg-blue-800 text-white rounded-full p-2 max-w-10"
          target="_blank"
        >
          <svg className="w-full h-full" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
        </a>


        <Button
          onClick={handlePlay}
          className="bg-mainyellow-900 text-white rounded-full p-2 max-w-10"
        >
          {isPlaying ? <PauseIcon className="w-full h-full" /> : <PlayIcon className="w-full h-full" />}
        </Button>
      </div>

      {/* Modal Dialog */}
      <Dialog
      size="lg"
        open={open}
        handler={handleOpen}
        className="bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center z-50"
      >
        <DialogHeader>
          <Typography variant="h5" color="blue-gray">
            {" "}
          </Typography>
        </DialogHeader>
        <DialogBody className="grid place-items-center gap-6 px-10 overflow-y-auto max-h-[500px]">
         
          <Typography variant="paragraph" className="text-center text-white">
            Dengan rasa syukur yang tak terhingga, kami ingin mengucapkan terima kasih
            atas kesetiaan Anda sebagai pelanggan Surgana Rasa. Anda adalah pelanggan yang
            berharga dan kami merasa terhormat memiliki Anda sebagai salah satu pelanggan
            kami.
          </Typography>
          <Typography variant="paragraph" className="text-center text-white">
            Selama bertahun-tahun, kehadiran Anda secara teratur telah menjadikan Anda
            sebagai anggota penting dari keluarga Surgana Rasa. Dukungan Anda yang terus
            menerus adalah motivasi terbesar kami dalam mengejar kesempurnaan kuliner.
          </Typography>
          <Typography variant="paragraph" className="text-center text-white">
            Kami menikmati setiap hidangan yang Anda nikmati bersama kami, setiap momen
            yang Anda habiskan di restoran kami. Kepuasan Anda adalah prioritas utama
            kami dan kami akan melakukan segala cara untuk terus memberikan pengalaman
            bersantap yang tak terlupakan bagi Anda.
          </Typography>
          <Typography variant="paragraph" className="text-center text-white">
            Jangan ragu untuk memberi tahu kami saran, preferensi, atau kebutuhan spesifik
            Anda. Kami di sini untuk melayani Anda dan membuat setiap kunjungan Anda ke
            Surgana Rasa menjadi luar biasa.
          </Typography>
          <Typography variant="paragraph" className="text-center text-white">
            Kami menantikan kedatangan Anda kembali dan terus memanjakan lidah Anda.
          </Typography>
          <Typography variant="paragraph" className="text-center text-white">
            Hormat kami,
          </Typography>
          <Typography variant="paragraph" className="text-center text-mainyellow-900 font-extrabold ">
            Surgana Rasa
          </Typography>

        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="white" onClick={handleOpen}>
            Close
          </Button>
          <button
            style={{ borderRadius: "14px 4px 14px 4px" }}
            className="w-36 font-bold bg-mainyellow-900/80 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
            onClick={() => {
              // handlePlay();
              setOpen(false);
            }}
          >
            OK
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
