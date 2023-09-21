const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });
const { models, generateSchemas } = require("./m2s");
const fs = require("node:fs");
const doc = {
  info: {
    version: "", // by default: '1.0.0'
    title: "", // by default: 'REST API'
    description: "", // by default: ''
  },
  host: "", // by default: 'localhost:3000'
  basePath: "", // by default: '/'
  schemes: [], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    // by default: empty Array
    {
      name: "", // Tag name
      description: "", // Tag description
    },
    // { ... }
  ],
  securityDefinitions: {}, // by default: empty object
  definitions: {}, // by default: empty object (Swagger 2.0)
  components: {
    '@schemas':{

    }
  }, // by default: empty object (OpenAPI 3.x)
};

generateSchemas().then(() => {
  models.forEach((model) => {
    try {
      const file = fs.readFileSync(
        "./swagger-schemas/" + model.label + ".json",
        "utf-8"
      );
      doc.components['@schemas'] = { ...doc.components['@schemas'], [model.label]: JSON.parse(file) };
    } catch (error) {
      // console.log(error);
    }
  });
  const outputFile = "./path/swagger-output.json";
  const endpointsFiles = ["./app.js"];

  swaggerAutogen(outputFile, endpointsFiles, doc).then((data) => {
    require("./app.js");
  });
});