import React, { useRef, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import TitleComponent from "../../Components/title";
import { Fade, Zoom } from "react-awesome-reveal";
import { collection, query, where, getDocs } from "firebase/firestore"; // Import Firestore methods
import { db } from "../../firebase"; // Your Firebase config

export default function PackageOtherSection({ showButton = true, maxData = 4 }) {
  const sectionRef = useRef(null);
  const [highlightedProducts, setHighlightedProducts] = useState([]); // State to hold highlighted products
  const [dialogOpen, setDialogOpen] = useState(false); // State for controlling dialog visibility
  const [active, setActive] = useState(""); // State for the active image in dialog
  const [activeVideoUrl, setActiveVideoUrl] = useState(""); // State for the active image in dialog
  const [activeTitle, setActiveTitle] = useState(""); // State for the active title in dialog
  const [activeDescription, setActiveDescription] = useState(""); // State for the active description in dialog
  const [activePrice, setActivePrice] = useState(""); // State for the active description in dialog
  const [activePax, setActivePax] = useState(""); // State for the active description in dialog
  const [hasVideo, setHasVideo] = useState(false); // State for the active description in dialog

  // Function to fetch 4 highlighted products from Firestore
  const fetchHighlightedProducts = async () => {
    try {
      const q = query(
        collection(db, "package"),
        where("isHighlight", "==", true),
        where("isOther", "==", true)
      );
      const querySnapshot = await getDocs(q);
      const productsList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Limit to 4 products (you can adjust this limit if necessary)
      setHighlightedProducts(productsList.slice(0, maxData));
    } catch (error) {
      console.error("Error fetching highlighted products:", error);
    }
  };

  const formatAmount = (amount) => {
    return `${Math.round(amount)
      .toString()
      .replace(/\d(?=(\d{3})+$)/g, "$&,")}`;
  };

  // Function to handle dialog open and pass product details
  const handleDialogOpen = (image, title, description, price, pax, videoUrl) => {
    // console.log(videoUrl);
    setActive(image);
    setActiveVideoUrl(videoUrl);
    setHasVideo(videoUrl ? true : false);
    setActiveTitle(title);
    setActiveDescription(description);
    setActivePrice(price);
    setActivePax(pax);
    setActivePax(pax);
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setActiveVideoUrl("");

  };

  // Fetch products on component mount
  useEffect(() => {
    fetchHighlightedProducts();
  }, []);

  const formatList = (text) => {
    return text.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        <br />
      </React.Fragment>
    ));
  };

  return (
    <>
      <Fade>
        <div
          ref={sectionRef}
          id="packageOtherSection"
          className="py-24 bg-[url('/src/Assets/main-bg-hp.svg')] sm:bg-[url('/src/Assets/main-bg-hp-md.svg')] lg:bg-[url('/src/Assets/main-bg-hp-md.svg')] xl:bg-[url('/src/Assets/main-bg-new.svg')] bg-no-repeat bg-cover bg-center "
          style={{
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div className="max-w-7xl pt-10 mx-auto px-4 sm:px-6 lg:px-8">
            <Zoom>
              <TitleComponent
                classes="text-mainyellow-900"
                title="Paket Lainnya!"
                description="Rasakan & Rayakan Momen Spesial dengan berbagai Paket Lain dari Surgana Rasa"
                descClass="text-white"
              />
            </Zoom>

            <div className="mt-6 grid grid-cols-1 mx-auto sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 ">
              {highlightedProducts.map((product, index) => (
                <Zoom delay={300 * index} key={product.id}>
                  <Card
                    className="w-full mx-auto h-full bg-maingreen-900 bg-[url('/src/Assets/card.svg')] bg-cover bg-center bg-no-repeat"
                    style={{ borderRadius: "40px 8px 40px 8px", padding: 0 }}
                  >
                    {product.isBestSeller && (
                      <span className="z-50 absolute top-0.5 right-0.5 grid min-h-[30px] min-w-[140px] -translate-y-2/4 place-items-center rounded-lg bg-pink-400 py-1 px-1 text-xs text-white">
                        Best Seller
                      </span>
                    )}
                    <CardHeader
                      shadow={false}
                      floated={false}
                      className="m-2"
                      style={{
                        borderRadius: "31px 6px 6px 6px",
                        padding: 0,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                      }}
                    >
                      <img
                        src={product.imageSrc}
                        alt={product.imageAlt || "Product image"}
                        className="max-h-44 w-full min-h-44 object-cover object-center cursor-pointer"
                        onClick={() =>
                          handleDialogOpen(
                            product.imageSrc,
                            product.name,
                            product.description,
                            product.price,
                            product.pax,
                            product.videoUrl  
                          )
                        }
                      />
                    </CardHeader>

                    {/* Flex container to push the button to the bottom */}
                    <div className="flex flex-col min-h-72 overflow-auto">
                      <CardBody className="flex-grow min-h-[260px]">
                        <div className="mb-3 flex items-center justify-between w-full text-center">
                          <Typography
                            className="w-full font-semibold"
                            style={{
                              fontFamily: "David Libre",
                              fontSize: 20,
                              color: "#FFBB00",
                              textAlign: "center",
                            }}
                          >
                            {formatList(product.name)}
                          </Typography>
                        </div>
                        <Typography className="font-normal text-white size text-xs mb-2">
                          Mulai dari
                        </Typography>
                        <div className="flex flex-row md:content-between md:justify-between ">
                          <Typography
                            className="w-full font-semibold"
                            style={{
                              fontFamily: "David Libre",
                              fontSize: 20,
                              color: "#FFBB00",
                              textAlign: "left",
                            }}
                          >
                            Rp. {formatAmount(product.price)},- 
                          </Typography>
                          <Typography className="font-normal text-white size text-xs w-32 text-right origin-bottom-right pt-2">
                            / {product.pax == "1" ? '' : product.pax} pax
                          </Typography>
                        </div>
                        <Typography
                          className="mt-5 font-normal text-white text-xs overflow-hidden"
                          style={{
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 3,
                          }}
                        >
                          {formatList(product.description)}
                        </Typography>
                      </CardBody>

                      {/* CardFooter is at the bottom now */}
                      <CardFooter className="pt-0 mt-auto">
                        <button
                          style={{ borderRadius: "14px 4px 14px 4px" }}
                          className="w-full hover:bg-mainyellow-900 hover:text-maingreen-900 border-mainyellow-900 text-mainyellow-900 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                          type="button"
                          onClick={() =>
                            handleDialogOpen(
                              product.imageSrc,
                              product.name,
                              product.description,
                              product.price,
                              product.pax,
                              product.videoUrl  
                            )
                          }
                        >
                          Lihat Paket
                        </button>
                      </CardFooter>
                    </div>
                  </Card>
                </Zoom>
              ))}
            </div>
            <Zoom delay={500}>
              <div className="mx-auto max-w-96 mt-20">
                {showButton && (
                  <a
                    href="/package"
                    style={{ borderRadius: "14px 4px 14px 4px" }}
                    className="w-full bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                    type="button"
                  >
                    Lihat Semua Paket
                  </a>
                )}
              </div>
            </Zoom>
          </div>
        </div>
      </Fade>

      {/* Dialog component */}
      <Dialog
        size="lg"
        className="bg-[url('/src/Assets/bg4.svg')] p-6  overflow-y-auto max-h-screen mt-10"
        open={dialogOpen}
        handler={handleDialogClose}
      >
        <DialogHeader className="justify-between">
        <p>{" "}</p>
         
        </DialogHeader>
        <DialogBody className="">
        <div className={`grid gap-4 ${hasVideo ? 'lg:grid-cols-2 md:grid-cols-1' : 'grid-cols-1'}`}>
          <a href={active} target="_blank" rel="noopener noreferrer">
            <img
              className={`h-64 max-h-[275px] lg:h-96 xl:h-96 ${hasVideo ? 'w-full' : 'mx-auto'} md:h-auto sm:h-auto w-full rounded-lg object-cover object-center`}
              src={active}
              alt={activeTitle}
            />
          </a>
          {activeVideoUrl && (
            <video
              className="w-full h-full md:max-h-[275px] lg:h-96 xl:h-96 rounded-lg object-cover object-center"
              controls
              autoPlay
            >
              <source src={activeVideoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

          <Typography
            variant="h6"
            className="w-full font-semibold mt-5"
            style={{
              fontFamily: "David Libre",
              fontSize: 26,
              color: "#FFBB00",
              textAlign: "center",
            }}
          >
            {activeTitle}{hasVideo}
          </Typography>
          <div className="flex flex-row content-between mt-5 justify-between ">
            <Typography
              className="w-full font-semibold"
              style={{
                fontFamily: "David Libre",
                fontSize: 20,
                color: "#FFBB00",
                textAlign: "left",
              }}
            >
              Rp. {formatAmount(activePrice)},-
            </Typography>
            <Typography className="font-normal text-white size text-xs w-32 text-right origin-bottom-right pt-2">
              / {activePax == "1" ? '' : activePax} pax
            </Typography>
          </div>
          <Typography className="mt-5 font-normal text-white text-sm leading-6">
          {formatList(activeDescription)}
            {/* {activeDescription} */}
          </Typography>
        </DialogBody>
        <DialogFooter className="wrap text-wrap">
        <a
            href="https://wa.me/qr/JD5WKLTUL5LUC1"
            target="_blank"
            style={{ borderRadius: "14px 4px 14px 4px" }}
            className="w-full font-bold bg-mainyellow-900/80 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Reservasi
          </a>
          <button
            onClick={handleDialogClose}
            style={{ borderRadius: "14px 4px 14px 4px" }}
            className="w-full font-bold bg-mainyellow-900/10 mt-2 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Close
          </button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
