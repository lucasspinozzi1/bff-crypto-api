import { FastifyReply, FastifyRequest } from "fastify";
import jwt from "jsonwebtoken";
import environment from "../../../config/env";

const userAuth = () => async (request: FastifyRequest, reply: FastifyReply) => {
  try {
    if (typeof request.headers.authorization !== "string") {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid credentials",
      });
    }

    const bearerToken = request.headers.authorization;
    if (!bearerToken.startsWith("Bearer ")) {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid credentials",
      });
    }
    const token = bearerToken.substring(7);
    const decoded = jwt.verify(token, environment.openSSLKey, {
      ignoreExpiration: true,
    });
    if (!decoded || typeof decoded === "string") {
      return reply.status(401).send({
        statusCode: 401,
        error: "Unauthorized",
        message: "Invalid credentials",
      });
    }

    (request.params as { userId: string }).userId = decoded.userId;
    return undefined;
  } catch (err) {
    return reply.status(401).send({
      statusCode: 401,
      error: "Unauthorized",
      message: "Invalid credentials",
    });
  }
};

export function decodeJWT(token: string) {
  const decoded = jwt.decode(token.substring(7));
  if (typeof decoded !== "string") return decoded;
  return undefined;
}

export default userAuth;
