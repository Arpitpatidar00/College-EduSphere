import { useState } from "react";
import { Box, Fade } from "@mui/material";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Groups from "./Groups";
import People from "./People";
import Chat from "./ChatMainContainer/Chat";
import { APP_COLORS } from "../../../enums/Colors";
import MessageList from "./MessageList";

function MessagePage() {
    const [activeView, setActiveView] = useState("home");
    const [selectedConversationId, setSelectedConversationId] = useState(null);

    const renderLeftPanel = () => {
        if (activeView === "home") {
            return (
                <>
                    <SearchBar />
                    <Groups
                        sx={{
                            maxHeight: { xs: "150px", md: "100px" }, // Taller on mobile
                            overflowY: "auto",
                            transition: "max-height 0.5s ease",
                        }}
                        onSelectConversation={setSelectedConversationId}
                    />
                    <People
                        sx={{
                            maxHeight: { xs: "calc(100vh - 300px)", md: "calc(100vh - 200px)" }, // Adjust for mobile
                            overflowY: "auto",
                            transition: "max-height 0.5s ease",
                        }}
                        onSelectConversation={setSelectedConversationId}
                    />
                </>
            );
        } else if (activeView === "message") {
            return (
                <>
                    <SearchBar />
                    <MessageList
                        sx={{
                            maxHeight: { xs: "calc(100vh - 300px)", md: "calc(100vh - 200px)" },
                            overflowY: "auto",
                            marginTop: 2,
                            transition: "max-height 0.5s ease",
                        }}
                        onSelectConversation={setSelectedConversationId}
                    />
                </>
            );
        } else if (activeView === "person") {
            return (
                <>
                    <SearchBar />
                    <People
                        sx={{
                            maxHeight: { xs: "calc(100vh - 300px)", md: "calc(100vh - 200px)" },
                            overflowY: "auto",
                            marginTop: 2,
                            transition: "max-height 0.5s ease",
                        }}
                        onSelectConversation={setSelectedConversationId}
                    />
                </>
            );
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack vertically on mobile
                height: "calc(100vh - 64px)",
                backgroundColor: APP_COLORS.accent[50],
                padding: { xs: 1, md: 2 }, // Reduce padding on mobile
            }}
        >
            <Sidebar activeView={activeView} onChangeView={setActiveView} />
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", md: "row" }, // Stack on mobile
                    flex: 1,
                    width: "100%",
                }}
            >
                <Box
                    sx={{
                        width: { xs: "100%", md: "450px" }, // Full width on mobile, fixed on desktop
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                        padding: { xs: "8px", md: "16px" }, // Adjust padding
                        maxHeight: { xs: "50vh", md: "auto" }, // Limit height on mobile
                        overflowY: { xs: "auto", md: "initial" }, // Scroll on mobile
                    }}
                >
                    <Fade in={true} key={activeView} timeout={500}>
                        <div>{renderLeftPanel()}</div>
                    </Fade>
                </Box>
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: APP_COLORS.common.white,
                        borderRadius: 5,
                        boxShadow: `0px 2px 5px ${APP_COLORS.primary[100]}`,
                        display: "flex",
                        flexDirection: "column",
                        margin: { xs: "8px", md: "16px" }, // Adjust margin
                        height: { xs: "50vh", md: "auto" }, // Split height on mobile
                        overflowY: "auto", // Scrollable chat area
                    }}
                >
                    {selectedConversationId && <Chat conversationUser={selectedConversationId} />}
                </Box>
            </Box>
        </Box>
    );
}

export default MessagePage;