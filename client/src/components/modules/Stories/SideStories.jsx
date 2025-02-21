import { Box, Avatar } from '@mui/material';
import styled from 'styled-components';

const SideStoriesContainer = styled(Box)`
  width: 80px;
  background-color: black;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 10px 0;
`;

const StoryAvatar = styled(Avatar)`
  margin: 5px 0;
  border: 2px solid ${props => props.active ? 'white' : 'transparent'};
`;

const stories = [
    { username: 'pinku_patel14', image: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80' },
    { username: 'itzz_suzal', image: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80' },
    { username: 'patidar_piyush_10', image: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80' },
    { username: 'astha_patidar14', image: 'https://i0.wp.com/picjumbo.com/wp-content/uploads/gorgeous-sunset-over-the-sea-free-image.jpeg?h=800&quality=80' }
];

const SideStories = () => {
    return (
        <SideStoriesContainer>
            {stories.map((story, index) => (
                <StoryAvatar
                    key={story.username}
                    src={story.image}
                    alt={story.username}
                    active={index === 0}
                />
            ))}
        </SideStoriesContainer>
    );
};

export default SideStories;