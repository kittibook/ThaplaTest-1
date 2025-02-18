import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Configurl from "../../Config";

export default function Level() {
  const Navigate = useNavigate();

  useEffect(() => {
    verify();
    getlevel();
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
  const [level, setlevel] = useState();
  const getlevel = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/getlevel",
        {},
        Configurl.headers()
      );
      if (res.data.success) {
        setlevel(res.data.level);
      }
    } catch (error) {}
  };

  const [idlevel, setidlevel] = useState();
  const [imglevel, setimglevel] = useState();
  const [lablelevel, setlablelevel] = useState();
  const edit = async (level) => {
    try {
      setidlevel(level.id);
      setimglevel(level.img);
      setlablelevel(level.lable);
      document.getElementById("my_modal_edit").showModal();
    } catch (error) {}
  };

  const submit = async () => {
    try {
      document.getElementById("my_modal_edit").close();
      const data = { id: idlevel, img: imglevel, lable: lablelevel };
        const res = await axios.post(Configurl.Url + '/admin/editlevel', data, Configurl.headers())
        if ( res.data.success) {
    getlevel();

        }
    } catch (error) {}
  };

  return (
    <Dashboard>
      <div className=" col-span-12 text-xs sm:text-xs md:text-lg lg:text-lg m-5">
        <div class="relative flex flex-col min-w-0 mt-5 mb-6 ml-5 break-words  dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border border-spacing-6 col-span-12">
          <div className="py-8 m-3">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-semibold mb-4">
                รูประดับการสอบ (รูปต้องขนาด 720 * 445)
              </h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className=" w-full ">
                  <div class="relative overflow-x-auto shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border border-spacing-6">
                    <table class="w-full text-sm text-left shadow rtl:text-right text-gray-500 dark:text-gray-400 ">
                      <thead class="text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className=" text-center font-semibold px-6 py-3 ">
                            id
                          </th>
                          <th className="text-center font-semibold px-6 py-3 "></th>
                          <th className="font-semibold text-center px-6 py-3 ">
                            รูประดับการสอบ
                          </th>

                          <th className="font-semibold text-center px-6 py-3 ">
                            ชื่อ
                          </th>
                          <th className="font-semibold text-center px-6 py-3 ">
                            แก้ไข
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {level
                            ? level.map((level, index) => (
                                <>
                                  <tr key={index} className="h-20">
                                    <td className="py-4 px-6 text-center">
                                      {level.id}
                                    </td>
                                    <td className="py-4 text-center"></td>
                                    <td className="py-4 px-6 text-center">
                                      <img
                                        className="w-52"
                                        src={level.img}
                                        alt=""
                                      />
                                    </td>
                                    <td className="py-4 px-6 text-center ">
                                      {level.lable}
                                    </td>

                                    <td className="py-4 px-6 text-center ">
                                      <div onClick={(e) => edit(level)}>
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
                                    </td>
                                  </tr>
                                </>
                              ))
                            : ""}
                        </>
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
            <div className="flex flex-row text-lg font-bold">
              <img src={imglevel ? imglevel : ""} alt="" />
            </div>
            <div className="flex flex-row text-lg items-center font-bold">
              <p className="text-slate-600 mx-3">ชื่อ : </p>
              <input
                value={lablelevel}
                onChange={(e) => setlablelevel(e.target.value)}
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <div className="flex flex-row text-lg items-center font-bold mt-2">
              <p className="text-slate-600 mx-3">link img : </p>
              <input
                value={imglevel}
                onChange={(e) => setimglevel(e.target.value)}
                type="text"
                placeholder=""
                className="input input-bordered w-full max-w-xs"
              />
            </div>

            <button onClick={submit} className="btn text-sky-500 mt-5">ยืนยันการแก้ไข</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </Dashboard>
  );
}
