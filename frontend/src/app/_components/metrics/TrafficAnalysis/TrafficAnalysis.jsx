import { TrafficAnalysisChart } from "@app/_components/charts/TrafficAnalysisChart";
import { JumboCard } from "@jumbo/components";
import React from "react";
import PropTypes from "prop-types";

const TrafficAnalysis = ({ title, subheader }) => {
  return (
    <JumboCard
      title={title}
      subheader={subheader}
      sx={{
        textAlign: "center",
      }}
      contentWrapper
    >
      <TrafficAnalysisChart />
    </JumboCard>
  );
};

export { TrafficAnalysis };

TrafficAnalysis.propTypes = {
  title: PropTypes.node,
  subheader: PropTypes.node,
};
