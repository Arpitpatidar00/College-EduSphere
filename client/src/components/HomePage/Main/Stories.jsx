import { Box, Avatar, Typography } from '@mui/material';
import { APP_COLORS } from '../../../enums/Colors';

const data = [
  { name: 'Cristano', image: 'https://cdn.pixabay.com/photo/2024/08/27/20/44/ai-generated-9002448_1280.jpg' },
  { name: 'Brahim Diaz', image: 'https://cdn.pixabay.com/photo/2023/09/09/08/00/ai-generated-8242654_960_720.png' },
  { name: 'Robin', image: 'https://www.befunky.com/images/prismic/82e0e255-17f9-41e0-85f1-210163b0ea34_hero-blur-image-3.jpg?auto=avif,webp&format=jpg&width=896' },
  { name: 'Georgina', image: 'https://static.vecteezy.com/system/resources/thumbnails/026/829/465/small/beautiful-girl-with-autumn-leaves-photo.jpg' },
  { name: 'Wick', image: 'https://static.vecteezy.com/system/resources/thumbnails/046/286/162/small/woman-standing-brick-wall-sunbeam-photo.jpg' },
  { name: 'Chris', image: 'https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-first-01.webp' },
  { name: 'Amanda', image: 'https://www.piclumen.com/wp-content/uploads/2024/10/piclumen-marquee-04.webp' },
  { name: 'Jennifer', image: 'https://imgv3.fotor.com/images/slider-image/A-clear-image-of-a-woman-wearing-red-sharpened-by-Fotors-image-sharpener.jpg' },

  { name: 'Wick', image: 'https://media.istockphoto.com/id/471419621/photo/beautiful-girl-lies-on-the-grass.jpg?s=170667a&w=0&k=20&c=_zikQUMdgL-qlyiw-ImiQ96W6b77QXBQFp24DNa6d-Q=' },
  { name: 'John Wick', image: 'https://cdn.pixabay.com/photo/2024/05/03/17/45/ai-generated-8737620_640.png' },


];

const PostStory = () => {
  return (
    <Box sx={{
      bgcolor: APP_COLORS.accent,
      padding: 1,
      height: "200px",
      overflowX: "auto",
      whiteSpace: "nowrap",
      display: 'flex',
      flexDirection: 'row',
    }}>
      {
        data.map((person, index) => (
          <Box key={index} sx={{ display: 'inline-block', marginRight: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Avatar
                src={person.image}
                alt={person.name}
                sx={{
                  width: 100,
                  height: 100,
                  border: '3px solid #FFC107',
                  objectFit: 'cover'
                }}
              />
              <Typography variant="body2" sx={{ color: 'white' }}>{person.name}</Typography>
            </Box>
          </Box>
        ))
      }
    </Box >
  );
};

export default PostStory;
