import { PrismaClient } from "@prisma/client";

const createProperty = async (title, description, location, pricePerNight, bedroomCount, bathRoomCount, maxGuestCount, hostId, rating) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.create({
        data: {
            title,
            description,
            location,
            pricePerNight,
            bedroomCount,
            bathRoomCount,
            maxGuestCount,
            host: {
                connect: { id: hostId },
            },
            rating
        }
    });
    if (!property) {
        return null;
    } else {
        return property;
    };
}
export default createProperty;