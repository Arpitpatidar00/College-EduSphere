import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    IconButton,
    InputAdornment,
    TextField,
    styled,
    Select,
    MenuItem,
    Typography
} from '@mui/material';
import {
    InsertEmoticon,
    AttachFile,
    Image,
    LocationOn,
    Public,
    Close
} from '@mui/icons-material';
import AddPostModal from '../../modules/Post/AddPost/AddPostModal';

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: 'white',
    borderRadius: '10px',
    padding: '16px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    position: 'relative', // Ensure the close button is positioned relative to this container
}));

const AddPosts = () => {
    const [privacy, setPrivacy] = React.useState('Public');
    const [open, setOpen] = React.useState(false); // State for modal
    const [isVisible, setIsVisible] = React.useState(true); // State to control visibility of AddPosts

    const handlePrivacyChange = (event) => {
        setPrivacy(event.target.value);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null; // Render nothing if the component is not visible

    return (
        <StyledBox>
            <TextField
                fullWidth
                placeholder="Share something"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <Avatar alt="User" src="/path/to/your/image.jpg" sx={{ mr: 1 }} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <InsertEmoticon />
                            </IconButton>
                        </InputAdornment>
                    ),
                    disableUnderline: true,
                }}
                variant="standard"
            />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton onClick={() => setOpen(true)}> {/* Open modal on click */}
                        <AttachFile />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>File</Typography>
                    </IconButton>
                    <IconButton>
                        <Image />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>Image</Typography>
                    </IconButton>
                    <IconButton>
                        <LocationOn />
                        <Typography variant="body2" sx={{ ml: 0.5 }}>Location</Typography>
                    </IconButton>
                    <Select
                        value={privacy}
                        onChange={handlePrivacyChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        sx={{
                            color: 'black',
                            '.MuiOutlinedInput-notchedOutline': { border: 0 },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': { border: 0 },
                            '&:hover .MuiOutlinedInput-notchedOutline': { border: 0 },
                            '.MuiSvgIcon-root': { color: 'black' }
                        }}
                        IconComponent={Public}
                    >
                        <MenuItem value="Public">Public</MenuItem>
                        <MenuItem value="Friends">Friends</MenuItem>
                        <MenuItem value="Only me">Only me</MenuItem>
                    </Select>
                </Box>
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '20px',
                        '&:hover': { backgroundColor: 'grey' }
                    }}
                >
                    Send
                </Button>
            </Box>

            <AddPostModal open={open} onClose={() => setOpen(false)} />


        </StyledBox>
    );
};

export default AddPosts;
