const swagger = require("fastify-swagger");
const envSchema = require("env-schema");
const routes = require("./app/routes");

function create() {
  // eslint-disable-next-line global-require
  const fastify = require("fastify")();

  fastify.register(swagger, {
    routePrefix: "/documentation",
    swagger: {
      info: {
        title: "Anonymous Survey API's",
        description: "API Docs for the Anonymous Survey",
        version: "0.1.0"
      },
      externalDocs: {
        url: "https://swagger.io",
        description: "Find more info here"
      },
      host: "localhost:8080",
      schemes: ["http"],
      consumes: ["application/json"],
      produces: ["application/json"],
      tags: [{ name: "Survey", description: "Survey related end-points" }]
    },
    exposeRoute: true
  });

  // Routes
  fastify.register(routes, { prefix: "/v1" });

  return fastify;
}

async function start() {
  const fastify = create();
  const defaultSchema = {
    type: "object",
    properties: {
      HOST: {
        type: "string",
        default: "127.0.0.1"
      },
      PORT: {
        type: "integer",
        default: 8080
      }
    }
  };
  const config = envSchema({ schema: defaultSchema, dotenv: true });
  // Run the server!
  fastify.listen(config.PORT, config.HOST, (err, address) => {
    if (err) {
      fastify.log.error(err);
      process.exit(1);
    }
    // eslint-disable-next-line no-console
    console.log(`server listening on ${address}`);
  });
}

if (process.env.NODE_ENV !== "test") {
  start();
}

module.exports = {
  create
};
