import xlsx from 'xlsx';
import { PrismaClient } from '@prisma/client'
import { createHash } from "crypto";
const prisma = new PrismaClient()
export default {
    uploaddata: async ({ body, headers, BXOK }: { body: { file: File }, headers: any, BXOK: any }) => {
        try {
            const authHeader = headers.authorization;

            if (!authHeader) {
                return { status: 401, message: "Missing Authorization Header" };
            }

            const token = authHeader.split(' ')[1];
            const profile = await BXOK.verify(token);
            if (!profile) {
                return { success: false, error: "Unauthorized" };
            }
            const file = body.file
            // เขียนไฟล์ลง disk
            const filePath = `database/${file.name}`;
            await Bun.write(filePath, file);

            // โหลดไฟล์กลับมา
            const databaseFile = Bun.file(filePath);

            // ใช้ xlsx เพื่ออ่านข้อมูลจากไฟล์
            const fileBuffer = await databaseFile.arrayBuffer(); // แปลงเป็น Buffer
            const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
            // ลบข้อมูลทั้งหมดในตาราง Score ก่อน
            await prisma.score.deleteMany({});
            await prisma.number.deleteMany({});
            await prisma.numberALL.deleteMany({});

            // ลบข้อมูลทั้งหมดในตาราง User ก่อน
            await prisma.user.deleteMany({});
            // อ่านข้อมูลจาก Sheet แรก
            const sheetName = workbook.SheetNames[0];
            const sheetData: any[] = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
            const processedData =  await Promise.all( sheetData.slice(1).map(async row => {
                // const hash = await Bun.password.hash(row["เลขประชาชน"])
                // const hashCitizenID = (id: string) => createHash("sha256").update(id).digest("hex");
                const hashCitizenID = (id: unknown) => {
                    if (typeof id !== "string") {
                        return "Expected a string for citizen ID";
                    }
                    return createHash("sha256").update(id).digest("hex");
                };
                
                const userData = {
                    idcard: hashCitizenID(String(row["เลขประชาชน"])),
                    fullname: row["ชื่อ-สกุล"],
                    class: row["ระดับชั้น"],
                    school: row["โรงเรียน"],
                    level: determineLevel(row["__EMPTY_2"]?? ""), // ฟังก์ชันที่กำหนดระดับ
                };

                // ฟังก์ชันสำหรับกำหนดระดับตามคะแนน
                function determineLevel(score: number) {
                    // if (score >= 90) {
                    //     return "1"; //ระดับเพชร
                    // } else if (score >= 80) {
                    //     return "2"; //ระดับทอง
                    // } else if (score >= 70) {
                    //     return "3"; //ระดับเงิน
                    // } else if (score >= 50) {
                    //     return "4";//ระดับทองแดง
                    // } else {
                    //     return "5";//ระดับเข้าร่วม
                    // }

                    if (score >= 80) {
                        return "1"; // ระดับเพชร
                    } else if (score >= 65) {
                        return "2"; // ระดับทอง
                    } else if (score >= 55) {
                        return "3"; // ระดับเงิน
                    } else if (score >= 40) {
                        return "4"; // ระดับทองแดง
                    } else {
                        return "5"; // ระดับเข้าร่วม
                    }
                }

                const std = await prisma.user.create({
                    data: userData,
                });

                const Scorestd = await prisma.score.createMany({
                    data: [
                        {
                            Userid: std.id,
                            Class: "คณิตศาสตร์",
                            Score: String(row["ผลคะแนนการทดสอบ"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "วิทยาศาสตร์",
                            Score: String(row["__EMPTY"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "ภาษาและวัฒนธรรม",
                            Score: String(row["__EMPTY_1"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "รวม",
                            Score: String(row["__EMPTY_2"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                    ],
                });

                const Numberstd = await prisma.number.createMany({
                    data: [
                        {
                            Userid: std.id,
                            Class: "คณิตศาสตร์",
                            Number: String(row["ลำดับตามระดับชั้น"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "วิทยาศาสตร์",
                            Number: String(row["__EMPTY_3"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "ภาษาและวัฒนธรรม",
                            Number: String(row["__EMPTY_4"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        }
                    ],
                });

                const Numberallstd = await prisma.numberALL.createMany({
                    data: [
                        {
                            Userid: std.id,
                            Class: "คณิตศาสตร์",
                            NumberALL: String(row["ลำดับทั้งหมด"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "วิทยาศาสตร์",
                            NumberALL: String(row["__EMPTY_5"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        },
                        {
                            Userid: std.id,
                            Class: "ภาษาและวัฒนธรรม",
                            NumberALL: String(row["__EMPTY_6"]) || "",  // แปลงเป็น string หรือใช้ค่าว่างหากไม่มีค่า
                        }
                    ],
                });
                // เลขประชาชน: row["เลขประชาชน"],
                // ชื่อ: row["ชื่อ-สกุล"],
                // ระดับชั้น: row["ระดับชั้น"],
                // โรงเรียน: row["โรงเรียน"],
                // คะแนน: {
                //   คณิตศาสตร์: row["ผลคะแนนการทดสอบ"],
                //   วิทยาศาสตร์: row["__EMPTY"],
                //   ภาษาและวัฒนธรรม: row["__EMPTY_1"],
                //   รวม: row["__EMPTY_2"],
                // },
                // ลำดับตามระดับชั้น: {
                //   คณิตศาสตร์: row["ลำดับตามระดับชั้น"],
                //   วิทยาศาสตร์: row["__EMPTY_3"],
                //   ภาษาและวัฒนธรรม: row["__EMPTY_4"],
                // },
                // ลำดับทั้งหมด: {
                //   คณิตศาสตร์: row["ลำดับทั้งหมด"],
                //   วิทยาศาสตร์: row["__EMPTY_5"],
                //   ภาษาและวัฒนธรรม: row["__EMPTY_6"],
                // },
            })
        );

            return { success: true }
        } catch (error) {
            console.log(error)
            return {
                success: false,
                error: "Token verification failed",
                details: error,
            };
        }





    }
}