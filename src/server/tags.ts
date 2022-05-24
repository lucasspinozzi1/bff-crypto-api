import { capitalize } from "lodash";

/*
  These tag definitions are modified on runtime

  From:
    SWAGGER_TAGS: {
      <Tag name>: "<Tag description>"
    }

  To:
    SWAGGER_TAGS: {
      <Tag name>: "<Tag name capitalized>"
    }

  And the swagger definitions are instantiated:
    SWAGGER_TAG_DEFINITIONS: [
      {
        name: "<Tag name capitalized>",
        description: "<Tag description>"
      }
    ]
*/

const SWAGGER_TAGS: { [name: string]: string } = {
  LOCATION: "Geolocation information endpoints",
  USER: "User endpoints",
  ACCOUNT: "Account endpoints",
};

interface SwaggerTagDefinition {
  name: string;
  description: string;
}

function buildSwaggerTagDefinitions(): SwaggerTagDefinition[] {
  const swaggerTagDefinitions: SwaggerTagDefinition[] = [];

  Object.keys(SWAGGER_TAGS).forEach((tagName) => {
    const description = SWAGGER_TAGS[tagName];
    const name = capitalize(tagName);
    SWAGGER_TAGS[tagName] = name;
    swaggerTagDefinitions.push({ name, description });
  });

  return swaggerTagDefinitions;
}

const SWAGGER_TAG_DEFINITIONS = buildSwaggerTagDefinitions();

export { SWAGGER_TAGS, SWAGGER_TAG_DEFINITIONS };
