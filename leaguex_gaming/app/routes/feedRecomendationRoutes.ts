import express from "express";
import * as feedRecomendationController from "../controller/feedRecomendationController"

const router = express.Router();

router.get('/api/recommendations/posts', feedRecomendationController.getfeedRecomendation);

export default router