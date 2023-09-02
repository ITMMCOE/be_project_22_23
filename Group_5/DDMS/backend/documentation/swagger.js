const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = ["../index.js"];

const doc = {
  info: {
    version: "1.0.0",
    title: "DDMS API Documentation",
    description: "Backend API Documentation",
  },
  host: "localhost:5000",
  basePath: "/",
  schemes: ["http", "https"],
  consumes: ["application/json"],
  produces: ["application/json"],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
