import { Div, Span } from '@jumbo/shared';
import { CardMedia, Grid, Stack, Typography } from '@mui/material';
import { RiChat1Line, RiEyeFill, RiHeart2Fill } from 'react-icons/ri';

const ProfileMediaItem = ({ profile }) => {
  return (
    <Grid item xs={12} md={6} lg={4}>
      <Div sx={{ borderRadius: 4, overflow: 'hidden', mb: 1.5 }}>
        <CardMedia
          component='img'
          image={profile?.mediaImage}
          alt=''
          sx={{ aspectRatio: '5/3.25' }}
        />
      </Div>

      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        sx={{ px: 1 }}
      >
        <Typography variant='h5' mb={0}>
          {profile.title}
        </Typography>
        <Stack direction={'row'} spacing={2}>
          <Span
            sx={{
              display: 'flex',
              minWidth: 0,
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <RiChat1Line fontSize={18} />0
          </Span>
          <Span
            sx={{
              display: 'flex',
              minWidth: 0,
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Span
              sx={{
                display: 'inline-flex',
                minWidth: 0,
                color: 'primary.main',
              }}
            >
              <RiHeart2Fill fontSize={18} />
            </Span>
            2k
          </Span>
          <Span
            sx={{
              display: 'flex',
              minWidth: 0,
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            <Span
              sx={{
                display: 'inline-flex',
                minWidth: 0,
                color: 'primary.main',
              }}
            >
              <RiEyeFill fontSize={18} />
            </Span>
            1.3k
          </Span>
        </Stack>
      </Stack>
    </Grid>
  );
};

export { ProfileMediaItem };
