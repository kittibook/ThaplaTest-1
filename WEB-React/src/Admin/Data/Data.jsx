import React, { useEffect, useState } from "react";
import Dashboard from "../Dashboard/Dashboard";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Configurl from "../../Config";

export default function DataSTD() {
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
  const [user, setuser] = useState();
  const getuser = async () => {
    try {
      const res = await axios.post(
        Configurl.Url + "/admin/stdall",
        {},
        Configurl.headers()
      );
      if (res.data.success) {
        setuser(res.data.user);
      }
    } catch (error) {}
  };

  return (
    <Dashboard>
      <div className=" col-span-12 text-xs sm:text-xs md:text-lg lg:text-lg m-5">
        <div class="relative flex flex-col min-w-0 mt-5 mb-6 ml-5 break-words  dark:bg-gray-950 shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border border-spacing-6 col-span-12">
          <div className="py-8 m-3">
            <div className="container mx-auto px-4">
              <h1 className="text-2xl font-semibold mb-4">ข้อมูลทั้งหมด</h1>
              <div className="flex flex-col md:flex-row gap-4">
                <div className=" w-full ">
                  <div class="relative overflow-x-auto shadow-soft-xl dark:shadow-soft-dark-xl rounded-2xl bg-clip-border border-spacing-6">
                    <table class="w-full text-sm text-left shadow rtl:text-right text-gray-500 dark:text-gray-400 ">
                      <thead class="text-center text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                          <th className=" text-center font-semibold px-6 py-3 ">
                            เลขบัตรประชาชน
                          </th>
                          <th className="text-center font-semibold px-6 py-3 ">
                            ชื่อ - นามสกุล
                          </th>
                          <th className="font-semibold text-center px-6 py-3 ">
                            ชั้น
                          </th>

                          <th className="font-semibold text-center px-6 py-3 ">
                            โรงเรียน
                          </th>
                          <th className="font-semibold text-center px-6 py-3 ">
                            ระดับ
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <>
                          {user
                            ? user.map((user, index) => (
                                <>
                                  <tr key={index} className="h-20">
                                    <td className="py-4 px-6 text-center">
                                      <span className="font-semibold">
                                      {user.idcard}
                                      </span>
                                    </td>
                                    <td className="py-4 text-center">
                                    {user.fullname}
                                    </td>
                                    <td className="py-4 px-6 text-center">
                                    {user.class}
                                    </td>
                                    <td className="py-4 px-6 text-center ">
                                    {user.school}
                                    </td>

                                    <td className="py-4 px-6 text-center ">
                                      <i class="fa-regular fa-eye mr-5 bg-green-50 w-1/4 h-1/4 text-green-800 rounded-lg">
                                      {user.level ? user.level == "1" ? "ระดับเพชร" : user.level == "2" ? "ระดับทอง" :  user.level == "3" ? "ระดับเงิน" : user.level == "4" ? "เข้าร่วม" : "ไม่พบข้อมูล" : "ไม่พบข้อมูล" }
                                      </i>
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
    </Dashboard>
  );
}
