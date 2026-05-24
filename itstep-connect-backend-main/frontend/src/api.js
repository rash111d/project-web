const API_BASE = "http://localhost:8080";

async function request(path, options = {}) {
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || data.message || "Request failed");
  return data;
}

export const api = {
  baseUrl: API_BASE,
  async health() {
    return request("/");
  },
  async register(payload) {
    return request("/register", { method: "POST", body: JSON.stringify(payload) });
  },
  async login(payload) {
    return request("/login", { method: "POST", body: JSON.stringify(payload) });
  },
  async getPosts(token) {
    return request("/api/posts", { headers: { Authorization: `Bearer ${token}` } });
  },
  async createPost(token, payload) {
    return request("/api/posts", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
  },
  async deletePost(token, id) {
    return request(`/api/posts/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  },
  async getComments(token, postId) {
    return request(`/api/posts/${postId}/comments`, { headers: { Authorization: `Bearer ${token}` } });
  },
  async createComment(token, payload) {
    return request("/api/comments", { method: "POST", headers: { Authorization: `Bearer ${token}` }, body: JSON.stringify(payload) });
  },
  async deleteComment(token, id) {
    return request(`/api/comments/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
  }
};
