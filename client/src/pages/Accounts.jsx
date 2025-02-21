
import { Grid2 } from '@mui/material';
import UserProfile from '../components/HomePage/Accounts/UserProfile';
import { APP_COLORS } from '../enums/Colors';
const Accounts = () => {
    return (
        <Grid2 container sx={{ height: '90vh', padding: 2, bgcolor: APP_COLORS.accent, borderRadius: 4 }}>
            <UserProfile />
        </Grid2>
    );
}

export default Accounts;
