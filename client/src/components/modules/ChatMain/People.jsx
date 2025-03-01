import { Box, Typography, Avatar, Stack, Badge } from "@mui/material";
import { APP_COLORS } from '../../../enums/Colors';

const peopleData = [
    { name: "Anil", avatar: "/images/anil.png", status: "online" },
    { name: "Chuuthiya", avatar: "/images/chuuthiya.png", status: "offline", unread: 1 },
    { name: "Mary Ma’am", avatar: "/images/mary.png", status: "offline", unread: 1 },
    { name: "Bill Gates", avatar: "/images/bill.png", status: "offline", unread: 5 },
    { name: "Victoria H", avatar: "/images/victoria.png", status: "online" },

];

const People = () => {
    return (
        <Box
            sx={{
                mt: 2,
                p: 2,
                backgroundColor: APP_COLORS.common.white,
                borderRadius: 5,
                boxShadow: `0px 2px 5px ${APP_COLORS.primary[50]} `,

                width: "100%"
            }}
        >
            {/* Title */}
            <Typography
                variant="h6"
                sx={{
                    fontWeight: "bold",
                    color: "#333",
                    borderBottom: `2px solid ${APP_COLORS.common.white}`,
                    pb: 1,
                    mb: 1
                }}
            >
                People
            </Typography>

            {/* People List */}
            {peopleData.map((person, index) => (
                <Stack
                    key={index}
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{
                        padding: "8px",
                        borderRadius: "8px",
                        transition: "background 0.3s",
                        cursor: "pointer",
                        "&:hover": { backgroundColor: APP_COLORS.common.white }
                    }}
                >
                    {/* Avatar with Status Indicator */}
                    <Badge
                        color={person.status === "online" ? "success" : "error"}
                        variant="dot"
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    >
                        <Avatar src={person.avatar} alt={person.name} />
                    </Badge>

                    {/* Name and Status */}
                    <Typography sx={{ fontWeight: "500", flexGrow: 1 }}>
                        {person.name}
                    </Typography>

                    {/* Unread Messages Badge */}
                    {person.unread && (
                        <Box
                            sx={{
                                backgroundColor: "#FF5733",
                                color: APP_COLORS.common.white,
                                fontSize: "12px",
                                fontWeight: "bold",
                                width: "20px",
                                height: "20px",
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center"
                            }}
                        >
                            {person.unread}
                        </Box>
                    )}
                </Stack>
            ))}
        </Box>
    );
};

export default People;
