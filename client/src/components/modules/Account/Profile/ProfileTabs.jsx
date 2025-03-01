import React from 'react';
import { Box, Tabs, Tab, styled } from '@mui/material';
import { APP_COLORS } from '../../../../enums/Colors';

const StyledTab = styled(Tab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight: 1000,
    padding: '12px 16px',
    minWidth: 0,
    display: 'flex',
    alignItems: 'center',
    '&.Mui-selected': {
        color: theme.palette.text.primary,
        fontWeight: 600,
    },
}));

const CountBadge = styled('span')(({ theme }) => ({
    fontSize: '12px',
    fontWeight: 'normal',
    color: theme.palette.text.secondary,
    marginLeft: '4px',
}));

const ProfileTabs = ({ tabs = [] }) => {
    const [value, setValue] = React.useState(0);

    // Default social media tabs
    const defaultTabs = [
        { name: "Posts", count: 120 },
        { name: "Photos", count: 45 },
        { name: "Videos", count: 30 },
        { name: "Friends", count: 500 },
        { name: "Likes", count: 200 }
    ];

    const activeTabs = tabs.length > 0 ? tabs : defaultTabs;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="primary"
                textColor={APP_COLORS.secondary[400]}
                variant="scrollable"
                scrollButtons="auto"
            >
                {activeTabs.map((tab) => (
                    <StyledTab
                        key={tab.name}
                        label={
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {tab.name}
                                {tab.count && <CountBadge>({tab.count})</CountBadge>}
                            </Box>
                        }
                    />
                ))}
            </Tabs>
        </Box>
    );
};

export default ProfileTabs;
