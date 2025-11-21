import React from "react";

// mrx : material ui ↓
import { Button, Grid } from "@material-ui/core";

// mrx : Styles ↓
import styles from "../../../styles/Home.module.css";
import artWorkStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓

// mrx : components ↓

export default function Authenticity({
  have_NFC = true,
  have_NFC_certificate = true,
}) {
  return (
    <Grid item className={artWorkStyle.wrapper_au}>
      <Grid item className={artWorkStyle.title1}>
        Authenticity
      </Grid>
      <Grid item className={artWorkStyle.P_All_Items}>
        <Grid container direction="column">
          <Grid item className={`${artWorkStyle.textSections2}`}>
            You can dowload the digital certificate or request physical copy.
          </Grid>
        </Grid>
        <Grid container direction="column" spacing={2} className={artWorkStyle.mt15}>
          <Grid item>
            <Button
              className={`${artWorkStyle.btn_Verify} ${artWorkStyle.bgColorGray} `}
            >
              Request Physical Version
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={artWorkStyle.btn_Verify}
            >
              Download PDF
            </Button>
          </Grid>
          {have_NFC && (
            <Grid item className={artWorkStyle.mtb_20}>
              <Button
                variant="contained"
                color="secondary"
                className={artWorkStyle.btnDisable}
                disabled={true}
              >
                Request NFC
              </Button>
            </Grid>
          )}
          {have_NFC_certificate && (
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                className={artWorkStyle.btn_Verify}
              >
                <span className={styles.text__trs__none}>
                  Request NFC certificate{" "}
                </span>
              </Button>
            </Grid>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
