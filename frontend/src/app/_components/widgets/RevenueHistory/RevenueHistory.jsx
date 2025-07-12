import { JumboCard } from "@jumbo/components";
import { Grid, ListItemText, Typography } from "@mui/material";
import { RevenueChart } from "./components";
import PropTypes from "prop-types";

const RevenueHistory = ({ title }) => {
  return (
    <JumboCard title={title} contentWrapper contentSx={{ px: 3, pt: 1 }}>
      <Grid container spacing={3.75}>
        <Grid item xs={6}>
          <ListItemText
            primary={
              <Typography variant={"h3"} mb={0.5}>
                $216,759
              </Typography>
            }
            secondary={"YTD Revenue"}
          />
        </Grid>
        <Grid item xs={6}>
          <RevenueChart />
        </Grid>
      </Grid>
    </JumboCard>
  );
};
export { RevenueHistory };

RevenueHistory.propTyeps = {
  title: PropTypes.node.isRequired,
};
