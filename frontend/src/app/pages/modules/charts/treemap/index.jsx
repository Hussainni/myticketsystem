import {
  CustomContentTreemapChart,
  SimpleTreemapChart,
} from "@app/_components/charts/treemap";
import { CONTAINER_MAX_WIDTH } from "@app/_config/layouts";
import { Container, Grid, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";

const TreeMapChartPage = () => {
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
        {t("modules.title.treemapChart")}
      </Typography>
      <Grid container spacing={3.75}>
        <Grid item xs={12} lg={6}>
          <SimpleTreemapChart />
        </Grid>
        <Grid item xs={12} lg={6}>
          <CustomContentTreemapChart />
        </Grid>
      </Grid>
    </Container>
  );
};

export default TreeMapChartPage;
