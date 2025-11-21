import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import AddSvg from "../../../../public/images/icons/Plus - Circle white.svg";
import SettingSvg from "../../../../public/images/icons/Settings Black.svg";
import TableArtworkNoCheck from "../common/TableArtworkNoCheck";

// gm : components ↓

export default function Unfulfilled() {
  // gm : states ↓

  return (
    <Grid item className={Style.Artworks}>
      <Grid container justifyContent="space-between" alignItems="center" className={Style.P_TitleArtworks_2}>
        <Grid item className={Style.TitleArtworks_2}>
          Unfulfilled
        </Grid>
        <Grid item className={Style.P_Btn_CreatShipping}>
          <Button
            startIcon={<Image src={AddSvg} />}
            className={Style.CreateShipping}
            variant="contained"
            color="primary"
          >
            Create a Shipping Lable
          </Button>
          <Button
            startIcon={<Image src={SettingSvg} />}
            className={Style.ManualFillment}
          >
            Manual Fulfilment
          </Button>
        </Grid>
      </Grid>

      <Grid item className={Style.ArtworksContainer_2}>
        <TableArtworkNoCheck/>
      </Grid>
    </Grid>
  );
}
