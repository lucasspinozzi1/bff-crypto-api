import { TypeParse, Types as T } from "typeparse";

export const accountParser = new TypeParse(
    T.Object({
      client_id: T.String(),
      statusUpdateDateTime: T.Number(),
      nickName: T.String(),
      adress: T.String(),
      status: T.String(),
    })
  );