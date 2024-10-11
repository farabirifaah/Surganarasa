import React, { useState, useEffect, useRef } from "react";
import { Zoom } from "react-awesome-reveal";
import TitleComponent from "../../Components/title";
import { useNavigate } from 'react-router-dom';
import {
    TabsHeader,
    TabsBody,
    Tab,
    Tabs,
    TabPanel,
    Carousel,
} from "@material-tailwind/react";

// Helper function to fetch Instagram media using the Instagram Graph API
const fetchInstagramMedia = async () => {
    // const accessToken = "IGQWRPRnA1TDZAGR0FscXdPS0JNLTJSS0tVUjg2dzMwS0VBdXVra1ZA1Ujg4M25TY3JGWXNRbXYxcTcyTWxKdjZAzb1drbGptU0FvYTlUUUZAqYlRXQW03djZADSjE0aUNsYlR3R0NDMGU1WG9oa0JIbmxqZAE9WcUlETVEZD"; // Set your access token here
    const accessToken = " "; // Set your access token here
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;

    try {
        const response = await fetch(url);
        const result = await response.json();
        return result.data || [];
    } catch (error) {
        console.error("Error fetching Instagram media:", error);
        return [];
    }
};

const GallerySection = ({ totalMaxData = 8, classes, isLink = false}) => {
    const [activeTab, setActiveTab] = useState('Photo');
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    
    const tabList = [
        { id: '0', typeName: 'Photo' },
        { id: '1', typeName: 'Video' },
    ];

    useEffect(() => {
        // Fetch Instagram media when the component mounts
        fetchInstagramMedia().then((media) => {
            const photoItems = media.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM');
            const videoItems = media.filter(item => item.media_type === 'VIDEO');

            setPhotos(photoItems);
            setVideos(videoItems);
        });
    }, []);

    const navigate = useNavigate();
    const sectionRef = useRef(null);

    return (
        <section id="GallerySection" ref={sectionRef}>
            <div className={`bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center` + classes}>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <Zoom>
                     <TitleComponent
                       classes="text-mainyellow-900"
                       title="Gallery Instagram"
                       description="Lihat koleksi momen spesial dan inspirasi terbaru dari Instagram kami!"
                       descClass="text-white"
                     />
                    </Zoom>
                    {isLink &&
                        <Carousel className="rounded-xl max-h-[400px]" autoplay={true} loop={true}>
                            {photos.slice(0, totalMaxData).map((photo, index) => (
                                                    
                                <img
                                    src={photo.media_url}
                                    alt="image 1"
                                    className="max-h-[400px] w-full object-contain"
                                />
                            ))}
                        </Carousel>

                    }
                    
                    <Tabs value={activeTab}>
                        <div className="overflow-x-auto mt-8">
                            <TabsHeader
                                className="rounded-none bg-transparent p-0 whitespace-nowrap"
                                indicatorProps={{
                                    className: "bg-transparent border-b-2 border-mainyellow-900 shadow-none rounded-none",
                                }}
                            >
                                {tabList.map(({ id, typeName }, index) => (
                                    <Tab
                                        key={id}
                                        value={typeName}
                                        onClick={() => setActiveTab(typeName)}
                                        className={`text-mainyellow-900 pb-3`}
                                    >
                                        <Zoom delay={index * 150}>
                                            <p className="max-w-24 overflow-hidden text-ellipsis whitespace-nowrap">
                                                {typeName}
                                            </p>
                                        </Zoom>
                                    </Tab>
                                ))}
                            </TabsHeader>
                        </div>

                        <TabsBody>
                            {tabList.map(({ id, typeName }) => (
                                <TabPanel key={id} value={typeName}>
                                    {typeName === 'Photo' && (
                                        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4 ">
                                            {photos.slice(0, totalMaxData).map((photo, index) => (
                                                <Zoom key={photo.id} delay={index * 150}>
                                                    <div className="group relative cursor-pointer">
                                                        <div className="overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 group-hover:scale-105 transition ease-in-out w-full h-full">
                                                            <img
                                                                alt={photo.caption || 'Instagram Photo'}
                                                                src={photo.media_url}
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </Zoom>
                                            ))}
                                        </div>
                                    )}

                                    {typeName === 'Video' && (
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {videos.slice(0, totalMaxData).map((video, index) => (
                                                <Zoom key={video.id} delay={index * 150}>
                                                    <div className="group relative cursor-pointer">
                                                        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 group-hover:scale-105 transition ease-in-out">
                                                            <video
                                                                controls
                                                                alt={video.caption || 'Instagram Video'}
                                                                src={video.media_url}
                                                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                </Zoom>
                                            ))}
                                        </div>
                                    )}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>
                    
                    <div className="mx-auto max-w-96 mt-20">
                     <a
                       href={!isLink? `gallery`: `https://www.instagram.com/surganarasarestaurant/`}
                       // target="_blank"
                       style={{ borderRadius: "14px 4px 14px 4px" }}
                       className="w-full bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                       type="button"
                     >
                       {!isLink? `Lihat gallery`: `Kunjungi Instagram Kami`}
                     </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
