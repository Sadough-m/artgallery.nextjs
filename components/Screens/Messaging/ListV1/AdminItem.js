import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// gm : files ↓
import OfferSvg from "../../../../public/images/icons/Offer.svg";
import ByingSvg from "../../../../public/images/icons/Bying.svg";
import InquriesSvg from "../../../../public/images/icons/InquriesBlack.svg";
import StarSvg from "../../../../public/images/icons/StarAdmin.svg";
import QuestionSvg from "../../../../public/images/icons/question-circleb.svg";

// gm : components ↓

export default function AdminItem({ Data}) {
  // gm : states ↓

  // gm : return Svg
  const ReturnSvg = () => {
    if (Data.offerStatus === "OFFER") {
      return OfferSvg.src;
    } else if (Data.offerStatus === "Buying") {
      return ByingSvg.src;
    } else if (Data.offerStatus === "Inquiry") {
      return InquriesSvg.src;
    }
    else return QuestionSvg.src
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
            <IconButton size="small" style={{marginLeft:-4}}>
              <img src={StarSvg.src}/>
            </IconButton>
          </Grid>
          <Grid item className={Style.GuyImg}>
            <img src={Data.GuyImg.src}  className={Style.ImgItem}/>
          </Grid>
          <Grid item className={Style.P_ArtistName}>
            <Grid item className={Style.ArtistName}>
              {Data.name}
              <span className={Style.BadgeBlue}>2</span>
            </Grid>
            <Grid item className={Style.ArtistStatuse}>
              {Data.statuse}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container alignItems="center">
          <Grid item className={Data.offerStatus !==""? Style.P_ImgOffer : Style.P_ImgOffer2 }>
            {Data.offerStatus !=="" && (
              <img src={ReturnSvg()} className={Style.ImgOffer}/>
            )}
            <span className={Style.OfferStatuse}>{Data.offerStatus}</span>
            <span className={Data.offerStatus !==""? Style.Time:Style.Time_Br}>{Data.time}</span>
          </Grid>
          <Grid item className={Style.RightInfo}>
            <Grid container alignItems="center">
              <Grid item style={{height:64}}>
                <img src={Data.artworkImg.src} className={Style.ImageArtwork}/>
              </Grid>
              <Grid item className={Style.P_ArtworkArtist}>
                <Grid item className={Style.ArtworkName}>{Data.artworkName}</Grid>
                <Grid item className={Style.Artist}>{Data.artistName}</Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
