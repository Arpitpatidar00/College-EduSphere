import { Box, Typography } from '@mui/material';
import styled from 'styled-components';

const StoryContainer = styled(Box)`
  flex-grow: 1;
  position: relative;
  background-color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StoryImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`;

const StoryOverlay = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 10px;
  background: rgba(0,0,0,0.5);
`;

const MainStory = () => {
  return (
    <StoryContainer>
      <StoryImage
        src="/path-to-your-image.jpg"
        alt="Main Story"
      />
      <StoryOverlay>
        <Typography variant="caption" color="white">
          AAC Block Available Shree Navkar Building Material Hatod
          Contact: 7898563420,9425436577
        </Typography>
      </StoryOverlay>
    </StoryContainer>
  );
};

export default MainStory;