import { FastifyInstance } from "fastify";
import { StrictResource } from "fastify-autoroutes";
import { Static, Type } from "@sinclair/typebox";
import Boom from "@hapi/boom";
import { SWAGGER_TAGS } from "../../server/tags";
import { ospiProService } from "../../modules/services/services";
import { encodeB64JSON } from "../../utils/enconding";

const RequestParamsSchema = Type.Object({
  latitude: Type.String(),
  longitude: Type.String(),
  type: Type.Number(),
  detail: Type.Optional(Type.String()),
  range: Type.Optional(Type.Number()),
  order: Type.Optional(Type.Number()),
  price: Type.Optional(Type.Number()),
  appt: Type.Optional(Type.Number()),
  mode: Type.Optional(Type.Number()),
  date: Type.Optional(Type.String()),
});

const ResponseSchema = Type.Object(
  {
    doctors: Type.Array(
      Type.Object({
        doctorId: Type.String(),
        name: Type.String(),
        speciality: Type.String(),
        info: Type.String(),
        price: Type.String(),
        medicalInstitutions: Type.Array(
          Type.Object({
            id: Type.String(),
            name: Type.String(),
            externalId: Type.String(),
            latitude: Type.Number(),
            longitude: Type.Number(),
            province: Type.String(),
            canton: Type.String(),
            district: Type.String(),
            distance: Type.Optional(Type.Number()),
          })
        ),
        telephone: Type.String(),
        schedule: Type.String(),
        web: Type.String(),
        email: Type.String(),
        acceptVirtual: Type.Boolean(),
        patientVirtualLink: Type.Optional(Type.String()),
        doctorVirtualLink: Type.Optional(Type.String()),
      })
    ),
  },
  {
    example: {
      doctors: [
        {
          doctorId: "623a34d8ef9e97ce33a3",
          name: "Dr. Orlando Carazo",
          speciality: "Medicina General",
          info: "Tengo más de 10 años de experiencia en el área y procuro brindarle a mis pacientes una atención y solución en forma integral con ética y responsabilidad",
          price: "25000",
          medicalIntitutions: [
            {
              id: "6262d955bc2e1364edf0",
              name: "Hospital Dr. Tony Facio Castro",
              externalId: "df24be87-dd2e-473f-a4b4-1d6ffc532db1",
              latitude: "9.999662092858534",
              longitude: "-83.02598837416669",
              province: "San José",
              canton: "San José",
              district: "San José",
            },
          ],
          telephone: "27959595",
          schedule: "9:00 am - 5:00 pm",
          web: "droscarsolano.com",
          email: "dr.oscar.solano@gmail.com",
          acceptVirtual: true,
          patientVirtualLink: "https://zoom.us/s/2530119601",
          doctorVirtualLink: "https://zoom.us/signin",
        },
      ],
    },
  }
);

type RequestParamsType = Static<typeof RequestParamsSchema>;

export default (_server: FastifyInstance): StrictResource => ({
  get: {
    schema: {
      querystring: RequestParamsSchema,
      tags: [SWAGGER_TAGS.GUIDE],
      response: {
        200: {
          description: "Doctors general information",
          ...ResponseSchema,
        },
        404: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Doctors info not found",
        },
        422: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Bad data found",
        },
        500: {
          type: "object",
          properties: {
            statusCode: { type: "number" },
            error: { type: "string" },
            message: { type: "string" },
          },
          description: "Internal Server Error",
        },
      },
    },
    handler: async (request, reply) => {
      const {
        latitude,
        longitude,
        type,
        detail,
        range,
        order,
        price,
        appt,
        mode,
        date,
      } = request.query as RequestParamsType;
      try {
        const result = await ospiProService.getDoctors({
          latitude,
          longitude,
          type,
          detail,
          range,
          order,
          price,
          appt,
          mode,
          date,
        });

        reply.status(200).send(result);
      } catch (error) {
        if (Boom.isBoom(error)) {
          if (error.output.statusCode === 404) {
            reply.redirect(
              303,
              `/api/sync/start-sync?params=${encodeB64JSON({
                collection: "EHG_DOCTORS",
              })}`
            );
          } else {
            reply.status(error.output.statusCode).send(error.output.payload);
          }
        } else {
          reply.status(500).send({
            statusCode: 500,
            error: error.name,
            message: error.message,
          });
        }
      }
    },
  },
});
