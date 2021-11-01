const db = require("../db/index.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("path: /api", () => {
  describe("GET/api happy path", () => {
    test("status 200 responds with 'All OK from API Router'", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body.message).toBe("All OK from API Router");
        });
    });
  });
  describe("GET/api sad path", () => {
    test("status 404 responds with 'Path not found'", () => {
      return request(app)
        .get("/api/BAD_PATH")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
  });
});

describe("path: /api/topics", () => {
  describe("GET/api/topics happy path", () => {
    test("status 200 responds with all topics", () => {
      return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({ body }) => {
          const { topics } = body;
          expect(topics).toHaveLength(3);
          topics.forEach((object) => {
            expect(object).toEqual(
              expect.objectContaining({
                description: expect.any(String),
                slug: expect.any(String),
              })
            );
          });
        });
    });
  });
});
