import { encodeBase64 } from './encoding';

export async function createCryptoKey(key: string): Promise<CryptoKey> {
  return await crypto.subtle.importKey(
    'raw',
    encodeBase64(key),
    { name: 'AES-CBC' },
    false,
    ['encrypt', 'decrypt']
  );
}

export function generateIV(length: number): Uint8Array {
  return crypto.getRandomValues(new Uint8Array(length));
} 