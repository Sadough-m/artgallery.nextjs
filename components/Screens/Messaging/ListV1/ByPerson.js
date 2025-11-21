import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// gm : files ↓
import OfferSvg from "../../../../public/images/icons/Offer.svg";
import ByingSvg from "../../../../public/images/icons/Bying.svg";
import InquriesSvg from "../../../../public/images/icons/InquriesBlack.svg";
import ArtworskSvg from "../../../../public/images/icons/ArtworksGray.svg";
import ArrowSvg from "../../../../public/images/icons/Arrow right blue.svg";

// gm : components ↓

export default function ByPerson({ artist, artists, handleChange }) {
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
      className={Style.Item_Person}
    >
      <span className={Style.JustForClick_Person} onClick={()=>router.push("/messaging/person")}></span>
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
            <img src={artist.GuyImg.src} className={Style.ImgItem} />
          </Grid>
          <Grid item className={Style.P_ArtistName_Person}>
            <Grid item className={Style.ArtistName}>
              {artist.name}

              <span className={Style.BadgeBlue}>2</span>
            </Grid>
            <Hidden smDown>
              <Grid item className={Style.P_AtistType}>
                <span
                  className={
                    artist.type === "Customer"
                      ? Style.Customer2
                      : Style.Collector2
                  }
                >
                  {artist.type}
                </span>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item className={Style.P_ImgOffer_Person}>
            <img src={ArtworskSvg.src} className={Style.ImgArtworkGray} />{" "}
            <span className={Style.NumArtworks}>
              {artist.NumArtworks} Artworks
            </span>
          </Grid>
          <Hidden smDown>
            <Button color="primary" endIcon={<img src={ArrowSvg.src} />}>
              See Conversations
            </Button>
          </Hidden>
        </Grid>
      </Grid>
    </Grid>
  );
}
