import crypto from "crypto";

export const mockEmail = () => {
  return crypto.randomBytes(16).toString("hex") + "@mocked.com";
};
