import { StatusCodes } from "http-status-codes";
import server from "../../src/index";

describe("server test", () => {
  afterAll(() => {
    server.close();
  });

  test("responds with success on request /", async () => {
    const response = await server.inject({
      method: "GET",
      url: "/ping",
    });

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.payload).toBe("pong");
  });
});
