import { APP_COLORS } from '@/enums/Colors';
import { Table, TableBody, TableCell, TableHead, TableRow, Box, TableContainer } from '@mui/material';

const CustomDataGrid = ({ columns, currentRows }) => {
    return (
        <Box sx={{ overflowX: 'auto', height: '650px' }}>
            <TableContainer sx={{
                maxHeight: '650px', overflowY: 'auto', borderRadius: 6,
            }}>
                <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
                    <TableHead>
                        <TableRow>
                            {columns?.map((column) => (
                                <TableCell
                                    key={column.field}
                                    sx={{
                                        width: column.width,
                                        fontWeight: 'bold',
                                        backgroundColor: APP_COLORS.primary[800],
                                        position: 'sticky',
                                        top: 0,
                                        zIndex: 2,
                                        color: APP_COLORS.secondary[400]
                                    }}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {currentRows.map((row) => (
                            <TableRow key={row.id}>
                                {columns.map((column) => (
                                    <TableCell key={column.field} sx={{ width: column.width }}>
                                        {column.renderCell
                                            ? column.renderCell({ value: row[column.field], row })
                                            : row[column.field]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default CustomDataGrid;