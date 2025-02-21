import { useState } from "react";
import {
    Box,
    Typography,
    TextField,
    List,
    ListItem,
    ListItemButton,
    Avatar,
    Badge,
    Tabs,
    Tab,
    IconButton,
    Card,
} from "@mui/material";
import { Search, Edit } from "@mui/icons-material";
import { APP_COLORS } from '../../../enums/Colors';

const MessageSidebar = () => {
    const [selectedTab, setSelectedTab] = useState(0);

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };

    const messages = [
        { name: "Jhon", message: "hi, good morning", unread: false, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Abhilash", message: "hey where are you????", unread: false, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Aman", message: "hlo How do you do", unread: true, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "George Jose", message: "Now I'm in France", unread: true, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Hani Rahman", message: "hi, good morning", unread: false, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Aman", message: "hlo How do you do", unread: true, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "George Jose", message: "Now I'm in France", unread: true, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Hani Rahman", message: "hi, good morning", unread: false, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Hani Rahman", message: "hi, good morning", unread: false, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },
        { name: "Hani Ragman", message: "hi, good morning", unread: false, avatar: "https://easy-peasy.ai/cdn-cgi/image/quality=80,format=auto,width=700/https://media.easy-peasy.ai/1dbb9693-4e22-48fd-821d-8120b1ac3aca/5f2d5cdd-6fa4-412d-a0a7-04177bf592c9.png" },


    ];


    return (
        <Card sx={{
            bgcolor: APP_COLORS.common.white,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            borderRadius: 4,
            p: 2,
            boxShadow: 2,
            border: "1px " + APP_COLORS.common.black,
        }}>
            <Box sx={{
                display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2,
            }}>
                <Typography variant="h6">Messages</Typography>
                <IconButton>
                    <Edit />
                </IconButton>
            </Box>

            <TextField
                placeholder="Search Messages"
                variant="outlined"
                size="small"
                InputProps={{
                    startAdornment: (
                        <Search sx={{ mr: 2, padding: 1, fontSize: 36 }} /> // Increased fontSize
                    ),
                }}
                sx={{
                    mb: 2,
                    width: "100%",
                    borderRadius: 4,
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 4,
                    },
                }}
            />


            <Tabs value={selectedTab} onChange={handleChange} aria-label="Message Tabs" variant="fullWidth" >
                <Tab label="Primary" />
                <Tab label="General" />
                <Tab label="Requests (2)" />
            </Tabs>


            <Box sx={{ flex: 1, overflowY: "auto" }}>
                <List>
                    {messages.map((message, index) => (
                        <ListItem key={index} disablePadding>
                            <ListItemButton>
                                <Badge color="primary" variant={message.unread ? "dot" : "standard"}>
                                    <Avatar src={message.avatar} sx={{ width: 40, height: 40, mr: 2 }} />
                                </Badge>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                                        {message.name}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {message.message}
                                    </Typography>
                                </Box>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Card>

    );
};

export default MessageSidebar;
