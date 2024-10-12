import React, { useEffect, useState, useRef } from "react";
import TitleComponent from "../../Components/title";
import { Typography } from "@material-tailwind/react";
import { Fade, Zoom, Slide } from "react-awesome-reveal";
import { db } from '../../firebase'; // Adjust this import based on your firebase setup
import { collection, getDocs } from 'firebase/firestore';

export default function ServiceSection() {
  const sectionRef = useRef(null);
  const [collections, setCollections] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'service'));
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
    <Fade>
      <section
        ref={sectionRef}
        id="serviceSection"
        aria-labelledby="collections-heading"
        className="bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px]  r "
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-32 lg:max-w-none">
            <Zoom>
              <TitleComponent
                classes="text-mainyellow-900"
                title="Layanan istimewa untuk acara Anda!"
                description="Rasakan & Rayakan Momen Spesial dengan berbagai Layanan Terbaik dari Kami"
                descClass="text-white"
              />
            </Zoom>

            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6">
              {collections.map((collection, index) => (
                <Zoom delay={index * 300} key={collection.id}>
                  <div className="group relative">
                    <div className="relative w-full h-80 xl:h-64 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-1 sm:aspect-h-1 lg:aspect-w-1 lg:aspect-h-1">
                      <img
                        src={collection.imgelink} // Update this based on your data structure
                        alt={collection.imageAlt}
                        className="w-full h-full object-center object-cover"
                      />
                    </div>
                    <Slide delay={350 * index} direction="up">
                      <Typography className="w-full font-semibold py-2"
                        style={{ fontFamily: "David Libre", fontSize: 20, color: "#FFBB00", textAlign: 'left' }}>
                        {collection.title} {/* Update this based on your data structure */}
                      </Typography>
                      <p className="text-sm font-light text-white">
                        {collection.description}
                      </p>
                    </Slide>
                  </div>
                </Zoom>
              ))}
            </div>
          </div>
        </div>
      </section>
    </Fade>
  );
}
