import { sha256 } from 'js-sha256';
import base64url from 'base64url';
import { JWT_SECRET_KEY } from "@/const/auth";

function encode(obj: object) {
  return base64url.encode(JSON.stringify(obj));
}

export const createJWT = async (payload: any = {}) => {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  // 创建JWT
  payload.iat = now;
  payload.exp = now + 3600;

  const headerEnc = encode(header);
  const payloadEnc = encode(payload);
  const data = `${headerEnc}.${payloadEnc}`;
  const hashedKey = sha256.array(JWT_SECRET_KEY);
  const sigHex = sha256.hmac(hashedKey, data); // => hex string
  const sigB64 = base64url(Buffer.from(sigHex, 'hex'));

  return `${data}.${sigB64}`;
};
