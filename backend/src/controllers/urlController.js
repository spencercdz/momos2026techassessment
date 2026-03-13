import {
  createShortUrl,
  findUrlByCode,
  getUrls,
  recordClick
} from "../services/urlService.js";
import { validateUrl } from "../utils/validateUrl.js";
import { isValidShortCode } from "../utils/shortCode.js";

export async function shortenUrl(req, res, next) {
  const { url } = req.body || {};
  const validation = validateUrl(url);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  try {
    const result = await createShortUrl(url);
    return res.status(201).json({
      shortUrl: result.shortUrl,
      shortCode: result.shortCode
    });
  } catch (error) {
    return next(error);
  }
}

export async function listUrls(req, res, next) {
  try {
    const urls = await getUrls();
    return res.json({ urls });
  } catch (error) {
    return next(error);
  }
}

export async function redirectToOriginal(req, res, next) {
  const { shortCode } = req.params;

  if (!isValidShortCode(shortCode)) {
    return res.status(400).json({ error: "Invalid short code." });
  }

  try {
    const url = await findUrlByCode(shortCode);

    if (!url) {
      return res.status(404).json({ error: "Short URL not found." });
    }

    await recordClick(shortCode);
    return res.redirect(302, url.original_url);
  } catch (error) {
    return next(error);
  }
}
