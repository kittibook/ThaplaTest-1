import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
export default {
    get : async () => {
        return await prisma.img.findFirst()
    },
    web : async () => {
        return await prisma.web.findFirst()
    }
}