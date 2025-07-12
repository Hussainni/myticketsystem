import { ASSET_IMAGES } from "@app/_utilities/constants/paths";
import { JumboCard, JumboScrollbar } from "@jumbo/components";
import { Div } from "@jumbo/shared";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import { IconButton, Tooltip, Typography } from "@mui/material";
import React, { useReducer, useState } from "react";
import { ChartReport } from "./components/ChartReport";
import { ProductSalesList } from "./components/ProductSalesList/ProductSalesList";
import { ProductSelectionControl } from "./components/ProductSelectionControl/ProductSelectionControl";
import { productsList } from "./data";
import { reducer } from "./reducer";
import PropTypes from "prop-types";

const init = (products) => {
  return [products[0], products[1], products[2], products[3], products[4]];
};

const WeeklySales = ({ title, subheader }) => {
  const [selectedProducts, dispatch] = useReducer(reducer, productsList, init);
  const [showChart, setShowChart] = useState(false);

  const onSelectionChanged = (checked, value) => {
    const item = productsList.find((item) => item.id.toString() === value);
    if (item) {
      dispatch({
        type: checked ? "ADD_PRODUCT" : "REMOVE_PRODUCT",
        payload: item,
      });
    }
  };

  return (
    <JumboCard
      title={title}
      subheader={subheader}
      action={
        <Tooltip
          title={
            selectedProducts.length > 0 ? "Chart view" : "No data available"
          }
          arrow
          placement={"top"}
          sx={{
            "& .MuiTooltip-arrow": {
              marginTop: "-0.65em",
            },
          }}
        >
          <IconButton onClick={() => setShowChart(!showChart)}>
            <InsertChartOutlinedIcon />
          </IconButton>
        </Tooltip>
      }
      contentWrapper
      contentSx={{ p: 0 }}
    >
      {showChart ? (
        <JumboScrollbar
          autoHeight={true}
          autoHeightMin={334}
          hideTracksWhenNotNeeded
        >
          <ChartReport data={selectedProducts} />
        </JumboScrollbar>
      ) : (
        <React.Fragment>
          <ProductSelectionControl
            items={productsList}
            selectedItems={selectedProducts}
            onSelectedChanged={onSelectionChanged}
          />
          {selectedProducts.length > 0 ? (
            <ProductSalesList products={selectedProducts} />
          ) : (
            <Div
              sx={{
                p: 3,
              }}
            >
              <img
                alt={"Chart"}
                src={`${ASSET_IMAGES}/pie-chart.svg`}
                width={150}
                height={150}
              />
              <Typography variant={"h5"} color={"text.secondary"}>
                No products added to report
              </Typography>
            </Div>
          )}
        </React.Fragment>
      )}
    </JumboCard>
  );
};

export { WeeklySales };

WeeklySales.propTypes = {
  title: PropTypes.node,
  subheader: PropTypes.node,
};
