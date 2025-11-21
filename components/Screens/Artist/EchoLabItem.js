import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/router'

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";
import imgEcho1 from "../../../public/images/Image echo lab1.png";

// good man : styles ↓
import ArtistStyle from "../../../styles/artist.module.css";

import { BASE_Image_Url, BASE_URL, TEST_COLLECTIONS } from "../../../pages/api";

// good man : files ↓
// good man : components ↓

export default function EcholabItem({
  item,
  hanldeEchoLab,
  echoSelected,
  echoID,
  Count,
  img,
}) {
  // mrx : artwork count to show in sidebar ---------------------------------------------------------------------------
  const collectionIDE =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || 0
      : 0;

  const router = useRouter();

  // mrx : states ↓

  //style selected echo item
  const echoStyle = () => {
    if (echoID == item?.id) {
      return ArtistStyle.itemEchoActive;
    } else return ArtistStyle.itemEcho;
  };

  // style tilte
  const tilteStyle = () => {
    if (echoID == item?.id) {
      return ArtistStyle.titleTotal_selected;
    } else return ArtistStyle.titleTotal;
  };

  // return title name
  const handleTitleName = () => {
    var temp = item?.name?.substring(0, 18);
    if (item?.name?.length > 18) {
      temp += "...";
    }
    return temp;
  };

  return (
    <Grid item className={echoStyle()} onClick={() => hanldeEchoLab(item)}>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item>
              <Grid container alignItems="center" spacing={1}>
                <Grid item>
                  <img
                    className={ArtistStyle.imgCollection}
                    src={
                      img !== null
                        ? BASE_Image_Url + img
                        : "/images/Image echo lab1.png"
                    }
                  />
                </Grid>
                <Grid item className={tilteStyle()}>
                  {handleTitleName()}
                </Grid>
              </Grid>
            </Grid>
            <Hidden mdUp>
              <Grid item className={ArtistStyle.set_sel} onClick={() => echoID == item?.id ? router.push(`/collection/${collectionIDE}`) : {}}>
                {echoID == item?.id ? "Setting" : " Sellect"}
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        {echoID == item?.id && (
          <Grid item className={ArtistStyle.totalArtWork}>
            <Grid container justifyContent="space-between">
              <Grid item>Total artworks</Grid>
              <Grid item className={ArtistStyle.num_totalArt}>
                {Count}
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
