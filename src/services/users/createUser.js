import { PrismaClient } from "@prisma/client";

const createUser = async (username, password, name, email, phoneNumber, profilePicture) => {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
        data: {
            username,
            password,
            name,
            email,
            phoneNumber,
            profilePicture
        }
    })

    if (!user) {
        return null;
    } else {
        return user;
    }
};

export default createUser;