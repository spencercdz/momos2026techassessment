export function getPort() {
  return process.env.PORT || 3000;
}

export function getBaseUrl() {
  return process.env.BASE_URL || "http://localhost:3000";
}
