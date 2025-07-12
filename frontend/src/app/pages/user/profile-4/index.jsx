import {
  Profile4FilterTabs,
  Profile4Header,
  ProfileMediaItem,
} from "@app/_components/user/profile-4";
import { profileMediaData } from "@app/_components/user/profile-4/data";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Grid } from "@mui/material";

const ProfilePage4 = () => {
  return (
    <Container
      maxWidth={false}
      sx={{
        maxWidth: CONTAINER_MAX_WIDTH,
        display: "flex",
        minWidth: 0,
        flex: 1,
        flexDirection: "column",
      }}
      disableGutters
    >
      <Profile4Header />
      <Profile4FilterTabs />

      <Grid container spacing={4} sx={{ mb: 4 }}>
        {profileMediaData?.map((profile, index) => (
          <ProfileMediaItem profile={profile} key={index} />
        ))}
      </Grid>
    </Container>
  );
};

export default ProfilePage4;
