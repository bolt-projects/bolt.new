export function decodeBase64(encoded: Uint8Array): string {
  const byteChars = Array.from(encoded, (byte) => String.fromCodePoint(byte));
  return btoa(byteChars.join(''));
}

export function encodeBase64(data: string): Uint8Array {
  return Uint8Array.from(atob(data), (ch) => ch.codePointAt(0)!);
}

export const textEncoder = new TextEncoder();
export const textDecoder = new TextDecoder(); 