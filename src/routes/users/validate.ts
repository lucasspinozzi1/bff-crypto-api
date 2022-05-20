import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Type } from "@sinclair/typebox";
import { ospiProService } from "../../modules/services/services";
import { SWAGGER_TAGS } from "../../server/tags";
import { IGetUserInfoParams } from "../../modules/services/types";

const RequestParamsSchema = Type.Object({
  documentType: Type.Number(),
  documentNumber: Type.String(),
  institutionId: Type.String(),
});

const ResponseSchema = Type.Object({
  result: Type.Object({
    message: Type.String(),
    paciente: Type.Object({
      name: Type.String(),
      surname: Type.String(),
      lastSurname: Type.String(),
      dateOfBirth: Type.String(),
      gender: Type.String(),
    }),
  }),
});

export default (_server: FastifyInstance): StrictResource => ({
  post: {
    schema: {
      body: RequestParamsSchema,
      tags: [SWAGGER_TAGS.PATIENT],
      response: {
        200: {
          ...ResponseSchema,
          description: "Information",
        },
        502: {
          type: "string",
          description: "Bad gateway",
        },
      },
    },
    handler: async (request, reply) => {
      try {
        const params = request?.body as IGetUserInfoParams;
        const patientInfo = await ospiProService.getUserInfo(params);
        reply.status(200).send({ result: patientInfo });
      } catch (error) {
        reply.status(502).send(error.message);
      }
    },
  },
});