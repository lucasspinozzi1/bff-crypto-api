import Boom from "@hapi/boom";
import { FastifyReply } from "fastify";
import { encodeB64JSON } from "../../utils/enconding";

export function handleExceptionReply(
  reply: FastifyReply,
  error: Error,
  collection: string
) {
  if (!Boom.isBoom(error)) {
    reply.status(500).send({
      statusCode: 500,
      error: error.name,
      message: error.message,
    });
    return;
  }
  if (error.output.statusCode === 404) {
    reply.redirect(
      303,
      `/api/sync/start-sync?params=${encodeB64JSON({ collection })}`
    );
  } else {
    reply.status(error.output.statusCode).send(error.output.payload);
  }
}

export default handleExceptionReply;
