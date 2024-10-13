
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


 return (
  <>
    <Navigation/>
    <GallerySection totalMaxData={1000} classes={"h-full pt-24"} isLink={true}/>
    <VenueSection/>
    <FooterSection/>

    

    

         
  </>
 );

}