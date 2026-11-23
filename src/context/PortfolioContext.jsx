import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "./AuthContext";

const PortfolioContext = createContext(null);

export const PortfolioProvider = ({ children }) => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPortfolio = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data } = await api.get("/portfolio/me");
      setPortfolio(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchPortfolio();
    else setPortfolio(null);
  }, [user]);

  const updatePortfolio = async (patch) => {
    const { data } = await api.put("/portfolio/me", patch);
    setPortfolio(data);
    return data;
  };

  const localUpdate = (patch) => {
    setPortfolio((p) => ({ ...p, ...patch }));
  };

  return (
    <PortfolioContext.Provider
      value={{ portfolio, loading, fetchPortfolio, updatePortfolio, localUpdate }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => useContext(PortfolioContext);