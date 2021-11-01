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
  describe("GET/api/topics sad path", () => {
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

describe("path: /api/articles", () => {
  describe("GET/api/articles happy path", () => {
    test("status 200 responds with all articles", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toHaveLength(12);
          articles.forEach((object) => {
            expect(object).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
              })
            );
          });
        });
    });
  });
  describe("GET/api/articles sad path", () => {
    test("status 404 responds with 'Path not found'", () => {
      return request(app)
        .get("/api/BAD_PATH")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Path not found");
        });
    });
  });
  describe("GET/api/:id happy path", () => {
    test("status 200 responds with article by Id", () => {
      return request(app)
        .get("/api/articles/4")
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({
            article_id: 4,
            title: "Student SUES Mitch!",
            topic: "mitch",
            author: "rogersop",
            body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
            created_at: "2020-05-06T01:14:00.000Z",
            votes: 0,
          });
        });
    });
  });
  xdescribe("GET/api/articles/:id sad path", () => {
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
