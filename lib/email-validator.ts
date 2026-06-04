/**
 * Email validation utility to filter out obvious fake domains, disposable domains, and typos.
 */

// Common disposable/burner email domains
const DISPOSABLE_DOMAINS = new Set([
  "mailinator.com",
  "yopmail.com",
  "tempmail.com",
  "temp-mail.org",
  "10minutemail.com",
  "guerrillamail.com",
  "sharklasers.com",
  "dispostable.com",
  "trashmail.com",
  "getairmail.com",
  "burnermail.io",
  "maildrop.cc",
  "fakeinbox.com",
  "throwawaymail.com",
  "mintemail.com",
  "getnada.com",
  "harakirimail.com",
  "mailnesia.com",
  "mailcatch.com",
  "generator.email",
  "disposablemail.com",
]);

// Common fake, testing, or placeholder domains
const FAKE_DOMAINS = new Set([
  "test.com",
  "example.com",
  "asdf.com",
  "domain.com",
  "myemail.com",
  "none.com",
  "noemail.com",
  "fake.com",
  "xyz.com",
  "abc.com",
  "123.com",
  "qwer.com",
  "zxcv.com",
]);

// Common domain typos that indicate a mistake (e.g. gamil.com instead of gmail.com)
const TYPO_DOMAINS = new Set([
  "gamil.com",
  "gmal.com",
  "gmaill.com",
  "yaho.com",
  "hotmal.com",
  "outlok.com",
]);

// Obvious keyboard mashing or placeholder usernames (local parts)
const FAKE_USERNAMES = new Set([
  "asdf",
  "asdfg",
  "test",
  "testing",
  "qwer",
  "qwert",
  "zxcv",
  "admin",
  "none",
  "noemail",
  "fake",
  "abc",
  "abcd",
  "123",
  "1234",
  "12345",
  "aaaa",
  "bbbb",
  "cccc",
]);

export interface EmailValidationError {
  isValid: boolean;
  error?: string;
  isTypo?: boolean;
  suggestion?: string;
}

export function validateEmail(email: string): EmailValidationError {
  if (!email) {
    return { isValid: false, error: "Email address is required." };
  }

  const cleanEmail = email.trim().toLowerCase();

  // 1. Basic format verification with a standard regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(cleanEmail)) {
    return { isValid: false, error: "Please enter a valid email format (e.g. name@domain.com)." };
  }

  // Split into username (local part) and domain
  const parts = cleanEmail.split("@");
  if (parts.length !== 2) {
    return { isValid: false, error: "Please enter a valid email format." };
  }

  const [username, domain] = parts;

  // 2. Reject disposable domains
  if (DISPOSABLE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Disposable or burner email addresses are not accepted. Please use your real personal or business email.",
    };
  }

  // 3. Reject obvious fake/testing domains
  if (FAKE_DOMAINS.has(domain)) {
    return {
      isValid: false,
      error: "Testing or placeholder email domains are not accepted. Please enter a valid email address.",
    };
  }

  // 4. Reject obvious keyboard-mash/placeholder usernames
  if (FAKE_USERNAMES.has(username) || username.length < 2) {
    return {
      isValid: false,
      error: "Please enter a valid email address (avoid placeholder names like 'asdf' or 'test').",
    };
  }

  // 5. Catch obvious typos (like gamil.com instead of gmail.com) to help the user
  if (TYPO_DOMAINS.has(domain)) {
    let suggestion = "";
    if (domain.startsWith("gam") || domain.startsWith("gma")) suggestion = "gmail.com";
    if (domain.startsWith("yah")) suggestion = "yahoo.com";
    if (domain.startsWith("hot")) suggestion = "hotmail.com";
    if (domain.startsWith("out")) suggestion = "outlook.com";

    return {
      isValid: false,
      isTypo: true,
      error: `Did you mean ${username}@${suggestion || "something else"}? Please double-check your email domain.`,
      suggestion: suggestion ? `${username}@${suggestion}` : undefined,
    };
  }

  return { isValid: true };
}
