import {
  SimpleRadarChart,
  SpecificDomainRadarChart,
} from "@app/_components/charts/radar";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const RadarChartPage = () => {
  const { t } = useTranslation();
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
      <Typography variant={"h1"} mb={3}>
        {t("modules.title.radarChart")}
      </Typography>
      <Grid container spacing={3.75}>
        <Grid item xs={12} lg={6}>
          <SimpleRadarChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <SpecificDomainRadarChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default RadarChartPage;
