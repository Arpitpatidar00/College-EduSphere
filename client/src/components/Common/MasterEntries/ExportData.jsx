// ExportData Component
import { APP_COLORS } from '@/enums/Colors';
import { Button } from '@mui/material';

export const ExportData = ({ entityType, rows = [] }) => {
    const handleExport = () => {
        if (rows.length === 0) {
            alert(`No data available to export for ${entityType}`);
            return;
        }

        const csvContent = [
            Object.keys(rows[0] || {}).join(","), // Get headers
            ...rows.map((row) => Object.values(row).join(",")),
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${entityType}_data.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <Button onClick={handleExport} variant="outlined" sx={{
            border: `1px solid ${APP_COLORS.grey[500]}`,
        }}>
            Export
        </Button >
    );
};