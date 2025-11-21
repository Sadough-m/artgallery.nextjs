import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Dashboard.module.css";

// gm : files ↓
import CheckedSvg from "../../../../public/images/icons/CheckedBlue.svg";
import NotCheckedSvg from "../../../../public/images/icons/NotChecked.svg";
import OfferSvg from "../../../../public/images/icons/Offer.svg";
import GuyPng from "../../../../public/images/guy.png";
import FlowerPng from "../../../../public/images/flower.png";

// gm : components ↓

export default function Item() {
  // gm : states ↓
  const [Checked, setChecked] = useState(false);

  return (
    <Grid item className={Style.ItemInbox}>
      <Grid container alignItems="center" justifyContent="space-between">
        <Grid item className={Style.p_check}>
          <IconButton size="small" onClick={() => setChecked(!Checked)}>
            <Image src={Checked ? CheckedSvg : NotCheckedSvg} />
          </IconButton>
        </Grid>
        <Grid item className={Style.p_artist}>
          <img src={GuyPng.src} className={Style.ImgArtist}/>
        </Grid>
        <Grid item className={Style.p_name}>
          <Grid item className={Style.Name}>
            Esther Howard<span className={Style.badgeBlue}>2</span>
          </Grid>
          <Grid item className={Style.Customer}>
            Customer
          </Grid>
        </Grid>
        <Grid item className={Style.p_offer}>
          <img src={OfferSvg.src} />
          <span className={Style.Offer}>OFFER</span>
        </Grid>
        <Grid item className={Style.Time}>10 minutes ago</Grid>
        <Grid item className={Style.ImgArtwork}>
          <img src={FlowerPng.src} />
        </Grid>
        <Grid item >
          <Grid item className={Style.ArtWorkName}>Black SWAN</Grid>
          <Grid item className={Style.ArtistName}>Sohrab Sepehri</Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
