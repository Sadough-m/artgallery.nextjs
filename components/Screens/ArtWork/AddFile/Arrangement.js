import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// good man : files ↓
import arrangeMent from "../../../../public/images/icons/Arrangement.svg";
import arrowRight from "../../../../public/images/icons/Arrow right blue.svg";
import ModalMedia from "../../../Modals/ArtWork/ModalMedia";

// good man : components ↓

export default function Arrangement() {
  // good man : states ↓
  const [modal, setModal] = useState(false);

  return (
    <Grid
      item
      className={ArtWorkFlowStyle.Arrangement}
      
    >
      <Grid container justifyContent="space-between" alignItems="center" onClick={() => setModal(true)}>
        <Grid item>
          <Grid container alignItems="center" spacing={1}>
            <Grid item>
              <Image src={arrangeMent} />
            </Grid>
            <Grid item>
              <Grid container direction="column">
                <Grid item className={ArtWorkFlowStyle.text_ar}>
                  Arrangement
                </Grid>
                <Grid item className={ArtWorkFlowStyle.desc_ar}>
                  Arrangement of your media in desired POS.
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <IconButton size="small">
            <Image src={arrowRight} />
          </IconButton>
        </Grid>
      </Grid>
      <ModalMedia openModal={modal} handleModal={() => setModal(false)} />
    </Grid>
  );
}
