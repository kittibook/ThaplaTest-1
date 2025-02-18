import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Configurl from "../../Config";

function Dashboard(props) {
  const Navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [img, setimg] = useState(null);
  useEffect(() => {
    getimg()
  },[])

  const getimg = async() => {
    try {
      const res =await axios.get(Configurl.Url + "/getweb")
      setimg(res.data)
    } catch (error) {
      
    }
  }
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Button สำหรับเปิด Sidebar (แสดงเฉพาะในจอเล็ก) */}
      <button
        onClick={toggleSidebar}
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Overlay สำหรับ Sidebar */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        id="default-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-50 dark:bg-gray-800 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto">
          <div className="w-full h-48 flex justify-center items-center">
            <div className="avatar">
              <div className="w-32 rounded-full shadow-2xl">
                <img src={img ? img.icon : ""} />
              </div>
            </div>
          </div>
          <span className="my-3 text-2xl flex justify-center items-center" >
          {img ? img.name : ""}
          </span>
          <ul className="space-y-2 font-medium menu bg-base-200 rounded-box w-full">
            <li onClick={(e) => Navigate("/thaplatest/home/admin")}>
              <span className="ms-3">
                <i className="fa-solid fa-chart-column"></i>ผลสรุปยอด
              </span>
            </li>
            <li>
              <div className="bg-gray-200 m-2">ตั้งค่าข้อมูลระบบ</div>
              <ul>
                <li onClick={(e) => Navigate("/thaplatest/home/admin/uploaddata")}>
                  <span className="ms-3">อัพโหลดข้อมูล</span>
                </li>
                <li onClick={(e) => Navigate("/thaplatest/home/admin/datastd")}>
                  <span className="ms-3">จัดการข้อมูล</span>
                </li>
              </ul>
            </li>
            <li>
              <div className="bg-gray-200 m-2">
                <i className="fa-regular fa-screwdriver-wrench"></i>
                ตั้งค่า
              </div>
              <ul>
                <li>
                  <span
                    onClick={(e) => Navigate("/thaplatest/home/admin/settingweb")}
                    className="flex-1 ms-3 whitespace-nowrap"
                  >
                    ตั้งค่าเว็บไซต์
                  </span>
                </li>
                <li>
                  <span
                    onClick={(e) => Navigate("/thaplatest/home/admin/img")}
                    className="flex-1 ms-3 whitespace-nowrap"
                  >
                    ตั้งค่ารูปต่างๆ
                  </span>
                </li>
                <li>
                  <span
                    onClick={(e) => Navigate("/thaplatest/home/admin/level")}
                    className="flex-1 ms-3 whitespace-nowrap"
                  >
                    ตั้งค่ารูประดับการสอบ
                  </span>
                </li>
              </ul>
            </li>
            {/* <li>
              <div className="bg-gray-200 m-2">
                <i className="fa-solid fa-circle-user"></i>
                ผู้ใช้
              </div>
              <ul>
                <li>
                  <span
                    onClick={(e) => Navigate("/owneruser")}
                    className="flex-1 ms-3 whitespace-nowrap"
                  >
                    <i className="fa-solid fa-address-book"></i>พนักงาน
                  </span>
                </li>
              </ul>
            </li> */}
          </ul>
        </div>
      </aside>

      {/* Content */}
      <div className="p-4 lg:ml-64 grid grid-cols-12">{props.children}</div>
    </>
  );
}

export default Dashboard;
