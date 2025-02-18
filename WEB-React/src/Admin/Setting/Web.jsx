import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import axios from "axios";
import Configurl from "../../Config";
import { useNavigate } from "react-router-dom";

export default function SettingWeb() {
  const [edit, setedit] = useState(false);
  const [editname, seteditname] = useState(false);
  const [editdescription, seteditdescription] = useState(false);
  const [editicon, setediticon] = useState(false);
  const [editfb, seteditfb] = useState(false);
  const [editweb, seteditweb] = useState(false);
  const Navigate = useNavigate();
  useEffect(() => {
    verify();
    getuser();
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
  const [web, setweb] = useState();
  const getuser = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/admin/getweb",
        {},
        Configurl.headers()
      );
      if (res.data.success) {
        setweb(res.data.web);
        seteditname(res.data.web.name);
        seteditdescription(res.data.web.description);
        setediticon(res.data.web.icon);
        seteditfb(res.data.web.linkfb);
        seteditweb(res.data.web.linkweb);
      }
    } catch (error) {}
  };

  const editdata = async () => {
    try {
      setedit(false);
      const data = {
        id: web.id,
        name: editname,
        description: editdescription,
        icon: editicon,
        linkfb: editfb,
        linkweb: editweb,
      };
      const res = await axios.post(Configurl.Url + "/admin/editweb", data , Configurl.headers());
      if (res.data.success) {
        getuser();
      }
    } catch (error) {}
  };

  return (
    <Dashboard>
      <div className=" col-span-12 text-xs sm:text-xs md:text-lg lg:text-lg">
        {" "}
        การจัดเว็บไซต์
      </div>
      <div className="col-span-12 sm:col-span-12 md:col-span-12 xl:col-span- text-xs sm:text-xs md:text-lg lg:text-lg">
        <div className="mockup-browser border bg-base-300 mt-20">
          <div className="mockup-browser-toolbar">
            <div className="input">https://thaplatest</div>
            <div onClick={(e) => setedit(!edit)} className="">
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
          {edit ? (
            <>
              <div className="flex px-4 py-5 bg-base-200">
                <i class="fa-solid fa-check mr-5"></i>

                <div className="flex ">ชื่อเว็บไซต์ : </div>

                <div className="flex ml-5">
                  <textarea
                    value={editname}
                    onChange={(e) => seteditname(e.target.value)}
                    placeholder="ชื่อเว็บไซต์"
                    className="textarea textarea-bordered textarea-lg w-full resize"
                  ></textarea>
                </div>
              </div>
              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">รายละเอียดเว็บไซต์ : </div>

                <div className="flex ml-5">
                  <textarea
                    value={editdescription}
                    onChange={(e) => seteditdescription(e.target.value)}
                    placeholder="รายละเอียดเว็บไซต์"
                    className="textarea textarea-bordered textarea-lg w-full resize"
                  ></textarea>
                </div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">link facebook : </div>

                <div className="flex ml-5">
                  <textarea
                    value={editfb}
                    onChange={(e) => seteditfb(e.target.value)}
                    placeholder="link facebook"
                    className="textarea textarea-bordered textarea-lg w-full resize"
                  ></textarea>
                </div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">link Web : </div>

                <div className="flex ml-5">
                  <textarea
                    value={editweb}
                    onChange={(e) => seteditweb(e.target.value)}
                    placeholder="link Web"
                    className="textarea textarea-bordered textarea-lg w-full resize"
                  ></textarea>
                </div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">รูปเว็ปไซต์ : </div>

                <div className="flex ml-5">
                  <textarea
                    value={editicon}
                    onChange={(e) => editicon(e.target.value)}
                    placeholder="link รูปเว็ปไซต์"
                    className="textarea textarea-bordered textarea-lg w-full resize"
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-center px-4 py-5 bg-base-200">
                <button onClick={editdata} className="btn btn-accent">
                  ยืนยันการแก้ไข
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">ชื่อเว็บไซต์ : </div>
                <div className="flex ml-5">{web ? web.name : ""}</div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">รายละเอียดเว็บไซต์ : </div>
                <div className="flex ml-5">{web ? web.description : ""}</div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">link facebook : </div>
                <div className="flex ml-5">{web ? web.linkfb : ""}</div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">link Web : </div>
                <div className="flex ml-5">{web ? web.linkweb : ""}</div>
              </div>

              <div className="flex px-4 py-5 bg-base-200">
                <div className="flex ">รูปเว็ปไซต์ : </div>
                <div className="flex ml-5">
                  <img className="w-32 h-32" src={web ? web.icon : ""}></img>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Dashboard>
  );
}
