import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckIcon from "@material-ui/icons/Check";
import useWindowSize from "../../../Hooks/useWindowSize";

// good man : styles ↓
import ArtistStyle from "../../../styles/artist.module.css";
import styles from "../../../styles/Home.module.css";

// good man : files ↓

// good man : components ↓

export default function ButtonNext({ ArtistID, handleAddArtist, handleDiscardArtist }) {
  // mrx : states ↓

  return (
    <Hidden smDown>
      <Grid
        container
        className={ArtistStyle.P_buttomNext}
      >
        <Grid item className={`${styles.w_100_xs} `}>
          <Button
            onClick={() => handleDiscardArtist()}
            variant="contained"
            startIcon={<CloseIcon />}
            className={`${styles.w_100_xs} ${ArtistStyle.buttonNext} ${styles.mR_15} ${ArtistStyle.Discard_Btn}`}
          >
            <span
              className={`${styles.text__trs__none} ${ArtistStyle.px__btn} `}
            >
              Discard
            </span>
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddArtist()}
            startIcon={<CheckIcon />}
            className={`${styles.w_100_xs} ${ArtistStyle.buttonNext1}`}
          >
            <span
              className={`${styles.text__trs__none} ${ArtistStyle.px__btn} `}
            >
              {
                ArtistID !== "00000000-0000-0000-0000-000000000000" ? "Edit CV" : "Add Artist"
              }
            </span>
          </Button>
        </Grid>
      </Grid>
    </Hidden>
  );
}
