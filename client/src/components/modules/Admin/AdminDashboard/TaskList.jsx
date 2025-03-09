
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { tasks } from '../data/mockData';

const iconMap = {
    task: AssignmentIcon,
    review: AccessTimeIcon,
    meeting: GroupIcon,
    onboarding: PersonAddIcon,
};

export default function TaskList() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Your to-do list
                </Typography>

                <Box sx={{ mt: 2 }}>
                    {tasks.map((task) => {
                        const Icon = iconMap[task.type];

                        return (
                            <Box
                                key={task.id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    mb: 2,
                                    gap: 2,
                                }}
                            >
                                <Avatar
                                    sx={{
                                        bgcolor: 'action.selected',
                                        color: 'text.primary',
                                    }}
                                >
                                    <Icon />
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle2">
                                        {task.title}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {task.dueDate}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </CardContent>
        </Card>
    );
}

