import { Elysia } from "elysia";
import { cors } from '@elysiajs/cors'

import uploadFileController from './controller/uploadFileController'
import webController from "./controller/webController";
import userController from "./controller/userController";
import adminController from "./controller/adminController";
import jwt from "@elysiajs/jwt";
import authController from "./controller/authController";

const app = new Elysia()
  .use(cors())
  .use(
    jwt({
      name: "BXOK", // ชื่อที่จะใช้ใน context ของ JWT
      secret: "BXOKweBLicenseBxokbookbO0k_071246_byBXOK", // secret key สำหรับ sign JWT
      exp: "2h", // กำหนดเวลาหมดอายุของ token
    })
  )
  .get('/getimg', webController.get)
  .get('/getweb', webController.web)
  .post('/check', userController.check)
  .post('/userid', userController.userid)
  .post('/getlevel', userController.getlevel)
  .post('/NumBer', userController.NumBer)

  .post('/admin/login', authController.login)
  .post('/admin/register', authController.register)
  .post('/admin/verify', authController.verify)
  
  .post('/admin/upload', uploadFileController.uploaddata)
  .post('/admin/stdall', adminController.getstd)
  .post('/admin/getDas', adminController.getDas)
  .post('/admin/getweb', adminController.getWeb)
  .post('/admin/editweb', adminController.editWeb)
  .post('/admin/editImg', adminController.editImg)
  .post('/admin/editlevel', adminController.editlevel)
  .listen(3027);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
