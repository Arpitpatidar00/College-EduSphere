// src/ChatApp.jsx
import { useState } from "react";
import { Box, Fade } from "@mui/material";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Groups from "./Groups";
import People from "./People";
import Chat from "./ChatMainContainer/Chat";
import { APP_COLORS } from "../../../enums/Colors";
import MessageList from "./MessageList";

function ChatApp() {
    const [activeView, setActiveView] = useState("home");
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    const renderLeftPanel = () => {
        if (activeView === "home") {
            return (
                <>
                    <SearchBar />
                    <Groups
                        sx={{ maxHeight: "100px", overflowY: "auto", transition: "max-height 0.5s ease" }}
                        onSelectConversation={setSelectedConversationId}
                    />
                    <People
                        sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", transition: "max-height 0.5s ease" }}
                        onSelectConversation={setSelectedConversationId}
                    />
                </>
            );
        } else if (activeView === "message") {
            return (
                <>
                    <SearchBar />
                    <MessageList
                        sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", marginTop: 2, transition: "max-height 0.5s ease" }}
                        onSelectConversation={setSelectedConversationId}
                    />
                </>
            );
        } else if (activeView === "person") {
            return (
                <>
                    <SearchBar />
                    <People
                        sx={{ maxHeight: "calc(100vh - 200px)", overflowY: "auto", marginTop: 2, transition: "max-height 0.5s ease" }}
                        onSelectConversation={setSelectedConversationId}
                    />
                </>
            );
        }
    };

    return (
        <Box display="flex" height="calc(100vh - 64px)" sx={{ backgroundColor: APP_COLORS.accent[50], padding: 2 }}>
            <Sidebar activeView={activeView} onChangeView={setActiveView} />
            <Box display="flex" flex="1">
                <Box sx={{ width: "450px", display: "flex", flexDirection: "column", gap: "8px", padding: "16px" }}>
                    <Fade in={true} key={activeView} timeout={500}>
                        <div>{renderLeftPanel()}</div>
                    </Fade>
                </Box>
                <Box sx={{ flex: 1, backgroundColor: APP_COLORS.common.white, borderRadius: 5, boxShadow: `0px 2px 5px ${APP_COLORS.primary[100]}`, display: "flex", flexDirection: "column", margin: "16px" }}>
                    {selectedConversationId && <Chat conversationUser={selectedConversationId} />}
                </Box>
            </Box>
        </Box>
    );
}

export default ChatApp;