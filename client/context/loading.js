import { createContext, useContext, useState } from "react";
import Loading from "../components/Loading";

const LoadingContext = createContext({
  loading: false,
  setLoading: null,
});

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(false);
  const value = { loading, setLoading };

  if(loading) return (<Loading />)

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}


export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within LoadingProvider");
  }
  return context;
}