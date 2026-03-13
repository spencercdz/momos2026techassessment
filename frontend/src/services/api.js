const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  if (!res.ok) {
    const errorPayload = await res.json().catch(() => ({}));
    throw new Error(errorPayload.error || "Request failed");
  }

  return res.json();
}

export async function shortenUrl(url) {
  return request("/api/shorten", {
    method: "POST",
    body: JSON.stringify({ url })
  });
}

export async function fetchUrls() {
  return request("/api/urls");
}
