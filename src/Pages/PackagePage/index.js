
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
import PackageSection from '../../Parts/Package';
import PackageOtherSection from '../../Parts/PackageOther';

export default function PackagePage() {

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
    <PackageSection showButton={false} maxData={999}/>
    <PackageOtherSection showButton={false} maxData={999}/>
    <FooterSection/>
    <ReactAudioPlayer
      ref={audioPlayerRef}
      src={music}
      volume={1}
      controls={false}
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