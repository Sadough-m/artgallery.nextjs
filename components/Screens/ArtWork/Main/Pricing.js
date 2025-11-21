import React from "react";

// mrx : material ui ↓
import { Grid, Button } from "@material-ui/core";

// mrx : Styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓

// mrx : components ↓
import InputForm from "../../../Forms/InputForm";
import CustomSelect from "../../../Forms/CustomSelect";




export default function Pricing({ haveTitle = true, is_inside = true }) {

  
  return (
    <Grid item>
      <Grid
        container
        direction="column"
        className={is_inside ? ArtFlowStyle.titleEditions1 : ArtFlowStyle.box}
      >
        {haveTitle && (
          <Grid item className={`${ArtFlowStyle.title}`}>
            Pricing
          </Grid>
        )}
        <Grid item>
          <Grid container className={ArtFlowStyle.fourInput} spacing={3}>
            <Grid item className={ArtFlowStyle.Input6}>
              <InputForm
                type="number"
                placeHolder="Enter a number"
                label="Amount"
              />
            </Grid>
            <Grid item className={ArtFlowStyle.Input13}>
              <CustomSelect
                label="Unit"
                placeHolder="Choose One"
                bgColor="#F7F8FA"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
