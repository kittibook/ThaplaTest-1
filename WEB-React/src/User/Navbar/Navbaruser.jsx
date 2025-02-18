import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Configurl from "../../Config";

export default function Navbar() {
  const Navigate = useNavigate();
  const [img, setimg] = useState(null);
  const [fb, setfb] = useState(null);
  useEffect(() => {
    getimg()
  },[])

  const getimg = async() => {
    try {
      const res =await axios.get(Configurl.Url + "/getimg")
      const fb =await axios.get(Configurl.Url + "/getweb")
      setfb(fb.data)
      setimg(res.data)
    } catch (error) {
      
    }
  }
  const handleNavigatefb = () => {
    window.open('https://www.facebook.com/profile.php?id=100064631291938', '_blank'); // เปิด URL ภายนอกในแท็บใหม่
  };
  return (
    <div className="navbar bg-base-100">
      {/* Navbar Start */}
      <div className="navbar-start">
        <img
          className="w-10 h-10 rounded-xl mx-2"
          src={img ? img.iconnavbar: ""}
          alt=""
        />
        <a onClick={e=> Navigate('/')}className="btn btn-ghost text-xl">{fb ? fb.name: ""}</a>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        {/* เมนูสำหรับจอใหญ่ */}
        
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
      <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <li onClick={e=> Navigate('/form')}>
            <a>ตรวจสอบผลการสอบ</a>
          </li>
          <li onClick={handleNavigatefb}>
            <a>ติดต่อ-สอบถาม</a>
          </li>
        </ul>
        {/* Dropdown สำหรับจอเล็ก */}
        <div className="dropdown lg:hidden">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-left right-0"
          >
            <li>
              <a>ตรวจสอบผลการสอบ</a>
            </li>
            <li>
              <a>ติดต่อ-สอบถาม</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
