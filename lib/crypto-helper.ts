import crypto from 'crypto';

function getKey(): Buffer {
  const isProduction = process.env.NODE_ENV === 'production';
  const SECRET_KEY_STRING = process.env.OTP_SECRET;

  if (isProduction && !SECRET_KEY_STRING) {
    throw new Error("❌ Critical: OTP_SECRET environment variable is missing in production!");
  }

  return crypto
    .createHash('sha256')
    .update(SECRET_KEY_STRING || 'fsi-digital-contact-form-otp-secret-key-32-chars-default!')
    .digest();
}

export function encrypt(text: string): string {
  const key = getKey();
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedText: string): string | null {
  try {
    const key = getKey();
    const parts = encryptedText.split(':');
    if (parts.length !== 2) return null;
    const iv = Buffer.from(parts[0], 'hex');
    const encrypted = parts[1];
    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (err) {
    console.error('[CryptoHelper] Decryption failed:', err);
    return null;
  }
}
