import { textEncoder, textDecoder, decodeBase64, encodeBase64 } from './encoding';
import { createCryptoKey, generateIV } from './keys';
import type { CryptoConfig, EncryptionResult, DecryptionInput } from './types';

const DEFAULT_CONFIG: CryptoConfig = {
  ivLength: 16,
  algorithm: 'AES-CBC'
};

export async function encrypt(key: string, data: string, config: CryptoConfig = DEFAULT_CONFIG): Promise<string> {
  const iv = generateIV(config.ivLength);
  const cryptoKey = await createCryptoKey(key);

  const ciphertext = await crypto.subtle.encrypt(
    {
      name: config.algorithm,
      iv,
    },
    cryptoKey,
    textEncoder.encode(data),
  );

  const bundle = new Uint8Array(config.ivLength + ciphertext.byteLength);
  bundle.set(new Uint8Array(ciphertext));
  bundle.set(iv, ciphertext.byteLength);

  return decodeBase64(bundle);
}

export async function decrypt({ payload, key }: DecryptionInput, config: CryptoConfig = DEFAULT_CONFIG): Promise<string> {
  const bundle = encodeBase64(payload);
  const iv = new Uint8Array(bundle.buffer, bundle.byteLength - config.ivLength);
  const ciphertext = new Uint8Array(bundle.buffer, 0, bundle.byteLength - config.ivLength);

  const cryptoKey = await createCryptoKey(key);

  const plaintext = await crypto.subtle.decrypt(
    {
      name: config.algorithm,
      iv,
    },
    cryptoKey,
    ciphertext,
  );

  return textDecoder.decode(plaintext);
} 