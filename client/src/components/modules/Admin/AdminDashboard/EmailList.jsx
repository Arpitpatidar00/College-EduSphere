import { Card, CardContent, Typography, Avatar, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { emails } from '../data/mockData';

export default function EmailList() {
    return (
        <Card>
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Recent emails
                </Typography>

                <List sx={{ mt: 2 }}>
                    {emails.map((email) => (
                        <ListItem
                            key={email.id}
                            sx={{
                                px: 0,
                                '&:last-child': {
                                    mb: 0,
                                },
                            }}
                        >
                            <ListItemAvatar>
                                <Avatar src={email.sender.avatar} alt={email.sender.name} />
                            </ListItemAvatar>
                            <ListItemText
                                primary={email.sender.name}
                                secondary={email.subject}
                                secondaryTypographyProps={{ color: 'text.secondary' }}
                            />
                            <Typography variant="caption" color="text.secondary">
                                {email.timestamp}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
}
