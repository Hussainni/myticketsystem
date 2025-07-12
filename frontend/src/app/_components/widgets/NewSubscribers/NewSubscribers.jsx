import { JumboCard } from "@jumbo/components";
import StarIcon from "@mui/icons-material/Star";
import { Grid, Typography } from "@mui/material";
import React from "react";
import { NewSubscribersChart } from "./components";
import PropTypes from "prop-types";

const NewSubscribers = ({ subheader }) => {
  return (
    <JumboCard
      title={<StarIcon sx={{ color: "common.white" }} />}
      bgcolor={["#E44A77"]}
      sx={{ color: "common.white" }}
      contentWrapper
      contentSx={{ px: 3, pt: 0.5 }}
    >
      <Grid container columnSpacing={2} alignItems={"flex-end"}>
        <Grid item xs={6}>
          <Typography variant={"h2"} color={"common.white"}>
            85k+
          </Typography>
          <Typography variant={"h6"} color={"common.white"} mb={0}>
            {subheader}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <NewSubscribersChart />
        </Grid>
      </Grid>
    </JumboCard>
  );
};

export { NewSubscribers };

NewSubscribers.propTypes = {
  subheader: PropTypes.node.isRequired,
};
