
import { useEffect, useReducer } from "react";
import { Kpi, KpiUpdate } from "../../domain/types/kpi";
import { KPIContext } from "./kpi.context";

interface Props {
    children: React.ReactNode;
  }
  
  type Action =
    | { type: "SET_KPIS"; payload: Kpi }
    | { type: "UPDATE_KPI"; payload: KpiUpdate };
  
  const reducer = (state: Kpi | null, action: Action): Kpi | null => {
    switch (action.type) {
      case "SET_KPIS":
        return action.payload;
      case "UPDATE_KPI":
        return state ? { ...state, ...action.payload } : state;
      default:
        return state;
    }
  };

  export const KPIProvider = ({ children }: Props) => {
    const [kpis, dispatch] = useReducer(reducer, null);
  
    useEffect(() => {
      // 🔹 Fetch inicial
      const fetchKPIs = async () => {
        try {
          const res = await fetch("http://localhost:3001/kpis");
          const data: Kpi = await res.json();
          dispatch({ type: "SET_KPIS", payload: data });
        } catch (err) {
          console.error("Error cargando KPIs:", err);
        }
      };
  
      fetchKPIs();
   // 🔹 Socket
   const socket = new WebSocket("ws://localhost:8080");

   socket.onmessage = (event: MessageEvent) => {
     try {
       const update: KpiUpdate = JSON.parse(event.data);
       dispatch({ type: "UPDATE_KPI", payload: update });
     } catch (err) {
       console.error("Error parseando update:", err);
     }
   };

   socket.onerror = (err) => {
     console.error("Socket error:", err);
   };
 }, []);

 return (
   <KPIContext.Provider value={{ kpis }}>
     {children}
   </KPIContext.Provider>
 )
};