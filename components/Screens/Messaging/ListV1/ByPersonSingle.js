import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// gm : files ↓
import OfferSvg from "../../../../public/images/icons/Offer.svg";
import ByingSvg from "../../../../public/images/icons/Bying.svg";
import InquriesSvg from "../../../../public/images/icons/InquriesBlack.svg";


// gm : components ↓

export default function ByPersonSingle({ artist, artists, handleChange }) {
  // gm : states ↓

  // gm : return Svg
  const ReturnSvg = () => {
    if (artist.offerStatus === "OFFER") {
      return OfferSvg.src;
    } else if (artist.offerStatus === "Buying") {
      return ByingSvg.src;
    } else if (artist.offerStatus === "Inquiry") {
      return InquriesSvg.src;
    }
  };

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={Style.Item_Person_Single}
    >
      <Grid item className={Style.TitleItem}>
        <Grid container alignItems="center">
          <Grid item className={Style.P_Check}>
            <CheckBoxTable
              artistId={artist.id}
              handleChange={handleChange}
              artists={artists}
              checked={artist.isChecked}
            />
          </Grid>
          <Grid item className={Style.GuyImg}>
            <img src={artist.artworkImg.src} className={Style.ImgArt} />
          </Grid>
          <Grid item className={Style.P_ArtistName_Person}>
            <Grid item className={Style.ArtistName}>
              {artist.artworkName}

              <span className={Style.BadgeBlue}>2</span>
            </Grid>
            <Grid item className={Style.ArtistStatuseSingle}>
              {artist.statuse}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={Style.P_ImgOffer_Single}>
        <Grid item className={Style.TextPerson}>
            <img src={ReturnSvg()} className={Style.ImgOffer}/>
            <span className={Style.OfferStatuse}>{artist.offerStatus}</span>
            <span className={Style.TimeSingle}>{artist.time}</span>
        </Grid>
      </Grid>
    </Grid>
  );
}
