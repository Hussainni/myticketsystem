import {
  CustomActiveShapePieChart,
  CustomizedLabelPieChart,
  PaddingAnglePieChart,
  SimplePieChart,
  StraightAnglePieChart,
  TwoLevelPieChart,
} from "@app/_components/charts/pie";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const PieChartPage = () => {
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
        {t("modules.title.pieChart")}
      </Typography>
      <Grid container spacing={3.75}>
        <Grid item xs={12} md={6}>
          <TwoLevelPieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <StraightAnglePieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomActiveShapePieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <CustomizedLabelPieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <SimplePieChart />
        </Grid>
        <Grid item xs={12} md={6}>
          <PaddingAnglePieChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default PieChartPage;
