import React, { useState } from "react";
import { CircularProgress } from "@material-ui/core";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";

// good man : styles ↓
import styles from "../../../styles/Home.module.css";
import signUpStyle from "../../../styles/signUp.module.css";

// good man : files ↓

// good man : components ↓

export default function NextButton({ text = "Next", onClick, loading }) {
  // mrx : states ↓

  return (
    <Grid item md={3} sm={12} xs={12} className={signUpStyle.bottom_next}>
      <Grid
        container
        justifyContent="flex-end"
        className={signUpStyle.height100}
      >
        <Grid
          item
          className={` ${signUpStyle.height100} ${signUpStyle.P_buttom}`}
        >
          <Button
            variant="contained"
            color="primary"
            className={`${styles.w_100_xs} ${signUpStyle.buttonNext}`}
            onClick={onClick}
          >
            <span
              className={`${styles.text__trs__none} ${signUpStyle.px__btn} `}
            >
              {loading && <CircularProgress color="white" size={20} />}
              {!loading && text}
            </span>
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
