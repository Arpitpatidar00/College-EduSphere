import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom'; // Switch to react-router-dom
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
    styled,
    Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { navigationItems } from '../data/navigationData';
import { APP_COLORS } from '../../../../enums/Colors';

const DRAWER_WIDTH = 260;
const COLLAPSED_WIDTH = 80;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    flexShrink: 0,
    '& .MuiDrawer-paper': {
        boxSizing: 'border-box',
        backgroundColor: APP_COLORS.primary[900],
        color: APP_COLORS.common.white,
        borderRight: `1px solid ${APP_COLORS.grey[50]}`,
        top: '64px',
        height: 'calc(100vh - 64px)',
        transition: theme.transitions.create(['width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
            top: 0,
            height: '100vh',
        },
    },
}));

export default function Sidebar({ collapsed, onToggle }) {
    const location = useLocation(); // Now from react-router-dom
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openSubMenus, setOpenSubMenus] = useState({});

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleSubMenuToggle = (id) => {
        setOpenSubMenus((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const renderMenuItem = ({ id, label, icon: Icon, path, subItems }) => {
        const isActive = location.pathname === path || (subItems && subItems.some(item => location.pathname === item.path));
        const hasSubItems = subItems && subItems.length > 0;

        return (
            <>
                <ListItem key={id} disablePadding>
                    <ListItemButton
                        component={path && !hasSubItems ? Link : 'button'}
                        to={path && !hasSubItems ? path : undefined} // Use "to" instead of "href"
                        onClick={hasSubItems ? () => handleSubMenuToggle(id) : undefined}
                        sx={{
                            justifyContent: collapsed ? 'center' : 'flex-start',
                            px: collapsed ? 2 : 3,
                            py: 1.5,
                            borderTopLeftRadius: '1000px',
                            borderBottomLeftRadius: '1000px',
                            color: isActive ? APP_COLORS.accent[400] : APP_COLORS.grey[100],
                            backgroundColor: isActive ? APP_COLORS.accent[50] : 'transparent',
                            '&:hover': {
                                backgroundColor: APP_COLORS.primary[600],
                                color: APP_COLORS.accent[300],
                            },
                            minHeight: 48,
                            transition: 'all 0.2s ease-in-out',
                        }}
                    >
                        <ListItemIcon
                            sx={{
                                color: isActive ? APP_COLORS.accent[600] : APP_COLORS.grey[300],
                                minWidth: collapsed ? 'unset' : 56,
                                mr: collapsed ? 0 : 2,
                                justifyContent: 'center',
                            }}
                        >
                            <Icon />
                        </ListItemIcon>
                        {!collapsed && (
                            <ListItemText
                                primary={label}
                                sx={{
                                    opacity: collapsed ? 0 : 1,
                                    '& .MuiTypography-root': {
                                        fontWeight: isActive ? 600 : 400,
                                    },
                                }}
                            />
                        )}
                        {!collapsed && hasSubItems && (
                            openSubMenus[id] ? <ExpandLess /> : <ExpandMore />
                        )}
                    </ListItemButton>
                </ListItem>
                {hasSubItems && !collapsed && (
                    <Collapse in={openSubMenus[id]} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                            {subItems.map((subItem) => (
                                <ListItem key={subItem.id} disablePadding>
                                    <ListItemButton
                                        component={Link}
                                        to={subItem.path} // Use "to" instead of "href"
                                        sx={{
                                            pl: 6,
                                            py: 1,
                                            color: location.pathname === subItem.path ? APP_COLORS.accent[400] : APP_COLORS.grey[200],
                                            backgroundColor: location.pathname === subItem.path ? APP_COLORS.primary[700] : 'transparent',
                                            '&:hover': {
                                                backgroundColor: APP_COLORS.primary[500],
                                                color: APP_COLORS.accent[300],
                                            },
                                        }}
                                    >
                                        <ListItemText
                                            primary={subItem.label}
                                            sx={{
                                                '& .MuiTypography-root': {
                                                    fontSize: '0.9rem',
                                                },
                                            }}
                                        />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                    </Collapse>
                )}
            </>
        );
    };

    const drawerContent = (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                bgcolor: APP_COLORS.primary[900],
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    py: 2,
                }}
            >
                <IconButton
                    onClick={onToggle}
                    sx={{
                        color: APP_COLORS.accent[400],
                        display: { xs: 'none', sm: 'block' },
                    }}
                >
                    {collapsed ? '→' : '←'}
                </IconButton>
            </Box>

            <List sx={{ flexGrow: 1 }}>
                {navigationItems.map((item) => renderMenuItem(item))}
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <IconButton
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                    display: { sm: 'none' },
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    zIndex: 1300,
                    color: APP_COLORS.accent[400],
                    bgcolor: APP_COLORS.primary[800],
                    '&:hover': {
                        bgcolor: APP_COLORS.primary[700],
                    },
                }}
            >
                <MenuIcon />
            </IconButton>

            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: 'block', sm: 'none' },
                    '& .MuiDrawer-paper': {
                        width: DRAWER_WIDTH,
                        backgroundColor: APP_COLORS.primary[900],
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            <StyledDrawer
                variant="permanent"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': {
                        width: collapsed ? COLLAPSED_WIDTH : DRAWER_WIDTH,
                    },
                }}
                open
            >
                {drawerContent}
            </StyledDrawer>
        </Box>
    );
}