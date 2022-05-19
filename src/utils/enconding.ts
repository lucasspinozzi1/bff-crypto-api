export function decodeB64(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf8");
}

export function encodeB64(decoded: string): string {
  return Buffer.from(decoded, "utf8").toString("base64");
}

export function decodeB64JSON(encoded: string): unknown {
  return JSON.parse(decodeB64(encoded));
}

export function encodeB64JSON(decoded: unknown): string {
  return encodeB64(JSON.stringify(decoded));
}
