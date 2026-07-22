import { useEffect, useState } from "react";

export const useFetchAndLoad = () => {
  const [isLoading, setIsLoading] = useState(false);
  let controller;

  const callEndpoint = async (apiCall) => {
    if (apiCall.controller) controller = apiCall.controller;
    setIsLoading(true);

    try {
      const result = await apiCall.call;
      return result;
    } catch (err) {
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const cancelEndpoint = () => {
    setIsLoading(false);
    controller?.abort();
  };

  useEffect(() => () => cancelEndpoint(), []);

  return { isLoading, callEndpoint };
};
