import request from "supertest";
import { createApp } from "../src/app.js";
import { clearUrls } from "../src/models/urlModel.js";
import { closeDb } from "../src/database/db.js";

let app;

beforeAll(async () => {
  process.env.DB_FILE = ":memory:";
  process.env.BASE_URL = "http://localhost:3000";
  app = await createApp();
});

afterAll(async () => {
  await closeDb();
});

beforeEach(async () => {
  await clearUrls();
});

test("POST /api/shorten creates a short URL", async () => {
  const res = await request(app)
    .post("/api/shorten")
    .send({ url: "https://example.com/some/very/long/url" });

  expect(res.status).toBe(201);
  expect(res.body.shortUrl).toMatch(/http:\/\/localhost:3000\/[a-zA-Z0-9]{5}/);
  expect(res.body.shortCode).toMatch(/^[a-zA-Z0-9]{5}$/);
});

test("GET /api/urls returns list of URLs", async () => {
  await request(app).post("/api/shorten").send({ url: "https://example.com" });

  const res = await request(app).get("/api/urls");

  expect(res.status).toBe(200);
  expect(res.body.urls).toHaveLength(1);
  expect(res.body.urls[0].originalUrl).toBe("https://example.com");
});

test("GET /:shortCode redirects and increments click count", async () => {
  const createRes = await request(app)
    .post("/api/shorten")
    .send({ url: "https://example.com" });

  const { shortCode } = createRes.body;

  const redirectRes = await request(app)
    .get(`/${shortCode}`)
    .redirects(0);

  expect(redirectRes.status).toBe(302);
  expect(redirectRes.headers.location).toBe("https://example.com");

  const listRes = await request(app).get("/api/urls");
  expect(listRes.body.urls[0].clickCount).toBe(1);
});
