// Fungsi helper untuk decode key Base64 ke buffer
function getCryptoKeyBase64(b64Key: string): Uint8Array {
    const binaryString = atob(b64Key);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }
  
  // Inisialisasi CryptoKey untuk AES-GCM
  // Inisialisasi CryptoKey untuk AES-GCM
async function getEncryptionKey(): Promise<CryptoKey> {
    const keyBuffer = getCryptoKeyBase64(process.env.ENCRYPTION_KEY!);
    return await crypto.subtle.importKey(
      'raw',
      keyBuffer.buffer as ArrayBuffer, // Ekstrak buffer dan cast ke ArrayBuffer
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    );
  }
  
  export async function encryptSensitive(text: string): Promise<{ encryptedData: string, iv: string }> {
    const enc = new TextEncoder();
    const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV standar GCM
    const key = await getEncryptionKey();
  
    const ciphertextBuffer = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(text)
    );
  
    // WebCrypto menggabungkan Ciphertext + Auth Tag secara otomatis di array buffer
    return {
      encryptedData: Buffer.from(ciphertextBuffer).toString('base64'),
      iv: Buffer.from(iv).toString('base64')
    };
  }
  
  export async function decryptSensitive(encryptedBase64: string, ivBase64: string): Promise<string> {
    const key = await getEncryptionKey();
    const encryptedData = Buffer.from(encryptedBase64, 'base64');
    const iv = Buffer.from(ivBase64, 'base64');
  
    const decryptedBuffer = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encryptedData
    );
  
    return new TextDecoder().decode(decryptedBuffer);
  }