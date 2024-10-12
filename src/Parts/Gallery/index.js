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

// Function to fetch Instagram media with optional pagination
const fetchInstagramMedia = async (nextUrl = `/api/instagram`) => {
    try {
        const response = await fetch(nextUrl);
        const result = await response.json();
        return result || { data: [], paging: {} };
    } catch (error) {
        console.error("Error fetching Instagram media from backend:", error);
        return { data: [], paging: {} };
    }
};

const GallerySection = ({ totalMaxData = 8, classes = "", isLink = false }) => {
    const [activeTab, setActiveTab] = useState('Photo');
    const [photos, setPhotos] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [nextPage, setNextPage] = useState(null);  // Store the next page URL for pagination
    const [isLoadingMore, setIsLoadingMore] = useState(false);  // State to track if more data is loading

    const tabList = [
        { id: '0', typeName: 'Photo' },
        { id: '1', typeName: 'Video' },
    ];

    // Initial data fetch
    useEffect(() => {
        fetchInstagramMedia().then(({ data, paging }) => {
            if (Array.isArray(data)) {
                const photoItems = data.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM');
                const videoItems = data.filter(item => item.media_type === 'VIDEO');

                setPhotos(photoItems);
                setVideos(videoItems);
            }
            setLoading(false);

            // Set the next page URL for pagination, if it exists
            if (paging && paging.next) {
                setNextPage(paging.next);
            }
        });
    }, []);

    // Function to handle "Load More" button
    const loadMoreMedia = () => {
        if (!nextPage) return;

        console.log(nextPage);

        setIsLoadingMore(true);  // Show loading while fetching more data

        fetchInstagramMedia(nextPage).then(({ data, paging }) => {
            if (Array.isArray(data)) {
                const photoItems = data.filter(item => item.media_type === 'IMAGE' || item.media_type === 'CAROUSEL_ALBUM');
                const videoItems = data.filter(item => item.media_type === 'VIDEO');

                setPhotos(prevPhotos => [...prevPhotos, ...photoItems]);  // Append new photos
                setVideos(prevVideos => [...prevVideos, ...videoItems]);  // Append new videos
            }

            setIsLoadingMore(false);  // Hide loading after fetch is complete

            // Update the next page URL for pagination, if it exists
            if (paging && paging.next) {
                setNextPage(paging.next);
            } else {
                setNextPage(null);  // No more pages
            }
        });
    };

    const navigate = useNavigate();
    const sectionRef = useRef(null);

    return (
        <section id="GallerySection" ref={sectionRef}>
            <div className={`bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px] ` + classes}>
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    <Zoom>
                        <TitleComponent
                            classes="text-mainyellow-900"
                            title="Gallery Instagram"
                            description="Lihat koleksi momen spesial dan inspirasi terbaru dari Instagram kami!"
                            descClass="text-white"
                        />
                    </Zoom>
{/* 
                    {isLink && photos.length > 0 && (
                        <Carousel className="rounded-xl max-h-[400px]" autoplay={true} loop={true}>
                            {photos.slice(0, totalMaxData).map((photo, index) => (
                                <img
                                    key={photo.id}
                                    src={photo.media_url}
                                    alt={`image ${index + 1}`}
                                    className="max-h-[400px] w-full object-contain"
                                />
                            ))}
                        </Carousel>
                    )} */}

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
                                        className="text-mainyellow-900 pb-3"
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
                                    {loading ? (
                                        <p>Loading...</p>
                                    ) : typeName === 'Photo' && photos.length > 0 ? (
                                        <div className="mt-6 grid grid-cols-1 gap-x-2 gap-y-2 sm:grid-cols-2 lg:grid-cols-4">
                                            {photos.slice(0, totalMaxData).map((photo, index) => (
                                                <Zoom key={photo.id} delay={index * 50}>
                                                    <div className="group relative cursor-pointer">
                                                        <div className="h-72 w-72 overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 group-hover:scale-105 transition ease-in-out ">
                                                            <img
                                                                alt={photo.caption || 'Instagram Photo'}
                                                                src={photo.media_url}
                                                                className="h-full w-full object-cover object-center "
                                                            />
                                                        </div>
                                                    </div>
                                                </Zoom>
                                            ))}
                                        </div>
                                    ) : typeName === 'Video' && videos.length > 0 ? (
                                        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                            {videos.slice(0, totalMaxData).map((video, index) => (
                                                <Zoom key={video.id} delay={index * 50}>
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
                                    ) : (
                                        <p>No media available</p>
                                    )}
                                </TabPanel>
                            ))}
                        </TabsBody>
                    </Tabs>

                    {/* Pagination: Load More button */}
                    {nextPage && (
                        <div className="flex justify-center mt-8">
                            <button
                                className="bg-mainyellow-900 text-white py-2 px-4 rounded-lg hover:bg-mainyellow-700"
                                onClick={loadMoreMedia}
                                disabled={isLoadingMore}
                            >
                                {isLoadingMore ? 'Loading more...' : 'Load More'}
                            </button>
                        </div>
                    )}

                    <div className="mx-auto max-w-96 mt-20">
                        <a
                            href={!isLink ? `/gallery` : `https://www.instagram.com/surganarasarestaurant/`}
                            style={{ borderRadius: "14px 4px 14px 4px" }}
                            className="w-full bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            {!isLink ? `Lihat gallery` : `Kunjungi Instagram Kami`}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GallerySection;
