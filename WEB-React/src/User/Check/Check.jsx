import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Navbar/Navbaruser";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "../Report/Report";
import ComponentToPrintCertificate from "../Certificate/Certificate";
import Footer from "../Footer/Footer";
import axios from "axios";
import Configurl from "../../Config";

export default function Check() {
  // const urlSearchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash;
  const encryptedId = hash.replace('#id=', '');
  const decodeId = (encodedId) => atob(encodedId);
  const id = decodeId(encryptedId)

  
  const componentRef = useRef(null);
  const componentRefC = useRef(null);
  const print = useReactToPrint({
    contentRef: componentRef,
  });
  const handlePrint = () => {
    // ตรวจสอบว่ามีเนื้อหาหรือไม่
    if (componentRef.current && componentRef.current.innerHTML.trim() !== "") {
      print(); // Trigger the print functionality
    } else {
    }
  };
  const printC = useReactToPrint({
    contentRef: componentRefC,
  });
  const handlePrintC = () => {
    // ตรวจสอบว่ามีเนื้อหาหรือไม่
    if (componentRefC.current && componentRefC.current.innerHTML.trim() !== "") {
      printC(); // Trigger the print functionality
    } else {
    }
  };
  const [img, setimg] = useState(null);
  const [user, setuser] = useState(null);
  const [fb, setfb] = useState(null);

  useEffect(() => {
    getimg();
    getuser();
  }, []);

  const getimg = async () => {
    try {
      const res = await axios.post(Configurl.Url + "/getlevel");
      const fb = await axios.get(Configurl.Url + "/getimg");
      setfb(fb.data);
      if (res.data.success) {
        setimg(res.data.level);
      }
    } catch (error) {}
  };

  const [rankInClass, setrankInClass] = useState(null);
  const [rankOverall, setrankOverall] = useState(null);
  const getuser = async () => {
    try {
      const res = await axios.post(Configurl.Url + "/userid", {
        iduser: Number(id),
      });
      if (res.data.success) {
        setuser(res.data.user);
      }

      const res1 = await axios.post(Configurl.Url + "/NumBer", {
        id: Number(id),
      });
      if (res1.data.success) {
        setrankOverall(res1.data.rankInClass);
        setrankInClass(res1.data.rankOverall);
      }
    } catch (error) {}
  };

  return (
    <>
      <div className="w-full h-full">
        <Navbar />
        <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[50%] h-full mx-auto mt-32 rounded-lg">
          <span className="m-[15%] text-xl">ข้อมูลส่วนตัว</span>
          <div className="bg-gray-300/60 w-[90%] h-full mx-auto rounded-lg p-[5%] mt-[3%]">
            <div className="flex mt-5">
              <span className="ml-[10%] text-lg">ชื่อ : </span>
              <span className="ml-[10%] text-lg">
                {user
                  ? user.fullname
                    ? user.fullname
                    : "ไม่พบข้อมูล"
                  : "กำลังโหลดข้อมูล"}
              </span>
            </div>


            <div className="flex mt-5">
              <span className="ml-[10%] text-lg">ชั้น : </span>
              <span className="ml-[10%] text-lg">
                {user
                  ? user.class
                    ? user.class
                    : "ไม่พบข้อมูล"
                  : "กำลังโหลดข้อมูล"}
              </span>
            </div>

            <div className="flex mt-5">
              <span className="ml-[10%] text-lg">โรงเรียน : </span>
              <span className="ml-[10%] text-lg">
                {user
                  ? user.school
                    ? user.school
                    : "ไม่พบข้อมูล"
                  : "กำลังโหลดข้อมูล"}
              </span>
            </div>
          </div>

          <div className="animate-jump mt-28">
            <div className="flex justify-center">
              <img src={fb ? (fb.iconjump ? fb.iconjump : "") : ""} alt="" />
            </div>
          </div>

          <div className="mt-32">
            <span className="m-[15%] text-2xl">ผลการสอบ</span>
            <div className=" w-[90%] h-full mx-auto rounded-lg p-[5%] mt-[3%]">
              <div className="flex justify-center">
                {img
                  ? img.map((levelItem, index) =>
                      user &&
                      user.level &&
                      user.level === String(levelItem.id) ? (
                        <img
                          key={index}
                          src={levelItem.img}
                          alt={levelItem.lable}
                          className=""
                        />
                      ) : null
                    )
                  : null}
              </div>
            </div>
          </div>

          <div className="mt-32">
            <button
              onClick={handlePrint}
              className="m-[5%] text-xl text-white bg-blue-600 p-5 rounded-lg"
            >
              พิมพ์รายงาน
            </button>
            <button
              onClick={handlePrintC}
              className="m-[5%] text-xl text-white bg-blue-600 p-5 rounded-lg"
            >
              พิมพ์เกียรติบัตร
            </button>
            <div className="h-10"></div>
            <div className="bg-gray-300/60 w-[90%] h-full mx-auto rounded-lg p-[5%] mt-[3%]">
              <div className="flex justify-between">
                <div className="w-[50%] h-[90%] flex justify-center">
                  <span className="text-xl">รายวิชา</span>
                </div>
                <div className="w-[50%] h-[90%] flex justify-between">
                  <div className=" w-[50%] flex justify-center">
                    <span className="text-xl">คะแนนที่ได้</span>
                  </div>
                  {/* <div className=" w-[50%] flex justify-center">
                    <span className="text-xl">ร้อยละ</span>
                  </div> */}
                </div>
              </div>
              {user
                ? user.Score
                  ? user.Score.map((scroe, index) => (
                      <>
                        <div key={index} className="flex justify-between mt-10">
                          <div className="w-[50%] h-[90%] flex justify-center">
                            <span className="text-xl">{scroe.Class}</span>
                          </div>
                          <div className="w-[50%] h-[90%] flex justify-between">
                            <div className=" w-[50%] flex justify-center">
                              <span className="text-xl">{scroe.Score}</span>
                            </div>
                            {/* <div className=" w-[50%] flex justify-center">
                              <span className="text-xl">
                                {(() => {
                                  // ตรวจสอบว่ามี Score หรือไม่
                                  const rawScore = parseFloat(scroe.Score); // แปลงเป็นตัวเลข
                                  if (!isNaN(rawScore)) {
                                    const percentage = rawScore.toFixed(2); // คำนวณร้อยละ (สมมติคะแนนเต็ม 100)
                                    return `${percentage}%`;
                                  }
                                  return "-"; // หากไม่มีคะแนน แสดง "-"
                                })()}
                              </span>
                            </div> */}
                          </div>
                        </div>
                      </>
                    ))
                  : ""
                : ""}
            </div>

            <div className="h-32"></div>
          </div>
        </div>
      </div>
      <div className=" hidden">
        <ComponentToPrint ref={componentRef} rankInClass={rankInClass}  rankOverall={rankOverall} data={user} />
        <ComponentToPrintCertificate ref={componentRefC} data={user}  />
      </div>
      <Footer />
    </>
  );
}
