import { Grid } from "@mui/material";
import MessageSidebar from "./MessageSidebar";
import MessageContainer from "./MessageContainer";

const Message = () => {
    return (
        <Grid
            container
            sx={{
                height: "calc(100vh - 64px)",
                justifyContent: "center",
                alignItems: "center",
                padding: 2,
                gap: 4
            }}
        >
            <Grid
                item
                xs={3}
                sx={{
                    height: "88vh",
                    borderRadius: 4,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <MessageSidebar />
            </Grid>

            <Grid
                item
                xs={6}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "88vh",
                    borderRadius: 4,
                    boxShadow: "2px 2px 10px rgba(0, 0, 0, 0.1)",
                }}
            >
                <MessageContainer />
            </Grid>
        </Grid>
    );
};

export default Message;
