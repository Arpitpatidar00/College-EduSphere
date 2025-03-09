import { useState } from "react";
import { useLocation, Link } from "wouter";
import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    IconButton,
    useTheme,
    styled,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { navigationItems } from "../data/navigationData";

const DRAWER_WIDTH = 240;

const StyledDrawer = styled(Drawer)(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: DRAWER_WIDTH,
        boxSizing: "border-box",
        backgroundColor: theme.palette.background.default,
        borderRight: `1px solid ${theme.palette.divider}`,
        top: "64px",
        height: "calc(100vh - 64px)",
    },
}));

const Logo = styled(Box)(({ theme }) => ({
    padding: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    gap: theme.spacing(2),
    borderBottom: `1px solid ${theme.palette.divider}`,
}));

export default function Sidebar() {
    const [location] = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState({});

    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const toggleSubMenu = (id) => {
        setOpenMenus((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    const drawerContent = (
        <>
            <Logo>
                <Box
                    sx={{
                        width: 40,
                        backgroundColor: "primary.main",
                        borderRadius: 1,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                ></Box>

            </Logo>
            <List>
                {navigationItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location === item.path;

                    return (
                        <Box key={item.id}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    component={item.subItems ? undefined : Link}
                                    href={item.subItems ? undefined : item.path}
                                    selected={isActive}
                                    onClick={item.subItems ? () => toggleSubMenu(item.id) : undefined}
                                    sx={{
                                        borderRadius: 1,
                                        mx: 1,
                                        mb: 0.5,
                                        "&.Mui-selected": {
                                            backgroundColor: theme.palette.action.selected,
                                        },
                                    }}
                                >
                                    <ListItemIcon>
                                        <Icon color={isActive ? "primary" : "inherit"} />
                                    </ListItemIcon>
                                    <ListItemText primary={item.label} />
                                    {item.subItems &&
                                        (openMenus[item.id] ? <ExpandLess /> : <ExpandMore />)}
                                </ListItemButton>
                            </ListItem>
                            {item.subItems && (
                                <Collapse in={openMenus[item.id]} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        {item.subItems.map((subItem) => (
                                            <ListItem key={subItem.id} disablePadding>
                                                <ListItemButton
                                                    component={Link}
                                                    href={subItem.path}
                                                    sx={{
                                                        pl: 4,
                                                        borderRadius: 1,
                                                        mx: 1,
                                                        mb: 0.5,
                                                    }}
                                                >
                                                    <ListItemText primary={subItem.label} />
                                                </ListItemButton>
                                            </ListItem>
                                        ))}
                                    </List>
                                </Collapse>
                            )}
                        </Box>
                    );
                })}
            </List>
        </>
    );

    return (
        <Box sx={{ display: "flex" }}>
            {/* Mobile Menu Button */}
            <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
            >
                <MenuIcon />
            </IconButton>

            {/* Mobile Drawer */}
            <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{ keepMounted: true }}
                sx={{
                    display: { xs: "block", sm: "none" },
                    "& .MuiDrawer-paper": {
                        width: DRAWER_WIDTH,
                        top: "64px",
                        height: "calc(100vh - 64px)",
                    },
                }}
            >
                {drawerContent}
            </Drawer>

            {/* Desktop Sidebar */}
            <StyledDrawer
                variant="permanent"
                open
                sx={{
                    display: { xs: "none", sm: "block" },
                }}
            >
                {drawerContent}
            </StyledDrawer>
        </Box>
    );
}
