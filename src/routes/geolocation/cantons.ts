import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Type } from "@sinclair/typebox";
import { IGetCantonsParams } from "../../modules/services/types";
import { service } from "../../modules/services/services";
import { SWAGGER_TAGS } from "../../server/tags";

const RequestParamsSchema = Type.Object({
  countryCode: Type.Number(),
  level1Code: Type.Number(),
});

const ResponseSchema = Type.Object({
  result: Type.Object({
    error: Type.Boolean(),
    message: Type.String(),
    segundoNivel: Type.Array(
      Type.Object({
        codigo: Type.String(),
        nombre: Type.String(),
      })
    ),
  }),
});

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      querystring: RequestParamsSchema,
      tags: [SWAGGER_TAGS.LOCATION],
      response: {
        200: {
          ...ResponseSchema,
          description: "Cantons",
        },
        502: {
          type: "string",
          description: "Bad gateway",
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const params = request?.query as IGetCantonsParams;
        const cantons = await service.getCantons(params);
        reply.status(200).send({ result: cantons });
      } catch (error) {
        reply.status(502).send(error.message);
      }
    },
  },
});
