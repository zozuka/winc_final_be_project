import { PrismaClient } from "@prisma/client";

const createHost = async (username, password, name, email, phoneNumber, profilePicture, aboutMe) => {
    const prisma = new PrismaClient();
    const host = await prisma.host.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture,
            aboutMe
        }
    });
    if (!host) {
        return null;
    } else {
        return host;
    }

};

export default createHost;