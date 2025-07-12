import { JumboCard } from "@jumbo/components";
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { ChartYearlyProfit } from "./components";
import PropTypes from "prop-types";

const YearlyProfileReport = ({ title }) => {
  return (
    <JumboCard
      title={
        <Typography variant={"h4"} mb={0}>
          {title}
        </Typography>
      }
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <Grid container columnSpacing={2}>
        <Grid item xs={8}>
          <ChartYearlyProfit />
        </Grid>
        <Grid item xs={4} alignSelf={"center"}>
          <Typography variant={"h2"}>$685k+</Typography>
          <Typography
            variant={"body1"}
            color={"text.secondary"}
            sx={{ whiteSpace: "nowrap" }}
          >
            Past 9 months
          </Typography>
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { YearlyProfileReport };

YearlyProfileReport.propTypes = {
  title: PropTypes.node.isRequired,
};
