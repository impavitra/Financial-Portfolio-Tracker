import axios from "axios";

const API_BASE_URL = "https://financial-portfolio-tracker.onrender.com/api";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (username, password) =>
    api.post("/auth/login", { username, password }),

  register: (username, password, email) =>
    api.post("/auth/register", { username, password, email }),

  verifyToken: () => api.get("/auth/verify"), // This endpoint would need to be added to backend
};

// Portfolio API
export const portfolioAPI = {
  getPortfolios: () => api.get("/portfolios"),

  getPortfolio: (id) => api.get(`/portfolios/${id}`),

  createPortfolio: (name) => api.post("/portfolios", { name }),

  addAsset: (portfolioId, ticker, quantity) =>
    api.post(`/portfolios/${portfolioId}/assets`, { ticker, quantity }),

  removeAsset: (portfolioId, ticker) =>
    api.delete(`/portfolios/${portfolioId}/assets/${ticker}`),

  getInsights: (portfolioId) => api.get(`/portfolios/${portfolioId}/insights`),
};

// Stock API
export const stockAPI = {
  getStockPrice: (ticker) => api.get(`/stocks/${ticker}/price`),

  getStockInfo: (ticker) => api.get(`/stocks/${ticker}/info`),
};

export default api;
