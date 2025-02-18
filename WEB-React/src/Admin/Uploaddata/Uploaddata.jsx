import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import Swal from "sweetalert2";
import axios from "axios";
import Configurl from "../../Config";
import { useNavigate } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    verify();
  }, []);

  const verify = async () => {
    try {

      const res = await axios.post(
        Configurl.Url + "/admin/verify",
        {},
        Configurl.headers()
      );
      if (!res.data.success) {
        Navigate("/thaplatest/home/login");
      }
    } catch (error) {}
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // เก็บไฟล์ที่ผู้ใช้อัปโหลดใน state
  };
  const Upload = async () => {
    try {
      if (!file) {
        Swal.fire({
          icon: "error",
          title: "แนปไฟล์ข้อมูล",
          text: "ไฟล์ต้องเป็นนามสกุล .xlsx",
        });
        return;
      }
      Swal.fire({
        title: "Loading...",
        html: "กำลังอัพโหลดข้อมูล",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post(Configurl.Url + "/admin/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("BX_Token"),
        },
      });

      if( res.data.success ) {
        Swal.fire({
          title: "อัพโหลดข้อมูลสำเร็จ",
          icon: "success",
        });
      } else {
        Swal.fire({
          title: "เกิดข้อผิดพลาดอัพโหลดข้อมูลสำเร็จ",
          icon: "error",
        });
      }

    } catch (error) {}
  };

  return (
    <Dashboard>
      <div className=" col-span-12 text-xs sm:text-xs md:text-lg lg:text-lg">
        {" "}
        อัพโหลดข้อมูล
      </div>
      <div className=" col-span-12 h-screen flex flex-col justify-center items-center">
        <div className="w-96 h-52 ">
          {" "}
          <div className=" col-span-12 text-xs sm:text-xs md:text-lg lg:text-lg flex justify-center">
            {" "}
            อัพโหลดข้อมูล (ไฟล์ต้องเป็นนามสกุล .xlsx)
          </div>
          <div className="w-full mt-4 flex justify-center">
            <input
              type="file"
              className="file-input file-input-bordered file-input-info w-full max-w-xs"
              onChange={handleFileChange}
            />
          </div>
          <div className="w-full mt-4 flex justify-center">
            <button onClick={Upload} className="btn">
              ยืนยัน
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Dashboard>
  );
}
