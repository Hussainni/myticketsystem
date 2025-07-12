import { JumboDdMenu } from "@jumbo/components/JumboDdMenu";
import { Div } from "@jumbo/shared";
import { Card, CardHeader, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { ChartSales, StatisticsData } from "./components";
import { ChartOrderRevenue } from "./components/ChartOrderRevenue";
import { dataItems, menuItems } from "./data";
import React from "react";
import PropTypes from "prop-types";

function SalesStatistics({ title }) {
  const theme = useTheme();
  return (
    <Card>
      <Div
        sx={{
          color: "common.white",
          backgroundColor: (theme) => theme.palette.primary.main,
        }}
      >
        <CardHeader
          title={
            <Typography variant={"h5"} color={"common.white"}>
              {title}
            </Typography>
          }
          action={<JumboDdMenu menuItems={menuItems} />}
        />
        {<StatisticsData />}
      </Div>
      <Div>
        <Grid container>
          <Grid item xs={12} lg={6}>
            <Div
              sx={{
                p: (theme) => theme.spacing(3, 2, 3, 0),
              }}
            >
              <ChartSales />
            </Div>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Div
              sx={{
                p: (theme) => theme.spacing(3, 0, 3, 2),
                [theme.breakpoints.up("lg")]: {
                  borderLeft: (theme) => `solid 2px ${theme.palette.divider}`,
                },
                [theme.breakpoints.down("lg")]: {
                  borderTop: (theme) => `solid 2px ${theme.palette.divider}`,
                },
              }}
            >
              <ChartOrderRevenue data={dataItems} />
            </Div>
          </Grid>
        </Grid>
      </Div>
    </Card>
  );
}

export { SalesStatistics };

SalesStatistics.propTyeps = {
  title: PropTypes.node.isRequired,
};
