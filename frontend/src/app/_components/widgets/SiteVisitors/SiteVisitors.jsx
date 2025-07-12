import { JumboCard } from "@jumbo/components";
import Grid from "@mui/material/Grid";
import { CountriesList, VisitorsOnMap } from "./components";
import { countryList } from "./data";
import PropTypes from "prop-types";

const SiteVisitors = ({ title, subheader }) => {
  return (
    <JumboCard
      title={title}
      subheader={subheader}
      contentSx={{ p: 3 }}
      contentWrapper
    >
      <Grid container spacing={3.75}>
        <Grid item xs={12} md={5}>
          <CountriesList countries={countryList} />
        </Grid>
        <Grid item xs={12} md={7}>
          <VisitorsOnMap />
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { SiteVisitors };

SiteVisitors.propTyeps = {
  title: PropTypes.node.isRequired,
  subheader: PropTypes.node.isRequired,
};
