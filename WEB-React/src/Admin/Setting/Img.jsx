import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Configurl from "../../Config";

export default function Img() {
  const Navigate = useNavigate();

  useEffect(() => {
    verify();
    getimg();
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
  const [id, setid] = useState();
  const [img, setimg] = useState();
  const [iconnavbar, seticonnavbar] = useState();
  const [banner, setbanner] = useState();
  const [btn1, setbtn1] = useState();
  const [btn2, setbtn2] = useState();
  const [btn3, setbtn3] = useState();
  const [btn4, setbtn4] = useState();
  const [iconjump, seticonjump] = useState();
  const getimg = async () => {
    try {
      const res = await axios.get(
        Configurl.Url + "/getimg",
        {},
        Configurl.headers()
      );
      if (res.data) {
        setimg(res.data);
        setid(res.data.id);
        seticonnavbar(res.data.iconnavbar);
        setbanner(res.data.banner);
        setbtn1(res.data.btn1);
        setbtn2(res.data.btn2);
        setbtn3(res.data.btn3);
        setbtn4(res.data.btn4);
        seticonjump(res.data.iconjump);
      }
    } catch (error) {}
  };

  const edit = async () => {
    try {
      document.getElementById("my_modal_edit").showModal();
    } catch (error) {}
  };

  const submit = async () => {
    try {
      document.getElementById("my_modal_edit").close();
      //   const data = { id: idlevel, img: imglevel, lable: lablelevel };
      const data = {
        id: id,
        iconbavbar: iconnavbar,
        banner: banner,
        btn1: btn1,
        btn2: btn2,
        btn3:btn3,
        btn4 : btn4,
        iconjump : iconjump,
      };
      const res = await axios.post(
        Configurl.Url + "/admin/editImg",
        data,
        Configurl.headers()
      );
      if (res.data.success) {
        getimg();
      }
    } catch (error) {}
  };

  return (
    <Dashboard>
      <div className=" col-span-12 text-xs sm:text-xs md:text-lg lg:text-lg m-5">
        <div class="relative flex flex-col min-w-0 mt-5 mb-6 ml-5 break-words  dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border border-spacing-6 col-span-12">
          <div className="py-8 m-3">
            <div className="container mx-auto px-4">
              <div className="flex justify-between">
                <h1 className="text-2xl font-semibold mb-4">รูปต่างๆ</h1>
                <div onClick={(e) => edit()}>
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
                      d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                    />
                  </svg>
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className=" w-full ">
                  <div class="relative overflow-x-auto shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border border-spacing-6">
                    <table class="w-full text-sm text-left shadow rtl:text-right text-gray-500 dark:text-gray-400 ">
                      <thead class="text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className=" text-center font-semibold px-6 py-3 ">
                            ชื่อ
                          </th>
                          <th className="font-semibold text-center px-6 py-3 ">
                            รูป
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            icon (บนแถบเมนู มุมซ้ายบน)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.iconnavbar : ""}
                              alt=""
                            />
                          </td>
                        </tr>

                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            รูปกลางจอ (ขนาดความสูงห้ามเกิน 500px)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.banner : ""}
                              alt=""
                            />
                          </td>
                        </tr>

                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            ปุ่มตรวจสอบ (500px * 200px)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.btn1 : ""}
                              alt=""
                            />
                          </td>
                        </tr>

                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            ปุ่ม facebook (500px * 200px)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.btn2 : ""}
                              alt=""
                            />
                          </td>
                        </tr>

                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            ปุ่ม web (500px * 200px)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.btn3 : ""}
                              alt=""
                            />
                          </td>
                        </tr>

                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            ปุ่มตรวจสอบ หน้ากรอกข้อมูล (500px * 200px)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.btn4 : ""}
                              alt=""
                            />
                          </td>
                        </tr>

                        <tr className="h-20">
                          <td className="py-4 px-6 text-center">
                            icon หน้าข้อมูลส่วนตัว (500px * 200px)
                          </td>
                          <td className="py-4 px-6 text-center flex justify-center">
                            <img
                              className="w-32"
                              src={img ? img.iconjump : ""}
                              alt=""
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <dialog id="my_modal_edit" className="modal">
        <div className="modal-box">
          <div className="flex flex-row text-lg font-bold">
            <p className="text-sky-500 mx-auto">แก้ไข</p>
          </div>

          <div className="flex flex-col text-lg font-bold mt-10">
            <table class="w-full text-sm text-left shadow rtl:text-right text-gray-500 dark:text-gray-400 ">
              <thead class="text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className=" text-center font-semibold px-6 py-3 ">
                    ชื่อ
                  </th>
                  <th className="font-semibold text-center px-6 py-3 ">รูป</th>
                </tr>
              </thead>
              <tbody>
                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    icon (บนแถบเมนู มุมซ้ายบน)
                    <input
                      value={iconnavbar}
                      onChange={(e) => seticonnavbar(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img
                      className="w-32"
                      src={iconnavbar ? iconnavbar : ""}
                      alt=""
                    />
                  </td>
                </tr>

                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    รูปกลางจอ (ขนาดความสูงห้ามเกิน 500px)
                    <input
                      value={banner}
                      onChange={(e) => setbanner(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img className="w-32" src={banner ? banner : ""} alt="" />
                  </td>
                </tr>

                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    ปุ่มตรวจสอบ (500px * 200px)
                    <input
                      value={btn1}
                      onChange={(e) => setbtn1(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img className="w-32" src={btn1 ? btn1 : ""} alt="" />
                  </td>
                </tr>

                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    ปุ่ม facebook (500px * 200px)
                    <input
                      value={btn2}
                      onChange={(e) => setbtn2(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img className="w-32" src={btn2 ? btn2 : ""} alt="" />
                  </td>
                </tr>

                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    ปุ่ม web (500px * 200px)
                    <input
                      value={btn3}
                      onChange={(e) => setbtn3(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img className="w-32" src={btn3 ? btn3 : ""} alt="" />
                  </td>
                </tr>

                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    ปุ่มตรวจสอบ หน้ากรอกข้อมูล (500px * 200px)
                    <input
                      value={btn4}
                      onChange={(e) => setbtn4(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img className="w-32" src={btn4 ? btn4 : ""} alt="" />
                  </td>
                </tr>

                <tr className="h-20">
                  <td className="py-4 px-6 text-center">
                    icon หน้าข้อมูลส่วนตัว (500px * 200px)
                    <input
                      value={iconjump}
                      onChange={(e) => seticonjump(e.target.value)}
                      type="text"
                      placeholder=""
                      className="input input-bordered w-full max-w-xs mt-2"
                    />
                  </td>
                  <td className="py-4 px-6 text-center flex justify-center">
                    <img
                      className="w-32"
                      src={iconjump ? iconjump : ""}
                      alt=""
                    />
                  </td>
                </tr>
              </tbody>
            </table>

            <button onClick={submit} className="btn text-sky-500 mt-5">
              ยืนยันการแก้ไข
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Dashboard>
  );
}
