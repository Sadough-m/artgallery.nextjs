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
import UsersSvg from "../../../../public/images/icons/Users.svg";

// gm : components ↓

export default function ByPiece({ artist, artists, handleChange }) {
  // gm : states ↓

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
            <img src={artist.artworkImg.src} className={Style.ImgArt} />
          </Grid>
          <Grid item className={Style.P_ArtistName_Person}>
            <Grid item className={Style.ArtistName}>
              {artist.artworkName}

              <span className={Style.BadgeBlue}>2</span>
            </Grid>
            <Hidden smDown>
              <Grid item className={Style.P_AtistType}>
                <Grid item className={Style.Artist}>
                  {artist.artistName}
                </Grid>
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={Style.P_ImgOffer_Piece}>
        <Grid item className={Style.TextPerson}>
          <img src={UsersSvg.src} className={Style.ImgArtworkGray} />{" "}
          <span className={Style.NumPiece}>{artist.NumPerson} Persons</span>
          <Button color="primary" endIcon={<img src={ArrowSvg.src} />}>
            See Conversations
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
