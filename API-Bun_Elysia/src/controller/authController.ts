import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
    login: async ({ body, BXOK }: { body: any, BXOK: any }) => {
        try {
            const { username, password } = body;
            const admin = await prisma.admin.findFirst({ where: { user: username } })
            if (admin) {
                const isMatch = await Bun.password.verify(
                    password,
                    admin.password
                );
                if (isMatch) {
                    // ข้อมูลที่ใช้ใน token
                    const user = {
                        id: admin.id,
                        username: admin.user,
                        role: 71246,
                    };

                    const token = await BXOK.sign(user);
                    return {
                        success: true,
                        message: "เข้าสู่ผู้ดูแลระบบสำเร็จ",
                        token: token,
                    };
                } else {
                    return { success: false, error: "password ไม่ถูกต้อง" };
                }
            } else {
                return { success: false, error: "ไม่พบ username นี้" };
            }
        } catch (error) {
            return {
                success: false,
            }
        }
    },
    register: async ({ body }: { body: any }) => {
        try {
            const { username, password } = body;
            const admin = await prisma.admin.findFirst({ where: { user: username } })
            if (admin) {
                return {
                    success: false,
                    error: "ชื่อผู้ใช้นี้ถูกใช้งานแล้ว",
                };
            }
            const hash = await Bun.password.hash(body.password);
            const user = await prisma.admin.create({
                data: {
                    user: username,
                    password: hash
                }
            })
            if (user) {
                return {
                    success: true,
                    message: "สมัครสามชิกสำเร็จ",
                }
            }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },
    verify: async ({ BXOK, headers }: { BXOK: any, headers: any }) => {
        // console.log(headers.authorization);
        const authHeader = headers.authorization;
    
        if (!authHeader) {
            return { status: 401, message: "Missing Authorization Header" };
        }
    
        const token = authHeader.split(' ')[1];
        try {
            const profile = await BXOK.verify(token);
            if (!profile) {
                return { success: false, error: "Unauthorized" };
            }
            return { success: true, user: profile };
        } catch (error) {
            return {
                success: false,
                error: "Token verification failed",
                details: error,
            };
        }
    },

}