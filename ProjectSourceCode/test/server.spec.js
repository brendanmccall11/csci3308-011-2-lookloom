// ********************** Initialize server **********************************
/*
const server = require("../index"); //TODO: Make sure the path to your index.js is correctly added

// ********************** Import Libraries ***********************************

const chai = require("chai"); // Chai HTTP provides an interface for live integration testing of the API's.
const chaiHttp = require("chai-http");
chai.should();
chai.use(chaiHttp);
const { assert, expect } = chai;

// ********************** DEFAULT WELCOME TESTCASE ****************************

describe("Server!", () => {
  // Sample test case given to test / endpoint.
  it("Returns the default welcome message", (done) => {
    chai
      .request(server)
      .get("/welcome")
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.status).to.equals("success");
        assert.strictEqual(res.body.message, "Welcome!");
        done();
      });
  });
});

// *********************** TODO: WRITE 2 UNIT TESTCASES **************************
// Example Positive Testcase :
// API: /add_user
// Input: {id: 5, name: 'John Doe', dob: '2020-02-20'}
// Expect: res.status == 200 and res.body.message == 'Success'
// Result: This test case should pass and return a status 200 along with a "Success" message.
// Explanation: The testcase will call the /add_user API with the following input
// and expects the API to return a status of 200 along with the "Success" message.

describe("Testing Register", () => {
  it("positive : /register", (done) => {
    chai
      .request(server)
      .post("/register")
      .send({
        username: "MyWife",
        password: "gangang",
        firstName: "Your",
        lastName: "Mother",
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.message).to.equals("Success");
        done();
      });
  });
  
  it("negative : /register", (done) => {
    chai
      .request(server)
      .post("/register")
      .send({
        username: 10,
        password: "i_am_doe",
        firstName: "John",
        lastName: "Doe",
      })
      .end((err, res) => {
        expect(res).to.have.status(400); // Expecting a 400 Bad Request status code
        expect(res.body.message).to.equals("Invalid username or password"); // Expecting an appropriate error message
        done();
      });
  });
});

describe('Testing Redirect', () => {
  // Sample test case given to test /test endpoint.
  it('/ route should redirect to /login with 302 HTTP status code', done => {
    chai
      .request(server)
      .get('/')
      .end((err, res) => {
        res.should.have.status(302); // Expecting a redirect status code
        res.should.redirectTo(/^.*127\.0\.0\.1.*\/login$/); // Expecting a redirect to /login with the mentioned Regex
        done();
      });
  });
});

describe('Testing Render', () => {
    // Sample test case given to test /test endpoint.
    it('test "/accountDetails" route should render with an html response', done => {
      chai
        .request(server)
        .get('/accountDetails') // for reference, see lab 8's login route (/login) which renders home.hbs
        .end((err, res) => {
          res.should.have.status(200); // Expecting a success status code
          res.should.be.html; // Expecting a HTML response
          done();
        });
    });
  });
*/
// ********************************************************************************
