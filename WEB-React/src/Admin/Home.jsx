import React, { useEffect, useState } from "react";
import Dashboard from "./Dashboard/Dashboard";
import axios from "axios";
import Configurl from "../Config";
import { useNavigate } from "react-router-dom";

export default function HomeAdmin() {
  const Navigate = useNavigate();
  useEffect(() => {
    verify();
    das();
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

  const [all ,setall] = useState();
  const [level1 ,setlevel1] = useState();
  const [level2 ,setlevel2] = useState();
  const [level3 ,setlevel3] = useState();
  const [level4 ,setlevel4] = useState();
  const das = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/admin/getDas",
        {},
        Configurl.headers()
      );
      if (res.data.success) {
        setall(res.data.UserCount)
        setlevel1(res.data.UserCountlevel1)
        setlevel2(res.data.UserCountlevel2)
        setlevel3(res.data.UserCountlevel3)
        setlevel4(res.data.UserCountlevel4)
      }
    } catch (error) {}
  };
  return (
    <Dashboard>
      <div className="mt-5 col-span-12 m-2 rounded-lg sm:grid-cols-8 md:text-sm text-xs lg:text-lg">
        <div class="flex flex-wrap mb-10">
          <div class="w-full xl:w-1/4 px-3 m-2">
            <div class="w-full bg-white shadow-xl text-blue-400 rounded-lg flex items-center hover:bg-slate-100  mb-6 xl:mb-0">
              <div className="stat">
                <div className="stat-figure text-primary">
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
                      d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">ผู้เข้าร่วมสอบ</div>
                <div className="stat-value text-primary">{all ? all : "0"}</div>
                <div className="stat-desc">ผู้เข้าร่วมสอบทั้งหมด</div>
              </div>
            </div>
          </div>

          <div class="w-full xl:w-1/4 px-3 m-2">
            <div class="w-full bg-white shadow-xl text-blue-400 rounded-lg flex items-center hover:bg-slate-100  mb-6 xl:mb-0">
              <div className="stat">
                <div className="stat-figure ">
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
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">ผลการสอบที่อยู่ในระดับ 90-100 </div>
                <div className="stat-value ">{level1 ? level1 : "0"}</div>
                <div className="stat-desc">ผลการสอบที่อยู่ในระดับเพชร</div>
              </div>
            </div>
          </div>

          <div class="w-full xl:w-1/4 px-3 m-2">
            <div class="w-full bg-white shadow-xl text-yellow-600 rounded-lg flex items-center hover:bg-slate-100  mb-6 xl:mb-0">
              <div className="stat">
                <div className="stat-figure ">
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
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">ผลการสอบที่อยู่ในระดับ 80-89 </div>
                <div className="stat-value ">{level2 ? level2 : "0"}</div>
                <div className="stat-desc">ผลการสอบที่อยู่ในระดับทอง</div>
              </div>
            </div>
          </div>

          <div class="w-full xl:w-1/4 px-3 m-2">
            <div class="w-full bg-white shadow-xl text-neutral-500 rounded-lg flex items-center hover:bg-slate-100  mb-6 xl:mb-0">
              <div className="stat">
                <div className="stat-figure ">
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
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">ผลการสอบที่อยู่ในระดับ 70-79 </div>
                <div className="stat-value ">{level3 ? level3 : "0"}</div>
                <div className="stat-desc">ผลการสอบที่อยู่ในระดับเงิน</div>
              </div>
            </div>
          </div>

          <div class="w-full xl:w-1/4 px-3 m-2">
            <div class="w-full bg-white shadow-xl text-neutral-500 rounded-lg flex items-center hover:bg-slate-100  mb-6 xl:mb-0">
              <div className="stat">
                <div className="stat-figure ">
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
                      d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z"
                    />
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z"
                    />
                  </svg>
                </div>
                <div className="stat-title">ผลการสอบที่อยู่ในระดับเข้าร่วม </div>
                <div className="stat-value ">{level4 ? level4 : "0"}</div>
                <div className="stat-desc">ผลการสอบที่อยู่ในระดับเข้าร่วม</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </Dashboard>
  );
}
