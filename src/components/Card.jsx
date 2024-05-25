import { FaMobile } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

gsap.registerPlugin(useGSAP);

const Card = ({
  image,
  companyName,
  phone,
  whatsappNumber,
  tagLine,
  firstName,
  lastName,
  email,
  linkedin,
  instagram,
  facebook,
  twitter,
  mapLocation,
}) => {
  document.title = `${companyName} | Contact Card`;
  const containerRef = useRef(null);
  const cursorRef = useRef(null);

  useGSAP(() => {
    gsap.from(containerRef.current, {
      y: 300,
      opacity: 0,
      duration: 1,
      ease: "expo.inOut",
    });

    gsap.from("#image", {
      y: 200,
      duration: 2,
      scale: 5,
      ease: "sine.inOut",
    });
    gsap.from("#title", {
      opacity: 0,
      duration: 1,
      delay: 1,
      ease: "power4.out",
    });
  }, []);

  useEffect(() => {
    document.addEventListener("mousemove", (e) => {
      const cursor = cursorRef.current;
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 1,
        ease: "back", // Changed ease to power4.out for smoother transition
      });
    });
  }, []);

  // FUNCTION TO SAVE CONTACT
  const saveContact = () => {
    const vCardData = `
BEGIN:VCARD
VERSION:3.0
FN:${firstName} ${lastName}
ORG:${companyName}
TEL;TYPE=work,voice:${phone}
EMAIL:${email}
END:VCARD
    `.trim(); // Trim to remove any leading/trailing whitespace

    const blob = new Blob([vCardData], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${companyName}-contact.vcf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      {/* Cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-[50px] h-[50px] bg-yellow-500 shadow-lg bg-opacity-20 rounded-full z-30 "
        id="cursor"
      ></div>
      <div
        className="w-[90vw] md:w-[40vw]    rounded-2xl   shadow-xl bg-white bg-opacity-5 brightness-105 mx-auto overflow-clip"
        ref={containerRef}
      >
        <div className="flex flex-col-reverse gap-5 lg:flex-row justify-between items-center lg:px-8  py-5">
          {/* Company logo */}
          <div
            id="image"
            className="rounded-full w-fit backdrop-blur-2xl shadow-md  -left-9 lg:-left-12 -top-16 p-1 overflow-hidden shadow-purple-500 "
          >
            <img
              src={image}
              className="rounded-full  transform hover:scale-105 transition-all duration-300 ease-linear w-full"
            />
          </div>
          {/* Company title */}
          <div className=" ">
            <h2
              className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-500 to-purple-300 bg-clip-text text-transparent "
              id="title"
            >
              {companyName}
            </h2>
            <span className="text-sm lg:text-md font-extralight ">
              {tagLine}
            </span>
          </div>
        </div>
        {/* More Information */}
        <div className=" mx-5 lg:ml-8 flex flex-col lg:flex-row justify-between items-center md:gap-5">
          {/* Contact Information */}
          <div
            className="grid grid-cols-4 lg:grid-cols-2 text-xl gap-4 lg:gap-3 lg:text-2xl justify-center items-start  "
            id="contact"
          >
            <div
              className="flex gap-2 justify-center items-center bg-white  p-5 text-center lg:p-8 rounded-2xl bg-opacity-10 border hover:bg-opacity-20 transition-all ease-in-out duration-300 cursor-pointer"
              onClick={saveContact}
              title="Save Contact"
            >
              <FaUser className="text-purple-500 hover:text-white hover:shadow-md hover:translate-y-5 hover:scale-125 translate transition-all ease-in-out duration-300 cursor-pointer" />
              {/* <span className=""> Raj Padval</span> */}
            </div>
            <a
              href={`tel:+91${phone}`}
              className="flex gap-2 justify-center items-center bg-white  p-5 text-center lg:p-8 rounded-2xl bg-opacity-10 border hover:bg-opacity-20 transition-all ease-in-out duration-300 cursor-pointer"
            >
              <FaMobile className="text-purple-500 hover:text-white hover:shadow-md hover:translate-y-5 hover:scale-125 translate transition-all ease-in-out duration-300 cursor-pointer " />
              {/* <span className="font-mono"> +91 9324859808</span> */}
            </a>
            <a
              href={`https://api.whatsapp.com/send/?phone=+91${whatsappNumber}&text=Hello&type=phone_number&app_absent=0`}
              target="_blank"
              className="flex gap-2 justify-center items-center bg-white  p-5 text-center lg:p-8 rounded-2xl bg-opacity-10 border hover:bg-opacity-20 transition-all ease-in-out duration-300 cursor-pointer"
            >
              <IoLogoWhatsapp className="text-purple-500 hover:text-white hover:shadow-md hover:translate-y-5 hover:scale-125 translate transition-all ease-in-out duration-300 cursor-pointer " />
              {/* <span className="font-mono"> +91 9324859808</span> */}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex gap-2 justify-center items-center bg-white  p-5 text-center lg:p-8 rounded-2xl bg-opacity-10 border hover:bg-opacity-20 transition-all ease-in-out duration-300 cursor-pointer"
            >
              <MdEmail className="text-purple-500 hover:text-white hover:shadow-md hover:translate-y-5 hover:scale-125 translate transition-all ease-in-out duration-300 cursor-pointer " />
              {/* <span className="text-lg"> rajpadval145@gmailcom</span> */}
            </a>
          </div>
          {/* map for phone */}
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.732833920805!2d72.82042337495191!3d18.943216156128166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7d1e25ee8439d%3A0x5acd924f2726ad2b!2sMarine%20Dr%2C%20Mumbai!5e0!3m2!1sen!2sin!4v1716575093259!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-[100px] rounded-xl lg:hidden my-5"
          ></iframe>
          {/* Social Links */}
          <div className="mt-0 mb-5 lg:mb-0 flex flex-col ">
            <h2 className="text-xl lg:text-2xl font-bold text-start mb-5 hidden lg:block">
              Connect with Us
            </h2>
            <div className=" lg:mr-5 grid grid-cols-2 flex-row gap-5 ">
              <a
                href={instagram}
                target="_blank"
                className="p-3 shadow-lg rounded-2xl border hover:-translate-y-4 transform transition-all duration-300 ease-in-out bg-white bg-opacity-5 hover:bg-opacity-10 flex gap-4 justify-start items-center"
              >
                <RiInstagramFill className="text-purple-500 text-xl lg:text-2xl " />
                <span>Instagram</span>
              </a>
              <a
                href={facebook}
                target="_blank"
                className="p-3 shadow-lg rounded-2xl border hover:-translate-y-4 transform transition-all duration-300 ease-in-out bg-white bg-opacity-5 hover:bg-opacity-10 flex gap-4 justify-start items-center"
              >
                <FaSquareFacebook className="text-purple-500 text-xl lg:text-2xl " />
                <span>Facebook</span>
              </a>
              <a
                href={linkedin}
                target="_blank"
                className="p-3 shadow-lg rounded-2xl border hover:-translate-y-4 transform transition-all duration-300 ease-in-out bg-white bg-opacity-5 hover:bg-opacity-10 flex gap-4 justify-start items-center"
              >
                <FaLinkedin className="text-purple-500 text-xl lg:text-2xl " />
                <span>LinkedIn</span>
              </a>
              <a
                href={twitter}
                target="_blank"
                className="p-3 shadow-lg rounded-2xl border hover:-translate-y-4 transform transition-all duration-300 ease-in-out bg-white bg-opacity-5 hover:bg-opacity-10 flex gap-4 justify-start items-center"
              >
                <FaTwitter className="text-purple-500 text-xl lg:text-2xl " />
                <span>Twitter</span>
              </a>
            </div>
          </div>
        </div>
        {/* map for pc */}
        <iframe
          src={mapLocation}
          width="600"
          height="450"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-[90%] h-[150px] rounded-xl hidden lg:block mx-auto my-6"
        ></iframe>
      </div>
    </>
  );
};

Card.propTypes = {
  image: PropTypes.string.isRequired,
  companyName: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  whatsappNumber: PropTypes.string,
  tagLine: PropTypes.string,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  linkedin: PropTypes.string,
  instagram: PropTypes.string,
  facebook: PropTypes.string,
  twitter: PropTypes.string,
  mapLocation: PropTypes.string.isRequired,
};

export default Card;
