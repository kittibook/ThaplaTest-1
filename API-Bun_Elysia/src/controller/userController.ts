import { PrismaClient } from '@prisma/client'
import { createHash } from "crypto";

const prisma = new PrismaClient()
export default {
    check: async ({ body }: { body: any }) => {
        try {

            const { idcard } = body
            const hashCitizenID = (id: string) => createHash("sha256").update(id).digest("hex");
            const hashedID = hashCitizenID(idcard);
            const user = await prisma.user.findFirst({ where: { idcard: hashedID } })
            if (user) {
                return {
                    success: true,
                    user: {
                        id: user.id,
                        idcard: idcard,
                        fullname: user.fullname,
                        class: user.class,
                        school: user.school,
                        level: user.level,
                        createAt: user.createAt,
                    }
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (error) {
            return {
                success: false,
            }
        }
    },
    userid: async ({ body }: { body: any }) => {
        try {
            const { iduser } = body
            const user = await prisma.user.findFirst({ where: { id: iduser }, include: { Score: true, Number: true, NumberALL: true } })
            if (user) {
                return {
                    success: true,
                    user: user
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (error) {
            return {
                success: false,
            }
        }
    },
    getlevel: async () => {
        try {
            const level = await prisma.level.findMany()
            if (level) {
                return {
                    success: true,
                    level: level
                }
            } else {
                return {
                    success: false,
                }
            }
        } catch (error) {
            return {
                success: false,
            }
        }
    },
    NumBer: async ({ body }: { body: any }) => {
        try {
            const { id } = body;
            const user = await prisma.user.findFirst({ where: { id: id } })
            const userIdCard = user?.idcard; // เลขประชาชน
            const userClass = user?.class; // ชั้นเรียนที่ต้องการค้นหา
            const scoreType = "รวม"; // ประเภทคะแนน

            // ขั้นตอนที่ 1: ค้นหาผู้ใช้และคะแนนรวม
            const userWithScore = await prisma.user.findFirst({
                where: { idcard: userIdCard, class: userClass },
                include: {
                    Score: {
                        where: { Class: scoreType }, // กรองเฉพาะคะแนน "รวม"
                    },
                },
            });

            if (!userWithScore || userWithScore.Score.length === 0) {
                console.log(`ไม่พบข้อมูลผู้ใช้ที่มี idcard = ${userIdCard} หรือคะแนนรวมใน class ${userClass}`);
                return;
            }

            const userScore = Number(userWithScore.Score[0].Score);

            // ขั้นตอนที่ 2: ดึงข้อมูลลำดับคะแนนทั้งหมด
            const allScores = await prisma.score.findMany({
                where: { Class: scoreType },
                include: { User: true },
                orderBy: { Score: "desc" }, // จัดเรียงคะแนนจากมากไปน้อย
            });
            // console.log(allScores)
            // คำนวณลำดับใน `class` และลำดับทั้งหมด
            const rankInClass = allScores
                .filter(score => score.User.class === userClass)
                .findIndex(score => score.User.idcard === userIdCard) + 1;

            const rankOverall = allScores
                .findIndex(score => score.User.idcard === userIdCard) + 1;


            // console.log(`ลำดับใน class ${userClass}:`, rankInClass || "ไม่พบ");
            // console.log("ลำดับใน class ทั้งหมด:", rankOverall || "ไม่พบ");
            return { success: true, rankInClass: rankInClass, rankOverall: rankOverall }
        } catch (error) {

        }

    }
}