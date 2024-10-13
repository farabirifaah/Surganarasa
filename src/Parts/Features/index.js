import { useEffect, useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Adjust this import based on your firebase setup


import { faWifi, faLock, faCar, faMusic, faCoffee, faLeaf, faCake, faToilet, faCalendarAlt, faUtensils, faHome, faLaptop } from '@fortawesome/free-solid-svg-icons'
import { Zoom } from 'react-awesome-reveal'
import TitleComponent from '../../Components/title'

const features = [
  {
    imageSrc:'',
    name: 'Toilet Bersih',
  },
  {
    imageSrc:'',
    name: 'Valet Parkir Gratis',
  },
  {
    imageSrc:'',
    name: 'Musik Live',
  },
  {
    imageSrc:'',
    name: 'Suasana nyaman',
  },
  {
    imageSrc:'',
    name: 'Menu Variatif',
  },
  {
    imageSrc:'',
    name: 'Venue Tradisional yang Nyaman',
  },
  {
    imageSrc:'',
    name: 'Reservasi Online',
  },
]

export default function FeatureSection() {
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'feature'));
        const servicesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCollections(servicesList);
      } catch (error) {
        console.error("Error fetching services: ", error);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px]  py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
        <Zoom>
                     <TitleComponent
                       classes="text-mainyellow-900"
                       title="Layanan Surganarasa"
                       description=""
                       descClass="text-white"
                     />
                    </Zoom>
        </div>
        <div className="mx-auto w-full">
          <dl className="grid max-full grid-cols-2 gap-x-4 gap-y-4 lg:max-w-none md:grid-cols-3 lg:grid-cols-5 lg:gap-y-16">
          {collections.map((collection, index) => (
              <Zoom key={collection.title} delay={50 * index}>
              <Card className="w-full bg-[url('/src/Assets/card.svg')] min-h-52" 
               style={{ borderRadius: "28px 28px 28px 28px", padding: 0 }}
              >
                <CardHeader
                  floated={false}
                  color="blue-gray"
                  className='mx-auto m-2 shadow-none'
                  style={{
                    borderRadius: "18px 18px 6px 6px",
                    padding: 0,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                >
                  <div className='relative max-h-28 lg:max-h-28 md:max-h-32 overflow-hidden'>
                    <img
                      src={collection.imgelink ? collection.imgelink : "https://img.freepik.com/free-vector/photos-concept-illustration_114360-193.jpg?t=st=1728790703~exp=1728794303~hmac=ab5627b392ac55b39cacd3e80dab886bc6dce0687f5f2ce71e5f5dc99b1c3ae6&w=1380"}
                      alt="ui/ux review check"
                      className='shadow-none object-cover w-full h-full'
                    />
                    <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                  </div>
                </CardHeader>

                <CardBody className='m-0 p-2'>
                  <div className="flex items-center justify-between">
                  <h3
                      className="w-full font-extrabold text-base"
                      style={{
                          fontFamily: "David Libre",
                          color: "#FFBB00",
                          textAlign: "center",
                          marginBottom: 12,
                      }}
                  >
                    {collection.title}
                    </h3>
                  
                  </div>
                </CardBody>
              </Card>
              </Zoom>
            ))}
          </dl>
          
        </div>
      </div>
    </div>
  )
}