import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";
import Configurl from "../../Config";
import { useNavigate } from "react-router-dom";

export default function Register () {
    const [username, setusername] = useState("");
    const [password, setpassword] = useState("");
    const Navigate = useNavigate();

    const Register = async () => {
      try {
        if (username === "" || password === "") {
          Swal.fire({
            title: "กรอกข้อมูลไม่ครบถ้วน",
            text: "กรุณากรอกชื่อผู้ใช้และรหัสผ่านให้ครบถ้วน",
            icon: "info",
          });
          return; // หยุดการทำงานถ้าข้อมูลไม่ครบถ้วน
        }
        const data = {
          username: username,
          password: password,
        };
        const res = await axios.post(Configurl.Url + "/admin/register", data);
        if (res.data.success) {
          Navigate("/thaplatest/home/login")
        } else {
          Swal.fire({
            title: res.data.error,
            text: res.data.error,
            icon: "info",
          });
        }
      } catch (error) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด",
          text: error,
          icon: "error",
        });
      }
    };
  
    return (
      <>
        <div className="min-h-screen flex items-center justify-center font-sans text-white">
          <div className="w-full max-w-lg bg-black/40 p-6 rounded-lg shadow-lg">
            <h1 className="text-2xl font-bold mb-6 text-center">สมัครสมาชิก</h1>
  
            {/* {error && <p className="text-red-500 text-center mb-4">{error}</p>} */}
  
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2" htmlFor="username">
                  ชื่อผู้ใช้
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-200 text-black rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
  
              <div>
                <label className="block text-sm mb-2" htmlFor="password">
                  รหัสผ่าน
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className="w-full px-4 py-2 bg-gray-200 text-black rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
                />
              </div>
  
              <button
                type="submit"
                onClick={Register}
                className="w-full py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-500 transition font-semibold"
              >
                สมัครสมาชิก
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
  