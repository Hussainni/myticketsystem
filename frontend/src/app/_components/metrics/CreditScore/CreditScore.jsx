import { CreditScoreChart } from "@app/_components/charts/CreditScoreChart";
import { JumboCard } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import RefreshIcon from "@mui/icons-material/Refresh";
import { Button, Typography } from "@mui/material";
import React from "react";
import PropTypes from "prop-types";

const CreditScore = ({ title, subheader }) => {
  const [score, setScore] = React.useState(500);
  const [isLoading, setLoading] = React.useState(false);

  const simulateNetworkRequest = () => {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  const updateScore = () => {
    setLoading(!isLoading);
    simulateNetworkRequest().then(() => {
      setScore((Math.floor(Math.random() * 9) + 2) * 98);
      setLoading(!isLoading);
    });
  };

  return (
    <JumboCard
      title={title}
      subheader={subheader}
      sx={{
        textAlign: "center",
      }}
      contentWrapper
      contentSx={{ pt: 0 }}
    >
      <CreditScoreChart score={score} />
      <Div sx={{ my: 3 }}>
        <Typography variant={"body1"} mb={2.25}>
          New score available
        </Typography>
        <Button
          variant={"contained"}
          size={"small"}
          onClick={updateScore}
          startIcon={<RefreshIcon />}
        >
          Refresh
        </Button>
      </Div>
    </JumboCard>
  );
};

export { CreditScore };

CreditScore.propTypes = {
  title: PropTypes.node,
  subheader: PropTypes.node,
};
