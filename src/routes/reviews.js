import { Router } from "express";
import getReviews from "../services/reviews/getReviews.js";
import createReview from "../services/reviews/createReview.js";
import getReviewById from "../services/reviews/getReviewById.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import updateReviewById from "../services/reviews/updateReviewById.js";
import auth from "../middleware/auth.js";

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        const reviews = await getReviews();
        res.json(reviews);
    } catch (error) {
        next(error);
    }
});

router.post("/", auth, async (req, res, next) => {
    try {
        if (!req.body.userId || !req.body.propertyId || !req.body.rating || !req.body.comment) {
            res.status(400).json("message: Bad request");
        } else {
            const {
                userId,
                propertyId,
                rating,
                comment } = req.body;
            const newReview = await createReview(
                userId,
                propertyId,
                rating,
                comment);
            if (newReview) {
                res.status(201).json(newReview);
            }
            else {
                res.status(200).json("message: Review cannot be created")
            }
        }
    } catch (error) {
        next(error);
    }
});

router.get("/:id", async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await getReviewById(id);

        if (!review) {
            res.status(404).json({ message: `Review with id ${id} not found!` });
        } else {
            res.status(200).json(review);
        }
    } catch (error) {
        next(error);
    }
});

router.delete("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const review = await deleteReviewById(id);

        if (review) {
            res.status(200).send({
                message: `Review with id ${id} successfully deleted.`,
                review
            });
        } else {
            res.status(404).json({
                message: `Review with id ${id} not found`
            });
        }
    } catch (error) {
        next(error);
    }
});

router.put("/:id", auth, async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId, propertyId, rating, comment } = req.body;
        const review = await updateReviewById(id, { userId, propertyId, rating, comment });

        if (review) {
            res.status(200).send({
                message: `Review with id ${id} successfully updated`,
                review
            });
        } else {
            res.status(404).json({
                message: `Review with id ${id} not found`
            });
        }
    } catch (error) {
        next(error);
    }
});

export default router;