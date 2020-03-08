const assert = require("assert");
const request = require("supertest");
const api = require("./index");
const app = api.app;
const url = process.env.URL;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
const noOfQuestions = 3;

describe("Quiz App Server", () => {
  describe("Erroneous URL", () => {
    it("returns 404", done => {
      request(app)
        .get("/error")
        .expect(404, done);
    });
  });

  describe("GET Quiz questions", () => {
    it("returns 200 OK", done => {
      request(app)
        .post("/quiz")
        .send({
          noOfQuestions: noOfQuestions,
          selectedCategory: "13",
          selectedDifficulty: "hard"
        })
        .set("Accept", "application/json")
        .expect(200, done);
    });

    it("returns JSON", done => {
      request(app)
        .post("/quiz")
        .send({
          noOfQuestions: "3",
          selectedCategory: "13",
          selectedDifficulty: "Hard"
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/, done);
    });

    it("returns no of questions", done => {
      request(app)
        .post("/quiz")
        .send({
          noOfQuestions: noOfQuestions,
          selectedCategory: "13",
          selectedDifficulty: "hard"
        })
        .set("Accept", "application/json")
        .expect(res => {
          assert.equal(res.body.results.length, noOfQuestions);
        })
        .end(done);
    });
  });
});
