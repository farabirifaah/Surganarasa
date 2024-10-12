import React, { useState, useRef } from "react";
import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Import your Firebase setup
import TitleComponent from "../../Components/title";
import { Zoom } from "react-awesome-reveal";

export function ContactSection14() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // State for error message

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error message

    // Validate fields
    const { firstName, email, phoneNumber, message } = formData;
    if (!firstName || !email || !phoneNumber || !message) {
      setLoading(false);
      setError("Please fill in all fields."); // Set error state
      return; // Stop the submission
    }

    try {
      await addDoc(collection(db, "contacts"), formData);
      setLoading(false);
      setSuccess(true);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        message: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
      setError("An error occurred. Please try again."); // Set error state
    }
  };

  const sectionRef = useRef(null);

  return (
    <section 
      ref={sectionRef}
      id="contactSection"
      className="bg-[url('/src/Assets/bg4.svg')] bg-repeat bg-center bg-[length:1800px_1068.44px]   py-20 px-4"
    >
      <div className="container mx-auto text-center max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
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
          <iframe className="rounded-lg w-full h-full min-h-[500px]" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3965.55538920476!2d106.6803283!3d-6.3219788!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69e57317a4c099%3A0xaeb263898d927de4!2sRestoran%20Surgana%20Rasa!5e0!3m2!1sid!2sid!4v1728713024164!5m2!1sid!2sid" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>

          </Zoom>
          <Zoom delay={200}>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
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
                  className="focus:border-mainyellow-900 border-mainyellow-900 border-t-mainyellow-900 focus:border-t-mainyellow-900 text-white"
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
              {error && (
                <Typography className="text-red-500 mt-2">
                  {error}
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
