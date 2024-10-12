
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
import GallerySection from '../../Parts/Gallery';
import FooterSection from '../../Parts/Footer';
import { VenueSection } from '../../Parts';

export default function GalleryPage() {

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
    <GallerySection totalMaxData={1000} classes={"h-full pt-24"} isLink={true}/>
    <VenueSection/>
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

    

    

         
  </>
 );

}