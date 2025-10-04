import { createContext, useContext, useState } from "react";
import { portfolioAPI } from "../services/api";

const PortfolioContext = createContext();

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}

export function PortfolioProvider({ children }) {
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await portfolioAPI.getPortfolios();
      setPortfolios(response.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch portfolios");
    } finally {
      setLoading(false);
    }
  };

  const createPortfolio = async (name) => {
    try {
      const response = await portfolioAPI.createPortfolio(name);
      setPortfolios((prev) => [...prev, response.data]);
      return response;
    } catch (err) {
      throw err;
    }
  };

  const addAsset = async (portfolioId, ticker, quantity) => {
    try {
      await portfolioAPI.addAsset(portfolioId, ticker, quantity);
      // Refresh portfolios to get updated data
      await fetchPortfolios();
    } catch (err) {
      throw err;
    }
  };

  const removeAsset = async (portfolioId, ticker) => {
    try {
      await portfolioAPI.removeAsset(portfolioId, ticker);
      // Refresh portfolios to get updated data
      await fetchPortfolios();
    } catch (err) {
      throw err;
    }
  };

  const getPortfolioById = (id) => {
    return portfolios.find((portfolio) => portfolio.id === parseInt(id));
  };

  const value = {
    portfolios,
    loading,
    error,
    fetchPortfolios,
    createPortfolio,
    addAsset,
    removeAsset,
    getPortfolioById,
  };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}
