import React, { useEffect, useState } from 'react';
import { Zoom } from 'react-awesome-reveal';
import {
  Typography,
  Card,
  Button,
  Select,
  Option
} from "@material-tailwind/react";

// Fetch Instagram media using your API endpoint
const fetchInstagramMedia = async (nextUrl = `https://surganarasa.com/instagram_api.php`) => {
  try {
    const response = await fetch(nextUrl);
    const result = await response.json();
    return result || { data: [], paging: {} };
  } catch (error) {
    console.error("Error fetching Instagram media from backend:", error);
    return { data: [], paging: {} };
  }
};

const GalleryAdmin = () => {
  const [photos, setPhotos] = useState([]); // Store image items
  const [videos, setVideos] = useState([]); // Store video items
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState(null); // Pagination state
  const [mediaTypeFilter, setMediaTypeFilter] = useState('All'); // State for media type filter

  useEffect(() => {
    // Fetch data from Instagram API
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

  // Function to copy media URL to clipboard
  const handleCopyLink = (mediaUrl) => {
    navigator.clipboard.writeText(mediaUrl)
      .then(() => {
        alert('Link copied to clipboard');
      })
      .catch((error) => {
        console.error('Error copying link:', error);
      });
  };

  // Function to handle media type filter
  const handleMediaTypeChange = (value) => {
    setMediaTypeFilter(value);
  };

  // Function to filter media based on selected media type
  const getFilteredMedia = () => {
    if (mediaTypeFilter === 'All') {
      return [...photos, ...videos];
    } else if (mediaTypeFilter === 'Photos') {
      return photos;
    } else if (mediaTypeFilter === 'Videos') {
      return videos;
    }
    return [];
  };

  const filteredMedia = getFilteredMedia(); // Filter media based on the current filter state

  const TABLE_HEAD = ["Media Type", "Caption", "Action"];

  return (
    <div className="container mx-auto mt-10">
      {loading ? (
        <div className="text-center">
          <p>Loading Instagram media...</p>
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <Typography variant="h4">Instagram Media</Typography>
            {/* Dropdown for Media Type Filter */}
            <Select
              label="Filter by Media Type"
              value={mediaTypeFilter}
              onChange={handleMediaTypeChange}
              className="w-48"
            >
              <Option value="All">All</Option>
              <Option value="Photos">Photos</Option>
              <Option value="Videos">Videos</Option>
            </Select>
          </div>

          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th key={head} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredMedia.length > 0 ? (
                  filteredMedia.map((media, index) => (
                    <tr key={index} className={`even:bg-blue-gray-50/50`}>
                      <td className="p-4">
                        {media.media_type === 'IMAGE' || media.media_type === 'CAROUSEL_ALBUM' ? (
                          <img
                            src={media.media_url}
                            alt={media.caption || 'Instagram Media'}
                            className="h-44 w-44 rounded-md object-cover"
                          />
                        ) : (
                          <video
                            src={media.media_url}
                            className="h-44 w-44 rounded-md object-cover"
                            controls
                          />
                        )}
                      </td>
                      <td className="p-4">
                        <Typography 
                          variant="small" 
                          color="blue-gray" 
                          className="font-normal"
                          style={{ maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                        >
                          {media.caption || 'No caption'}
                        </Typography>
                      </td>
                      <td className="p-4">
                        <Button
                          onClick={() => handleCopyLink(media.media_url)}
                          className="text-sm"
                          color="blue"
                          size="sm"
                        >
                          Copy Link
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="py-2 px-4 border-b text-center" colSpan="3">
                      No media available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </Card>
        </>
      )}
    </div>
  );
};

export default GalleryAdmin;
