import { useEffect, useState } from "react";
import { useFetchAndLoad } from "./useFetchAndLoad.js";
import { checkHealth } from "@services/health.service.js";
import { healthAdapter } from "@adapters/health.adapter.js";

export const useHealth = () => {
  const [health, setHealth] = useState(null);
  const [error, setError] = useState(null);
  const { isLoading, callEndpoint } = useFetchAndLoad();

  const loadHealth = async () => {
    try {
      const data = await callEndpoint(checkHealth());
      setHealth(healthAdapter(data));
    } catch (err) {
      if (err.name !== "AbortError") {
        setError(
          "Could not connect to backend" +
            (err.message ? `: ${err.message}` : "")
        );
      }
    }
  };

  useEffect(() => {
    loadHealth();
  }, []);

  return { health, isLoading, error };
};