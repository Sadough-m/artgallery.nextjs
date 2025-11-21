import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import AddSvg from "../../../../public/images/icons/Plus - Circle white.svg";
import EditSvg from "../../../../public/images/icons/Edit White.svg";
import TableArtworkNoCheck from "../common/TableArtworkNoCheck";

// gm : components ↓

export default function Fulfilled({IconTrack = true}) {
  // gm : states ↓

  return (
    <Grid item className={Style.Artworks}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_TitleArtworks_2}
      >
        <Grid item className={Style.TitleArtworks_2}>
          Fulfilled
        </Grid>
        <Grid item>
          <Button
            startIcon={<Image src={EditSvg} />}
            className={Style.CreateShipping}
            variant="contained"
            color="primary"
          >
            {IconTrack ? "Edit Tracking" : "Add Tracking"}
          </Button>
        </Grid>
      </Grid>

      <Grid item className={Style.ArtworksContainer_2}>
        <TableArtworkNoCheck IconTrack={IconTrack} />
      </Grid>
    </Grid>
  );
}
