import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// gm : files ↓
import OfferSvg from "../../../../public/images/icons/Offer.svg";
import ByingSvg from "../../../../public/images/icons/Bying.svg";
import InquriesSvg from "../../../../public/images/icons/InquriesBlack.svg";

// gm : components ↓

export default function Item({ artist, artists, handleChange }) {
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

  const router = useRouter()

  return (
    <Grid
      container
      alignItems="center"
      justifyContent="space-between"
      className={Style.Item}
    >
      <span className={Style.JustForClick_Person} onClick={()=>router.push("/messaging/person")}></span>
      <span className={Style.JustForClick_Piece} onClick={()=>router.push("/messaging/piece")}></span>
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
            <img src={artist.GuyImg.src} className={Style.ImgItem}/>
          </Grid>
          <Grid item className={Style.P_ArtistName}>
            <Grid item className={Style.ArtistName}>
              {artist.name}
              <Hidden smDown>
                <span
                  className={
                    artist.type === "Customer"
                      ? Style.Customer
                      : Style.Collector
                  }
                >
                  {artist.type}
                </span>
              </Hidden>
              <span className={Style.BadgeBlue}>2</span>
            </Grid>
            <Grid item className={Style.ArtistStatuse}>
              {artist.statuse}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item className={Style.P_ImgOffer}>
            <img src={ReturnSvg()} className={Style.ImgOffer}/>
            <span className={Style.OfferStatuse}>{artist.offerStatus}</span>
            <span className={Style.Time}>{artist.time}</span>
          </Grid>
          <Grid item className={Style.RightInfo}>
            <Grid container alignItems="center">
              <Grid item style={{height:64}}>
                <img src={artist.artworkImg.src} className={Style.ImageArtwork}/>
              </Grid>
              <Grid item className={Style.P_ArtworkArtist}>
                <Grid item className={Style.ArtworkName}>{artist.artworkName}</Grid>
                <Grid item className={Style.Artist}>{artist.artistName}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
