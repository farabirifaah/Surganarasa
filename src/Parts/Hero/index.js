import { Carousel, Typography } from "@material-tailwind/react";
import { Slide } from "react-awesome-reveal";
import { useEffect, useState } from "react";
import { db } from "../../firebase"; // Make sure to import your firebase config
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const [data, setData] = useState([]); // State to hold the hero data

  const fetchHeroData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'hero')); // Fetching from the 'hero' collection
      const heroData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setData(heroData); // Setting the fetched data to state
    } catch (error) {
      console.error("Error fetching hero data: ", error);
    }
  };

  useEffect(() => {
    fetchHeroData(); // Fetch data when component mounts
  }, []);

  // Sort data to show isFirstSlide first
  const sortedData = data.sort((a, b) => {
    if (a.isFirstSlide === b.isFirstSlide) {
      return 0; // If both are the same, keep their order
    }
    return a.isFirstSlide ? -1 : 1; // Push isFirstSlide to the front
  });

  const navigate = useNavigate();

  return (
    <Carousel autoplay={true} loop={true}>
      {sortedData.map((slide, index) => (
        <div key={index} className="relative h-full w-full">
          <img
            src={slide.imgelink}
            alt={`image ${index + 1}`}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 grid h-full w-full items-center bg-black/70">
            <div className="container mx-auto px-4 sm:px-16 w-full max-w-xs xl:max-w-screen-2xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-sm">
              <Slide>
                <Typography
                  variant="h1"
                  color="white"
                  className="mb-4 text-2xl md:text-4xl lg:text-6xl"
                  style={{ fontFamily: "David Libre" }}
                >
                  {slide.title}
                </Typography>
              </Slide>
              <Slide>
                <Typography
                  color="white"
                  className="mb-12 opacity-80 text-md md:text-xl lg:text-xl"
                >
                  {slide.description}
                </Typography>
              </Slide>
              <Slide>
                <div className="flex justify-start gap-2">
                  <button
                    onClick={()=> {navigate('/menu')}}
                    style={{ borderRadius: '14px 4px 14px 4px' }}
                    className="leading-6 w-40 sm:w-full md:w-40 h-10 bg-maingreen-900 hover:bg-maingreen-900/70 hover:text-mainyellow-900 border-maingreen-900/80 text-mainyellow-900/80 rounded-md border border-slate-300 p-1 text-center text-sm transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Menu
                  </button>
                  <button
                    style={{ borderRadius: '14px 4px 14px 4px' }}
                    className="w-60 p-1 bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 text-center text-sm transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Reservasi Sekarang
                  </button>
                </div>
              </Slide>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
