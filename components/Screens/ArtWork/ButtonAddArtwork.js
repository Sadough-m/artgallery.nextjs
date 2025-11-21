import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";
import { GridCloseIcon } from "@material-ui/data-grid";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

// good man : styles ↓
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓

// good man : components ↓

export default function ButtonAddArtwork({ handleModal, handleDiscardArtwork }) {

  return (
    <Grid item className={ArtWorkFlowStyle.stickyPos_add}>
      <Grid item className={ArtWorkFlowStyle.bgButton_addArtwork}>
        <Grid container justifyContent="flex-start">
          <Grid item className={styles.P_BTNS}>
            <Button
              onClick={() => handleDiscardArtwork()}
              variant="contained"
              startIcon={<CloseIcon />}
              className={`${styles.w_100_xs} ${ArtWorkFlowStyle.buttonNext} ${styles.mR_15} ${ArtWorkFlowStyle.Discard_Btn}`}
            >
              <span
                className={`${styles.text__trs__none} ${ArtWorkFlowStyle.px__btn} `}
              >
                Discard
              </span>
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<CheckIcon />}
              onClick={handleModal}
              className={`${styles.w_100_xs} ${ArtWorkFlowStyle.buttonNext}`}
            >
              <span className={ArtWorkFlowStyle.px__btn}>Add Artwork</span>
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
