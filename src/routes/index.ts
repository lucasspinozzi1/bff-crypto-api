import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      response: {
        200: {
          type: "string",
          description: "Server running normally",
        },
        500: {
          type: "string",
          description: "Server not running normally",
        },
      },
    },
    handler: async (_request, reply) => {
      reply.status(200).send("Ok");
    },
  },
});
