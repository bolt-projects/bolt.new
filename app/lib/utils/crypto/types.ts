export interface CryptoConfig {
  ivLength: number;
  algorithm: 'AES-CBC';
}

export interface EncryptionResult {
  ciphertext: string;
  iv: Uint8Array;
}

export interface DecryptionInput {
  payload: string;
  key: string;
} 