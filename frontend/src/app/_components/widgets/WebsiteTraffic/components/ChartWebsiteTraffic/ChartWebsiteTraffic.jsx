import { Typography } from "@mui/material";
import React from "react";
import ReactSpeedometer, { Transition } from "react-d3-speedometer";

const ChartWebsiteTraffic = () => {
  return (
    <React.Fragment>
      <ReactSpeedometer
        value={500}
        maxSegmentLabels={0}
        segments={2}
        ringWidth={24}
        needleColor={"#555"}
        needleHeightRatio={0.5}
        needleTransitionDuration={4000}
        needleTransition={Transition.easeElastic}
        segmentColors={["#FF8C00", "#AAA"]}
        currentValueText={""}
        valueTextFontSize={"18px"}
        valueTextFontWeight={"normal"}
        textColor={"#555"}
        width={230}
        height={160}
      />
      <Typography variant={"h5"}>2,855 users online</Typography>
      <Typography variant={"body1"} mb={2}>
        Moderate level
      </Typography>
    </React.Fragment>
  );
};

export { ChartWebsiteTraffic };
