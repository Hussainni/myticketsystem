import { JumboCard } from "@jumbo/components";
import { Grid } from "@mui/material";
import { VisitorsOnMap } from "../SiteVisitors/components";
import { RevenueInfo, RevenueProgress } from "./components";
import PropTypes from "prop-types";

const RevenueOverview = ({ title }) => {
  return (
    <JumboCard title={title}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} lg={3}>
          <RevenueProgress />
        </Grid>
        <Grid
          item
          xs={12}
          sm={6}
          lg={3}
          sx={{
            order: { lg: 3 },
            mb: { lg: -3 },
            mt: { sm: -7 },
          }}
        >
          <RevenueInfo />
        </Grid>
        <Grid item xs={12} lg={6}>
          <VisitorsOnMap />
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { RevenueOverview };

RevenueOverview.propTyeps = {
  title: PropTypes.node.isRequired,
};
