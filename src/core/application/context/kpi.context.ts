import { createContext, useContext } from "react";
import { Kpi } from "../../domain/types/kpi";

interface KPIContextType {
  kpis: Kpi | null;
}

export const KPIContext = createContext<KPIContextType | undefined>(undefined);

export const useKPIs = (): KPIContextType => {
  const context = useContext(KPIContext);
  if (!context) {
    throw new Error("useKPIs debe usarse dentro de KPIProvider");
  }
  return context;
};