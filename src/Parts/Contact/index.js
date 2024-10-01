import React, { useState, useRef } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import your Firebase setup
import image from '../../Assets/map.svg';
import TitleComponent from "../../Components/title";
import { Zoom } from "react-awesome-reveal";

export function ContactSection14() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "", // Added phone number to the state
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, "contacts"), formData);
      setLoading(false);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "", // Reset phone number after submission
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };
  

  const sectionRef = useRef(null);

  return (
    <section 
     ref={sectionRef}
        id="contactSection"
    className="bg-[url('/src/Assets/bg4.svg')] bg-cover bg-center py-20">
      <div className="container mx-auto text-center">
        <Zoom className="mb-10">
          <TitleComponent
            classes="text-mainyellow-900"
            title="Contact!"
            description="Ingin merayakan momen spesial? Kontak kami untuk paket yang tepat dan layanan terbaik!"
            descClass="text-white"
          />
        </Zoom>
        <div className="grid grid-cols-1 gap-x-12 gap-y-6 lg:grid-cols-2 items-start">
          <Zoom className="w-full h-full object-cover">
            <a
              className="w-full h-full object-cover"
              target="_blank"
              href="https://www.google.com/maps/place/Restoran+Surgana+Rasa/@-6.3219788,106.6803283,17.04z/data=!4m6!3m5!1s0x2e69e57317a4c099:0xaeb263898d927de4!8m2!3d-6.322108!4d106.6825809!16s%2Fg%2F11p102477_!5m1!1e1?entry=ttu&g_ep=EgoyMDI0MDkyNS4wIKXMDSoASAFQAw%3D%3D"
            >
              <img
                src={image}
                alt="map"
                className="w-full h-full object-cover lg:max-h-[510px] hover:scale-105 rounded-xl transition ease-linear"
              />
            </a>
          </Zoom>
          <Zoom delay={200}>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-full"
          >
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-mainyellow-900"
                >
                  First Name
                </Typography>
                <Input
                  
                  size="lg"
                  placeholder="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="focus:border-mainyellow-900 border-mainyellow-900 border-t-mainyellow-900 focus:border-t-mainyellow-900 text-white"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
              <div>
                <Typography
                  variant="small"
                  className="mb-2 text-left font-medium !text-mainyellow-900"
                >
                  Last Name
                </Typography>
                <Input
                  
                  size="lg"
                  placeholder="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="focus:border-mainyellow-900 border-mainyellow-900 border-t-mainyellow-900 focus:border-t-mainyellow-900 text-white"
                  containerProps={{
                    className: "!min-w-full",
                  }}
                  labelProps={{
                    className: "hidden",
                  }}
                />
              </div>
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-mainyellow-900"
              >
                Your Email
              </Typography>
              <Input
                
                size="lg"
                placeholder="name@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="focus:border-mainyellow-900 border-mainyellow-900 border-t-mainyellow-900 focus:border-t-mainyellow-900 text-white"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-mainyellow-900"
              >
                Phone Number
              </Typography>
              <Input
                
                size="lg"
                placeholder="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="focus:border-mainyellow-900 border-mainyellow-900 border-t-mainyellow-900 focus:border-t-mainyellow-900 text-white"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <div>
              <Typography
                variant="small"
                className="mb-2 text-left font-medium !text-mainyellow-900"
              >
                Your Message
              </Typography>
              <Textarea
                rows={6}
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="focus:border-mainyellow-900 border-mainyellow-900 border-t-mainyellow-900 focus:border-t-mainyellow-900 text-white text-white"
                containerProps={{
                  className: "!min-w-full",
                }}
                labelProps={{
                  className: "hidden",
                }}
              />
            </div>
            <button
               style={{ borderRadius: "14px 4px 14px 4px" }}
               className="w-full p-2 bg-mainyellow-900/70 hover:bg-mainyellow-900/10 hover:text-mainyellow-900 border-mainyellow-900 text-white rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
               type="submit"
           >
               {loading ? "Sending..." : "Send message"}
           </button>
            {success && (
              <Typography className="text-green-500 mt-2">
                Your message has been sent successfully!
              </Typography>
            )}
          </form>
          </Zoom>
        </div>
      </div>
    </section>
  );
}

export default ContactSection14;
