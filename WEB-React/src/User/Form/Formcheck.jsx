import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbaruser";
import { useNavigate } from "react-router-dom";
import Footer from "../Footer/Footer";
import Configurl from "../../Config";
import axios from "axios";
import Swal from 'sweetalert2'
export default function Formcheck() {
  const Navigate = useNavigate();
  const [img, setimg] = useState(null);
  const [idcard, setidcard] = useState(null);
  useEffect(() => {
    getimg();
  }, []);

  const getimg = async () => {
    try {
      const res = await axios.get(Configurl.Url + "/getimg");
      setimg(res.data);
    } catch (error) {}
  };
  const encodeId = (id) => btoa(id);
  const check = async () => {
    try {
      if (idcard && idcard != null && idcard != '') {
        Swal.fire({
          title: "กำลังค้นหาข้อมูล...",
          html: "กรุณารอสักครู่กำลังค้นหาข้อมูลของท่าน",
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          },
        });
        const res = await axios.post(Configurl.Url + "/check", {idcard : idcard});
        
        if (res.data.success) {
          const encryptedId = encodeId(res.data.user.id); // เข้ารหัส ID
          Navigate(`/check#id=${encryptedId}`);
          Swal.fire({
            title: "ค้นหาข้อมูลสำเร็จ",
            icon: "success",
            timer: 1000,
          });
          // Navigate(`/check#id=${encodeURIComponent(res.data.user.id)}`);
          // Navigate('/check?id=' + res.data.user.id)
        } else {
          Swal.fire({
            title: "ไม่พบข้อมูล",
            text: "ไม่พบข้อมูลเลขบัตรประชาชน นี้!",
            icon: "error"
          });
        }
      } else {
        Swal.fire({
          title: "กรุณากรอกข้อมูล",
          text: "กรุณากรอกเลขบัตรประชาชน",
          icon: "info"
        });
      }
      

      // Navigate('/check')
    } catch (error) {}
  };
  return (
    <>
      <div className="w-full h-screen">
        <Navbar />
        <div className=" mt-20 flex justify-center">
          <span className="text-3xl">ตรวจสอบผลการสอบ</span>
        </div>
        <div className="mt-14 flex justify-center">
          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">กรอกเลขบัตรประชาชน</span>
            </div>
            <input
              value={idcard}
              onChange={(e) => setidcard(e.target.value)}
              type="text"
              placeholder="กรอกเลขบัตรประชาชน"
              className="input input-bordered w-full max-w-xs"
            />
          </label>
        </div>
        <div className="mt-14 flex justify-center">
          <div onClick={check} className=" flex justify-center">
            <img src={img ? img.btn4 : ""} alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
