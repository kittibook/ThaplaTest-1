import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default {
    getstd: async ({ BXOK, headers }: { BXOK: any, headers: any }) => {
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
            return { success: true, user: await prisma.user.findMany() }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },
    editImg: async ({ body, headers, BXOK }: { body: any, headers: any, BXOK: any }) => {
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
            const { id, iconbavbar, banner, btn1, btn2, btn3, btn4, iconjump } = body;
            const Img = await prisma.img.update({
                where: { id: id },
                data: {
                    iconnavbar: iconbavbar,
                    banner: banner,
                    btn1: btn1,
                    btn2: btn2,
                    btn3: btn3,
                    btn4: btn4,
                    iconjump: iconjump
                }
            })
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },
    editWeb: async ({ body, headers, BXOK }: { body: any, headers: any, BXOK: any }) => {
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
            const { id, name, description, icon, linkfb, linkweb } = body;
            await prisma.web.update({
                where: { id: id },
                data: {
                    name: name,
                    description: description,
                    icon: icon,
                    linkfb: linkfb,
                    linkweb: linkweb
                }
            })
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },
    editlevel: async ({ body, headers, BXOK }: { body: any, headers: any, BXOK: any }) => {
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
            const { id, img, lable } = body;
            await prisma.level.update({
                where: { id: id },
                data: {
                    img: img,
                    lable: lable
                }
            })
            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },
    getWeb: async ({ headers, BXOK }: { headers: any, BXOK: any }) => {
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
            return { success: true, web: await prisma.web.findFirst({}) }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },

    getDas: async ({ headers, BXOK }: { headers: any, BXOK: any }) => {
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
            const UserCount = await prisma.user.count({});
            const UserCountlevel1 = await prisma.user.count({
                where: {
                    level: "1",
                },
            });
            const UserCountlevel2 = await prisma.user.count({
                where: {
                    level: "2",
                },
            });
            const UserCountlevel3 = await prisma.user.count({
                where: {
                    level: "3",
                },
            });
            const UserCountlevel4 = await prisma.user.count({
                where: {
                    level: "4",
                },
            });

            return {
                success: true, UserCount: UserCount, UserCountlevel1: UserCountlevel1,
                UserCountlevel2: UserCountlevel2, UserCountlevel3: UserCountlevel3,
                UserCountlevel4: UserCountlevel4
            }
        } catch (error) {
            return {
                success: false,
                error: "เกิดข้อผิดพลาด",
            }
        }
    },

}