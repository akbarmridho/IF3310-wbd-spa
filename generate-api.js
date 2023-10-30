import path from "path";
import { generateApi } from "swagger-typescript-api";

void generateApi({
  name: "Api",
  // eslint-disable-next-line no-undef
  input: path.resolve(process.cwd(), "../milestone-2-rest/docs/v1.json"),
  // eslint-disable-next-line no-undef
  output: path.resolve(process.cwd(), "./src/lib"),
  typePrefix: "Api",
  generateUnionEnums: true,
  httpClientType: "axios",
  extractResponseError: true,
  extractResponseBody: true,
});
