const db = require("../db/index.js");
const data = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(data));
afterAll(() => db.end());

describe("path: /api", () => {
  describe("GET/api happy path", () => {
    test("status 200 responds with content from endpoints.json", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          const { api } = body;
          expect(api).toHaveLength(11);
          api.forEach((object) => {
            expect(object).toBeInstanceOf(Object);
          });
        });
    });
  });
  describe("GET/api sad path", () => {
    test("status 404 responds with 'Path not found'", () => {
      return request(app)
        .get("/api/BAD_PATH")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Path not found");
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
          expect(body.message).toBe("Path not found");
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
          expect(articles[0].comment_count).toBe(2);
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
                comment_count: expect.any(Number),
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
          expect(body.message).toBe("Path not found");
        });
    });
  });
  describe("GET/api/articles/:id happy path", () => {
    test("status 200 responds with article by Id", () => {
      const article_id = 4;
      return request(app)
        .get(`/api/articles/${article_id}`)
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
            comment_count: 0,
          });
        });
    });
  });
  describe("GET/api/articles/:id sad path", () => {
    test("status 400 responds with 'Invalid request' - wrong data type for request", () => {
      const article_id = "badpath";
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 404 responds with 'Path not found' - correct data type but id does not exist", () => {
      const article_id = 250;
      return request(app)
        .get(`/api/articles/${article_id}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
  });
  describe("GET/api/articles?queries happy path", () => {
    test("status 200 responds with sorted array and defaults to date", () => {
      return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("status 200 responds with array sorted by author", () => {
      const sort_by = "author";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("author", {
            descending: true,
          });
        });
    });
    test("status 200 responds with array sorted by title", () => {
      const sort_by = "title";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("title", {
            descending: true,
          });
        });
    });
    test("status 200 responds with array sorted by article_id", () => {
      const sort_by = "article_id";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("article_id", {
            descending: true,
          });
        });
    });
    test("status 200 responds with array sorted by topic", () => {
      const sort_by = "topic";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("topic", {
            descending: true,
          });
        });
    });
    test("status 200 responds with array sorted by votes", () => {
      const sort_by = "votes";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("votes", {
            descending: true,
          });
        });
    });
    test("status 200 responds with array sorted by comment_count", () => {
      const sort_by = "comment_count";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("comment_count", {
            descending: true,
          });
        });
    });
    test("status 200 responds with default sorted array in DESC order", () => {
      return request(app)
        .get(`/api/articles?order=DESC`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("created_at", {
            descending: true,
          });
        });
    });
    test("status 200 responds with sorted array by query in ASC order", () => {
      const sort_by = "votes";
      return request(app)
        .get(`/api/articles?sort_by=${sort_by}&order=ASC`)
        .expect(200)
        .then(({ body }) => {
          expect(body.articles).toBeSortedBy("votes");
        });
    });
    test("status 200 responds with array of results based on topic query", () => {
      const topicQuery = "mitch";
      return request(app)
        .get(`/api/articles?topic=${topicQuery}`)
        .expect(200)
        .then(({ body }) => {
          const { articles } = body;
          expect(articles).toHaveLength(11);
          articles.forEach((object) => {
            expect(object).toEqual(
              expect.objectContaining({
                article_id: expect.any(Number),
                title: expect.any(String),
                topic: "mitch",
                author: expect.any(String),
                body: expect.any(String),
                created_at: expect.any(String),
                votes: expect.any(Number),
                comment_count: expect.any(Number),
              })
            );
          });
        });
    });
  });
  describe("GET/api/articles?queries sad path", () => {
    test("status 400 any bad sort_by query is rejected", () => {
      return request(app)
        .get("/api/articles?sort_by=BADQUERY")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad query");
        });
    });
    test("status 400 any order query other than 'ASC' or 'DESC' rejected", () => {
      return request(app)
        .get("/api/articles?order=BADQUERY")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad query");
        });
    });
    test("status 400 rejects request if one query incorrect", () => {
      return request(app)
        .get("/api/articles?sort_by=BADQUERY&order=ASC'")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Bad query");
        });
    });
    test("status 404 rejects request if bad topic query", () => {
      return request(app)
        .get("/api/articles?topic=BADQUERY")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
  });
  describe("PATCH/api/articles/:id happy patch", () => {
    test("status 200 responds with amended object", () => {
      const article_id = 4;
      const updates = { inc_votes: 1 };
      const updatedArticle = {
        article_id: 4,
        title: "Student SUES Mitch!",
        topic: "mitch",
        author: "rogersop",
        body: "We all love Mitch and his wonderful, unique typing style. However, the volume of his typing has ALLEGEDLY burst another students eardrums, and they are now suing for damages",
        created_at: "2020-05-06T01:14:00.000Z",
        votes: 1,
      };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.article).toEqual({ ...updatedArticle });
        });
    });
  });
  describe("PATCH/api/articles/:id sad patch", () => {
    test("status 400 responds with Bad request - input empty", () => {
      const article_id = 4;
      const updates = {};
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 400 responds with Bad request - invalid request", () => {
      const article_id = 4;
      const updates = { inc_votes: "I am not valid" };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 400 responds with Bad request - invalid request", () => {
      const article_id = 4;
      const updates = { inc_votes: 1, name: "I am not valid" };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 404 responds with not found - invalid id", () => {
      const article_id = 989;
      const updates = { inc_votes: 1 };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(updates)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("status 400 responds with invalid request- incorrect request field", () => {
      const article_id = 4;
      const updates = { inc_v: 1 };
      return request(app)
        .patch(`/api/articles/${article_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
  });
  describe("GET/api/articles/:article_id/comments happy path", () => {
    test("status 200 responds with array of comments for article_id", () => {
      const article_id = 1;
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(200)
        .then(({ body }) => {
          const { comments } = body;
          expect(comments).toHaveLength(11);
          comments.forEach((object) => {
            expect(object).toEqual(
              expect.objectContaining({
                comment_id: expect.any(Number),
                votes: expect.any(Number),
                created_at: expect.any(String),
                author: expect.any(String),
                body: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET/api/articles/:article_id/comments sad path", () => {
    test("status 404 article id has no related comments", () => {
      const article_id = 7;
      return request(app)
        .get(`/api/articles/${article_id}/comments`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
  });
  describe("POST/api/articles/:article_id/comments happy path", () => {
    test("status 201 responds with added body", () => {
      const article_id = 1;
      const commentPost = {
        username: "icellusedkars",
        body: "This is a test!",
      };
      return request(app)
        .post(`/api/articles/${article_id}/comments`)
        .send(commentPost)
        .expect(201)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            comment_id: expect.any(Number),
            votes: 0,
            article_id: 1,
            created_at: expect.any(String),
            author: "icellusedkars",
            body: "This is a test!",
          });
        });
    });
  });
  describe("POST/api/articles/:article_id/comments sad path", () => {
    test("status 400 responds with Bad request - input empty", () => {
      const article_id = 4;
      const commentPost = {};
      return request(app)
        .post(`/api/articles/${article_id}/comments`)
        .send(commentPost)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 400 responds with Bad request - invalid request - no body", () => {
      const article_id = 4;
      const commentPost = {
        username: "icellusedkars",
        favouriteTest: "SUPERTEST",
      };
      return request(app)
        .post(`/api/articles/${article_id}/comments`)
        .send(commentPost)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Must contain body");
        });
    });
    test("status 404 responds with invalid request - id does not exists", () => {
      const article_id = 1000;
      const commentPost = {
        username: "icellusedkars",
        body: "This is a test!",
      };
      return request(app)
        .post(`/api/articles/${article_id}/comments`)
        .send(commentPost)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Id not found");
        });
    });
    test("status 400 responds with Bad request - invalid request - too many ", () => {
      const article_id = 4;
      const commentPost = {
        username: "icellusedkars",
        body: "This is a test!",
        favouriteTest: "supertest",
      };
      return request(app)
        .post(`/api/articles/${article_id}/comments`)
        .send(commentPost)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 404 bad request - username does not exist", () => {
      const article_id = 4;
      const commentPost = {
        username: "Jack",
        body: "This is a test!",
      };
      return request(app)
        .post(`/api/articles/${article_id}/comments`)
        .send(commentPost)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Username not found");
        });
    });
  });
});

describe("path: /api/comments", () => {
  describe("DELETE/api/comments/:comment_id happy path", () => {
    test("status 204 deletes comment by id", () => {
      return request(app).delete("/api/comments/6").expect(204);
    });
    describe("DELETE/api/comments/:comment_id sad path", () => {
      test("status 404 not found when id doesn't exist", () => {
        return request(app)
          .delete("/api/comments/9291")
          .expect(404)
          .then(({ body }) => {
            expect(body.message).toBe("Not found");
          });
      });
      test("status 400 not found when id wrong data type", () => {
        return request(app)
          .delete("/api/comments/badpath")
          .expect(400)
          .then(({ body }) => {
            expect(body.message).toBe("Invalid request");
          });
      });
    });
  });
  describe("PATCH/api/comments/:comment_id happy path", () => {
    test("status 200 responds with amended object - up vote", () => {
      const comment_id = 3;
      const updates = { inc_votes: 1 };
      const updatedComment = {
        comment_id: 3,
        body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy ??? onyou it works.",
        votes: 101,
        author: "icellusedkars",
        article_id: 1,
        created_at: "2020-03-01T01:13:00.000Z",
      };
      return request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual({ ...updatedComment });
        });
    });
    test("status 200 responds with amended object - down vote", () => {
      const comment_id = 3;
      const updates = { inc_votes: -1 };
      const updatedComment = {
        comment_id: 3,
        body: "Replacing the quiet elegance of the dark suit and tie with the casual indifference of these muted earth tones is a form of fashion suicide, but, uh, call me crazy ??? onyou it works.",
        votes: 99,
        author: "icellusedkars",
        article_id: 1,
        created_at: "2020-03-01T01:13:00.000Z",
      };
      return request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(updates)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual({ ...updatedComment });
        });
    });
  });
  describe("PATCH/api/comments/:comment_id sad path", () => {
    test("status 400 responds with invalid request - input empty", () => {
      const comment_id = 3;
      const updates = {};
      return request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 400 invalid id", () => {
      return request(app)
        .patch("/api/comments/badpath")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 404 invalid id - id does not exist", () => {
      const updates = { inc_votes: -1 };
      return request(app)
        .patch("/api/comments/999")
        .send(updates)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Not found");
        });
    });
    test("status 400 wrong data type", () => {
      const comment_id = 3;
      const updates = { inc_votes: "bad-request" };
      return request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test("status 400 wrong too many fields", () => {
      const comment_id = 3;
      const updates = { inc_votes: 1, author: "jack" };
      return request(app)
        .patch(`/api/comments/${comment_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
    test.only("status 400 responds with invalid request- incorrect request field", () => {
      const comment_id = 4;
      const updates = { inc_v: 1 };
      return request(app)
        .patch(`/api/articles/${comment_id}`)
        .send(updates)
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("Invalid request");
        });
    });
  });
});

describe("path: /api/users", () => {
  describe("GET/api/users happy path", () => {
    test("status 200 responds with array of users", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          const { users } = body;
          expect(users).toHaveLength(4);
          users.forEach((object) => {
            expect(object).toEqual(
              expect.objectContaining({
                username: expect.any(String),
                name: expect.any(String),
                avatar_url: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET/api/users sad path", () => {
    test("status 404 responds with 'Path not found'", () => {
      return request(app)
        .get("/api/BAD_PATH")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Path not found");
        });
    });
  });
  describe("GET/api/users/:username happy path", () => {
    test("status 200 responds with user by username", () => {
      const username = "butter_bridge";
      return request(app)
        .get(`/api/users/${username}`)
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual({
            username: "butter_bridge",
            name: "jonny",
            avatar_url: "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          });
        });
    });
  });
  describe("GET/api/users/:username sad path", () => {
    test("status 404 username not found", () => {
      const username = "jack";
      return request(app)
        .get(`/api/users/${username}`)
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("Username not found");
        });
    });
  });
});
