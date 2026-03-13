import { Router } from "express";
import { listUrls, shortenUrl } from "../controllers/urlController.js";

const router = Router();

router.post("/shorten", shortenUrl);
router.get("/urls", listUrls);

export default router;
