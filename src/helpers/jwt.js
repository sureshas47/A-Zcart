import { jwtDecode } from "jwt-decode";
import { isEmpty } from "lodash";

export const getUserDetailsFromToken = (token) => {
  const decoded = jwtDecode(token);
  if (decoded && isEmpty(decoded)) {
    return {};
  }
  return decoded;
};
