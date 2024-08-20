import { PrismaClient } from "@prisma/client";

const updatePropertyById = async (id, updatedproperty) => {
    const prisma = new PrismaClient();
    const property = await prisma.property.updateMany({
        where: { id },
        data: updatedproperty
    });

    return property.count > 0 ? id : null;
};

export default updatePropertyById;