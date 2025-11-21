import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Orders.module.css";

// good man : files ↓
import ArtworkPng from "../../../../public/images/list art.png";
import TrackSvg from "../../../../public/images/icons/Track.svg";
import ReturnedSvg from "../../../../public/images/icons/Returned.svg";

// good man : components ↓

// ourData (Artists)
const ArtworkData = [
  {
    id: 0,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limited: "Limitted Ed - 01/12",
    cost: "$1,955.00",
    Medium: "3 × 5 × 2",
  },
  {
    id: 1,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limited: "Limitted Ed - 01/12",
    cost: "50%",
    Medium: "3 × 5 × 2",
  },
];

export default function TableArtworkNoCheck({ IconTrack, IconReturned }) {
  // mrx : states ↓

  return (
    <Grid item>
      <div className={Style.P_tableArtists_MobileScroll_New}>
          <table className={Style.tableArtists_MobileScroll_New}>
          <tr className={Style.header_table}>
            <th className={Style.headerArtist}>Artwork</th>
            <th className={Style.headerName}></th>
            <th className={Style.headerPhone}>Limited</th>
            <th className={Style.headerCost}>Cost</th>
            <th className={Style.headerCost}>Size</th>
            {(IconTrack || IconReturned) && <th className={Style.headerIcon}></th>}
          </tr>

        {ArtworkData?.map((Artwork) => (
          <>
            <tr className={Style.tableData_old} key={Artwork.id}>
              <td className={Style.artist_Pic}>
                <img src={Artwork.img.src} className={Style.imgArtworkModal} />
              </td>
              <td className={!(IconTrack || IconReturned )?Style.nameArtist_2:Style.nameArtist}>
                <div>{Artwork.name}</div>
                <div className={Style.ArtistNameTable}>{Artwork.artist}</div>
              </td>
              <td className={Style.PhoneArtist}>{Artwork.limited}</td>
              <td className={Style.emailArtist}>{Artwork.cost}</td>
              <td className={Style.emailArtist}>{Artwork.Medium}</td>
              {IconTrack ? (
                <td className={Style.emailArtist_1}>
                  <img src={TrackSvg.src} className={Style.FitIcon} />
                  Track
                </td>
              ) : IconReturned ? (
                <td className={Style.emailArtist_1}>
                  <img src={ReturnedSvg.src} className={Style.FitIcon} />
                  Returned
                </td>
              ) : (
                ""
              )}
            </tr>
          </>
        ))}
      </table>
      </div>
    </Grid>
  );
}
