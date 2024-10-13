import React, { useRef, useEffect, useState } from "react";
import { Fade, Zoom } from "react-awesome-reveal";
import TitleComponent from "../../Components/title";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { db } from '../../firebase'; // Import your Firestore instance
import { collection, getDocs } from 'firebase/firestore';

export default function VenueSection() {
  const [data, setData] = useState([]);
  const [active, setActive] = useState('');
  const [activeDescription, setActiveDescription] = useState('');
  const [activeTitle, setActiveTitle] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  
  const sectionRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'venue')); // Replace 'venue' with your Firestore collection name
        const venues = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setData(venues);
        if (venues.length > 0) {
          setActive(venues[0].imgelink);
          setActiveDescription(venues[0].description);
          setActiveTitle(venues[0].title);
        }
      } catch (error) {
        console.error("Error fetching venues: ", error);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (imgelink, description, title, isopen) => {
    setActive(imgelink);
    setActiveDescription(description);
    setActiveTitle(title);
    setDialogOpen(isopen);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const formatList = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };


  return (
    <Fade>
      <section
        ref={sectionRef}
        id="venueSection"
        aria-labelledby="collections-heading"
        className="bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px] "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
            <Zoom>
              <TitleComponent
                classes="text-mainyellow-900"
                title="Venue"
                description="Kami memiliki beberapa venue, spot, atau tempat-tempat yang menarik untuk para pelanggan tercinta"
                descClass="text-white mb-10"
              />
            </Zoom>
            <div className="flex flex-col xl:flex-row lg:flex-row gap-4 mx-auto max-w-7xl">
              <div className="flex-1 w-full">
                {/* Left Column for Image and Thumbnails */}
                <div className="relative w-full hover:scale-105 hover:z-10 transition ease-in-out  ">
                  <Zoom>
                    <img
                      id="image"
                      className="h-lvh lg:h-auto w-full max-w-full cursor-pointer max-h-[500px] rounded-lg object-cover object-center md:h-[500px]"
                      src={active}
                      alt=""
                      onClick={() => setDialogOpen(true)} // Open dialog when the active image is clicked
                    />
                  </Zoom>
                </div>
                <div className="grid gap-4 mt-4">
                  {/* Thumbnails */}
                  <div className="grid grid-cols-5 gap-4">
                    {data.map(({ imgelink, description, title }, index) => (
                      <Zoom delay={200 * index} key={index}>
                        <div className="">
                          <img
                            onClick={() => handleImageClick(imgelink, description, title, false)}
                            src={imgelink}
                            className="xl:h-20 lg:h-16 md:h-16 h-14 w-full cursor-pointer rounded-lg object-cover object-center hover:scale-110 hover:z-10 transition ease-in-out"
                            alt="gallery-image"
                          />
                          <Typography className="font-normal mt-1 text-center text-sm text-mainyellow-900">
                            {title}
                          </Typography>
                        </div>
                      </Zoom>
                    ))}
                  </div>
                </div>
              </div>

              <div className="w-full md:w-full lg:w-96 xl:w-96">
                <Zoom className="" delay={400}>
                <Card
                  className="w-full mx-auto h-full bg-maingreen-900 bg-[url('/src/Assets/spec.svg')] bg-cover bg-center bg-no-repeat rounded-[40px_8px] p-0"
                >

                    <CardHeader shadow={false} floated={false} className="m-2">
                      <Typography>
                        {''}
                      </Typography>
                    </CardHeader>
                    <div className="flex flex-col min-h-72 overflow-auto">
                      <CardBody className="flex-grow">
                        <div className="mb-3 flex items-center justify-between w-full text-center">
                          <Typography
                            className="w-full font-semibold"
                            style={{ fontFamily: "David Libre", fontSize: 26, color: "#FFBB00", textAlign: "center" }}
                          >
                            {activeTitle}
                          </Typography>
                        </div>
                        <Typography className="mt-5 font-normal text-white text-sm">
                          {formatList(activeDescription)}
                        </Typography>
                      </CardBody>
                      <CardFooter className="pt-0 mt-auto">
                        {''}
                      </CardFooter>
                    </div>
                  </Card>
                </Zoom>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dialog for displaying the active image */}
      <Dialog size="lg" className="bg-[url('/src/Assets/bg4.svg')] p-6 overflow-y-auto max-h-svh " open={dialogOpen} handler={handleDialogClose}>
        <DialogHeader className="justify-between">
          <Typography variant="h6" className="w-full font-semibold"
            style={{ fontFamily: "David Libre", fontSize: 26, color: "#FFBB00", textAlign: "center" }}>
            {activeTitle}
          </Typography>
        </DialogHeader>
        <DialogBody>
          <Zoom>
            <a href={active} target="_blank" rel="noopener noreferrer">
              <img
                className="h-64 lg:h- xl:h-full md:h-auto sm:h-auto w-full rounded-lg object-cover object-center"
                src={active}
                alt={activeTitle}
                style={{ maxHeight: 650 }}
              />
            </a>
          </Zoom>
          <Typography className="mt-5 font-normal text-white text-sm">
            {activeDescription}
          </Typography>
        </DialogBody>
        <DialogFooter>
          <button
            onClick={handleDialogClose}
            style={{ borderRadius: '14px 4px 14px 4px' }}
            className="w-full font-bold bg-mainyellow-900/80 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </Fade>
  );
}
