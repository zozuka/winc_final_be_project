import { PrismaClient } from "@prisma/client";

const createAmenity = async (name) => {
    const prisma = new PrismaClient();
    const amenity = await prisma.amenity.create({
        data: {
            name
        }
    });

    if (!amenity) {
        return null;
    } else {

        return amenity;
    }
};

export default createAmenity;