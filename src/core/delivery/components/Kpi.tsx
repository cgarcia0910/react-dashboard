import { CardContent, Paper, Typography } from "@mui/material";
import { useKPIs } from "../../application/context/kpi.context";
import { Kpi } from "../../domain/types/kpi";

type KpiProps = {
    label: string,
    selector: keyof Kpi
}

export function KpiWidget({ label, selector }: KpiProps) {
    const { kpis } = useKPIs();

    if (!kpis) return <p>Cargando...</p>;
    return (
        <>
            <CardContent >
                <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                    {label}
                </Typography>
                <Typography variant="h5" component="div">
                    {kpis[selector]}
                </Typography>
            </CardContent>
        </>
    )
}