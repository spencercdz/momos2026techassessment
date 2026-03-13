export function validateUrl(value) {
  if (!value || typeof value !== "string") {
    return { valid: false, error: "URL is required." };
  }

  try {
    const parsed = new URL(value);
    if (!/^(http|https):$/.test(parsed.protocol)) {
      return { valid: false, error: "URL must start with http:// or https://" };
    }
  } catch {
    return { valid: false, error: "URL is not valid." };
  }

  return { valid: true };
}
