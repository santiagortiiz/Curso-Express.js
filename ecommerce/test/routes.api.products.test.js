const assert = require("assert");
const proxyquire = require("proxyquire");

const {
  productsMock,
  ProductsServiceMock
} = require("../utils/mocks/products");

const testServer = require("../utils/testServer");

describe("routes - api - products", function() {
  const route = proxyquire("../routes/api/products", {
    // Instead of this ProductsService = require("../../services/products") use this "ProductsServiceMock" 
    "../../services/products": ProductsServiceMock  
  });

  const request = testServer(route);  // return supertest(app)

  describe("GET /products", function() {
    it("should respond with status 200", function(done) {
      request.get("/api/products").expect(200, done);
    });

    // it("should respond with content type json", function(done) {
    //   request.get("/api/products").expect("Content-type", /json/, done);
    // });

    // it("should respond with not error", function(done) {
    //   request.get("/api/products").end((err, res) => {
    //     assert.strictEqual(err, null);
    //     done();
    //   });
    // });

    // it("should respond with the list of products", function(done) {
    //   request.get("/api/products").end((err, res) => {
    //     assert.deepStrictEqual(res.body, {
    //       data: productsMock,
    //       message: "products listed"
    //     });
    //     done();
    //   });
    // });
  });
})