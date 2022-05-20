import { TypeParse, Types as T } from "typeparse";

const userInfoParser = new TypeParse(
  T.Object({
    fullName: T.String(),
    email: T.String(),
  })
);

const infoParser = new TypeParse(
  T.Object({
    firstName: T.String(),
    firstLastName: T.String(),
    secondLastName: T.String(),
    birthDate: T.String(),
    height: T.Number(),
    weight: T.Number(),
    biologicSex: T.String(),
    pronoun: T.String(),
    civilStatus: T.String(),
    ocupation: T.String(),
    address: T.String(),
  })
);

export { userInfoParser, infoParser };
