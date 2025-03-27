import AdminDashboardContainer from '../components/modules/Admin/AdminDashboard/AdminDashboardContainer';
import { Box } from '@mui/material';

const AdminDashboard = () => {
    return (
        <Box sx={{
            height: "calc(100vh - 64px)"  // Fixed: added spaces around the minus sign
        }}>
            <AdminDashboardContainer />
        </Box>
    );
}

export default AdminDashboard;