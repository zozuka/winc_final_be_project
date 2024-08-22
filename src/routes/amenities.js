import { Router } from "express";
import getAmenities from "../services/amenities/getAmenities.js";
import createAmenities from "../services/amenities/createAmenity.js";
import getAmenityById from "../services/amenities/getAmenityById.js";
import deleteAmenityById from "../services/amenities/deleteAmenityById.js";
import updateAmenityById from "../services/amenities/updateAmenityById.js";
import auth from "../middleware/auth.js";
import createAmenity from "../services/amenities/createAmenity.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const amenities = await getAmenities();
        res.json(amenities);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        if (!req.body.name) {
            res.status(400).json({ message: "Bad request" });
        } else {
            const {
                name } = req.body;
            const newAmenity = await createAmenity(
                name);
            if (newAmenity) {

                res.status(201).json(newAmenity);
            } else {
                res.status(200).json("Cannot create property")
            }
        }
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await getAmenityById(id);

        if (!amenity) {
            res.status(404).json({ message: `Amenity with id ${id} not found!` });
        } else {
            res.status(200).json(amenity);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const amenity = await deleteAmenityById(id);

        if (amenity) {
            res.status(200).send({
                message: `Amenity with id ${id} successfully deleted.`,
                amenity
            });
        } else {
            res.status(404).json({
                message: `Amenity with id ${id} not found`
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const amenity = await updateAmenityById(id, { name });

        if (amenity) {
            res.status(200).send({
                message: `Amenity with id ${id} successfully updated`,
                amenity
            });
        } else {
            res.status(404).json({
                message: `Amenity with id ${id} not found`
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;