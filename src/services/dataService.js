import http from "./httpService";
import { postEndpoint } from "../config/endpoints";

export function getData() {
  return http.get(postEndpoint);
}
