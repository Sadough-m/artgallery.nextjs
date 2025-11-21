import React from "react";

// mrx : material ui ↓
import { Grid } from "@material-ui/core";

// mrx : Styles ↓
import styles from "../../../../styles/Home.module.css";
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓

// mrx : components ↓
import InputForm from "../../../Forms/InputForm";

export default function Internal({ is_inside = false }) {
  return (
    <Grid item>
      <Grid
        container
        direction="column"
        className={is_inside ? ArtFlowStyle.titleEditions : ArtFlowStyle.box}
      >
        <Grid item className={`${ArtFlowStyle.title}`}>
          Internal
        </Grid>
        <Grid container className={`${styles.TwoForm}`}>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm type="text" placeHolder="Enter first name" label="SKU" />
          </Grid>
          <Grid item className={`${styles.TwoInput}`}>
            <InputForm
              type="text"
              placeHolder="Enter last name"
              label="Quantity"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
