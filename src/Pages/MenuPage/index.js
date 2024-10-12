
import { useState, useRef, useEffect } from 'react'
import {PlayIcon, PauseIcon } from '@heroicons/react/24/outline'
import ReactAudioPlayer from 'react-audio-player';
import music from '../../Assets/music.mp3';
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
import FooterSection from '../../Parts/Footer';

export default function MenuPage() {

  const audioPlayerRef = useRef(null);

  const [open, setOpen] = useState(false)

  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []); //

  const handleOpen = () => setOpen(!open);

  // Callback function to play audio
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
    <Navigation/>
    <MenuSection totalMaxData={1000} classes={" pt-24"} showButton={false}/>
    <FooterSection/>
    <ReactAudioPlayer
      ref={audioPlayerRef}
      src={music}
      volume={1}
      controls={false}
      autoPlay
    />
    <div className="fixed bottom-4 right-4 z-40">
      <Button
        onClick={handlePlay}
        className="bg-mainyellow-900 text-white rounded-full p-2" // Add padding for better touch target
      >
        {isPlaying ? (
          <PauseIcon width={25} height={25} />
        ) : (
          <PlayIcon width={25} height={25} />
        )}
      </Button>
    </div>

    

    <Dialog open={open} handler={handleOpen} className="bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center z-50  overflow-y-auto max-h-[400px]">
    <DialogHeader>
        <Typography variant="h5" color="blue-gray">
        <p>{" "}</p>
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
        <Button variant="text" color="white" onClick={() => {
            handlePlay();
            setOpen(false);
        }}>
            Close
        </Button>
        <button 
            style={{ borderRadius: '14px 4px 14px 4px' }}
            className="w-36 font-bold bg-mainyellow-900/80 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" 
            type="button"
            onClick={() => {
                handlePlay();
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