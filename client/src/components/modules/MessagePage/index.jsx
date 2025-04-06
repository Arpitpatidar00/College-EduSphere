import { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import Groups from "./Groups";
import People from "./People";
import Chat from "./ChatMainContainer/Chat";
import { APP_COLORS } from "../../../enums/Colors";
import MessageList from "./MessageList";
import SidebarWrapper from "./SidebarWrapper";

function MessagePage() {
    const [activeView, setActiveView] = useState("home");
    const [selectedConversationId, setSelectedConversationId] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(true); // Track sidebar state

    const renderLeftPanel = () => {
        if (activeView === "home") {
            return (
                <>
                    <SearchBar
                        sx={{
                            maxWidth: { xs: "400px", sm: "400px", md: "500px" }, // Match internal maxWidth for consistency
                            mb: { xs: 1, md: 2 },

                        }}
                    />
                    <Groups
                        sx={{
                            maxWidth: { xs: "400px", md: "400px" },
                            maxHeight: { xs: "270px", md: "350px" },
                            overflowY: "auto",
                            transition: "max-height 0.5s ease",
                            scrollBehavior: "smooth",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            "scrollbar-width": "none",
                            "-ms-overflow-style": "none",
                        }}
                        onSelectConversation={setSelectedConversationId}
                    />
                    <People
                        sx={{
                            maxHeight: { xs: "270px", md: "350px" },
                            maxWidth: { xs: "400px", md: "400px" },

                            overflowY: "auto",
                            transition: "max-height 0.5s ease",
                            scrollBehavior: "smooth",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            "scrollbar-width": "none",
                            "-ms-overflow-style": "none",
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
                            maxHeight: { xs: "calc(100vh - 160px)", md: "calc(100vh - 100px)" },
                            maxWidth: { xs: "600px", md: "600px" },
                            overflowY: "auto",
                            marginTop: 2,
                            transition: "max-height 0.5s ease",
                            scrollBehavior: "smooth",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            "scrollbar-width": "none",
                            "-ms-overflow-style": "none",
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
                            scrollBehavior: "smooth",
                            "&::-webkit-scrollbar": {
                                display: "none",
                            },
                            "scrollbar-width": "none",
                            "-ms-overflow-style": "none",
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
                flexDirection: { xs: "column", md: "row" },
                height: "calc(100vh - 64px)",
                backgroundColor: APP_COLORS.accent[50],
                padding: { xs: 1, md: 2 },
                overflow: "hidden", // Prevent overflow issues
                scrollBehavior: "smooth",
                "&::-webkit-scrollbar": {
                    display: "none",
                },
                "scrollbar-width": "none",
                "-ms-overflow-style": "none",
            }}
        >
            <Sidebar activeView={activeView} onChangeView={setActiveView} />

            {/* Main Content Area */}
            <Box
                sx={{
                    display: "flex",
                    flex: 1,
                    width: "100%",
                    flexDirection: { xs: "column", md: "row" },
                    transition: "all 0.3s ease-in-out", // Smooth transition
                }}
            >
                {/* Sidebar Wrapper */}
                <SidebarWrapper open={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)}>
                    {renderLeftPanel()}
                </SidebarWrapper>

                {/* Chat Area */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundColor: APP_COLORS.common.white,
                        borderRadius: 5,
                        boxShadow: `0px 2px 5px ${APP_COLORS.primary[100]}`,
                        display: "flex",
                        flexDirection: "column",
                        margin: { xs: "0px", md: "16px" },
                        height: { xs: "50vh", md: "auto" },
                        overflowY: "auto",
                        ml: { md: sidebarOpen ? "50px" : "16px" },
                        transition: "margin-left 0.3s ease-in-out",
                        scrollBehavior: "smooth",
                        "&::-webkit-scrollbar": {
                            display: "none",
                        },
                        "scrollbar-width": "none",
                        "-ms-overflow-style": "none",
                    }}
                >
                    {selectedConversationId && (
                        <Chat conversationUser={selectedConversationId} />
                    )}
                </Box>
            </Box>
        </Box>
    );
}

export default MessagePage;