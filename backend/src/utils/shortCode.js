import crypto from "crypto";

const CHARSET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const CODE_LENGTH = 5;
const BASE = CHARSET.length;
const ACCEPTABLE_MAX = Math.floor(256 / BASE) * BASE;

export function generateShortCode() {
  let code = "";

  while (code.length < CODE_LENGTH) {
    const buffer = crypto.randomBytes(16);

    for (const byte of buffer) {
      if (byte >= ACCEPTABLE_MAX) {
        continue;
      }

      code += CHARSET[byte % BASE];

      if (code.length === CODE_LENGTH) {
        break;
      }
    }
  }

  return code;
}

export function isValidShortCode(value) {
  return typeof value === "string" && /^[a-zA-Z0-9]{5}$/.test(value);
}
