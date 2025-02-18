import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar/Navbaruser";
import Slideshow from "./Slide";
import Footer from "./Footer/Footer";
import Configurl from "../Config";
import axios from 'axios';
export default function Home() {
  const Navigate = useNavigate();
  const [img, setimg] = useState(null);
  const [fb, setfb] = useState(null);
  useEffect(() => {
    getimg()
  },[])

  const getimg = async() => {
    try {
      const res =await axios.get(Configurl.Url + "/getimg")
      setimg(res.data)
      const fb =await axios.get(Configurl.Url + "/getweb")
      setfb(fb.data)
    } catch (error) {
      
    }
  }

  const handleNavigatefb = () => {
    window.open(fb.linkfb ? fb.linkfb  : "https://www.facebook.com/ktpbooks", '_blank'); // เปิด URL ภายนอกในแท็บใหม่
  };

  const handleNavigate = () => {
    window.open(fb.linkweb  ? fb.linkweb  : "https://www.facebook.com/ktpbooks", '_blank'); // เปิด URL ภายนอกในแท็บใหม่
  };
  return (
    <div className="w-full h-full">
        <Navbar />
        <div className="w-[100%] flex justify-center mt-10"> 
            <Slideshow/>
        </div>
        <div className=" mt-20">
            <div onClick={ e => Navigate('/form')} className=" flex justify-center"><img src={img ? img.btn1 : ""} alt="" /></div>
        </div>
        <div className=" mt-10 flex justify-center">
            <div onClick={handleNavigatefb} className=" flex justify-center"><img src={img ? img.btn2 : ""}   alt="" /></div>
            <div onClick={handleNavigate} className=" flex justify-center"><img src={img ? img.btn3 : ""} alt="" /></div>
        </div>
        <Footer/>
    </div>
  );
}
