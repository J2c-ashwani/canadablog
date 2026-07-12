import crypto from 'crypto';

let memorySecretKey: string | null = null;

function getKey(): Buffer {
  const isProduction = process.env.NODE_ENV === 'production';
  const SECRET_KEY_STRING = process.env.OTP_SECRET;

  if (isProduction && !SECRET_KEY_STRING) {
    throw new Error("❌ Critical: OTP_SECRET environment variable is missing in production!");
  }

  let secret = SECRET_KEY_STRING;
  if (!secret) {
    if (!memorySecretKey) {
      memorySecretKey = crypto.randomBytes(32).toString('hex');
      console.warn("⚠️ Warning: OTP_SECRET env variable is missing. Generated a random in-memory secret key for dev/staging.");
    }
    secret = memorySecretKey;
  }

  return crypto
    .createHash('sha256')
    .update(secret)
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
