import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Type } from "@sinclair/typebox";
import { IGetProvincesParams } from "../../modules/services/types";
import { service } from "../../modules/services/services";
import { SWAGGER_TAGS } from "../../server/tags";

const RequestParamsSchema = Type.Object({
  countryCode: Type.Number(),
});

const ResponseSchema = Type.Object({
  result: Type.Object({
    error: Type.Boolean(),
    message: Type.String(),
    primerNivel: Type.Array(
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
          description: "Provinces",
        },
        502: {
          type: "string",
          description: "Bad gateway",
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const params = request?.query as IGetProvincesParams;
        const provinces = await service.getProvinces(params);
        reply.status(200).send({ result: provinces });
      } catch (error) {
        reply.status(502).send(error.message);
      }
    },
  },
});
