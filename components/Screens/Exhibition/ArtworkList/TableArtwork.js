import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// good man : files ↓
import ArtworkPng from "../../../../public/images/list art.png";
import RemoveCircleSvg from "../../../../public/images/icons/RemoveCircle.svg";

// good man : components ↓

// ourData
const ArtworkData = [
  {
    id: 0,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limited: "Limitted Ed - 01/12",
    Price: "$1,955.00",
    Medium: "3 × 5 × 2",
  },
  {
    id: 1,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limited: "Limitted Ed - 01/12",
    Price: "$1,955.00%",
    Medium: "3 × 5 × 2",
  },
];

export default function TableArtwork() {
  // mrx : states ↓

  return (
    <Grid item>
      <div className={Style.P_tableArtists_MobileScroll_New}>
        <table className={Style.tableArtists_MobileScroll_New}>
          <tr className={Style.header_table}>
            <th className={Style.headerArtist}>Artwork</th>
            <th className={Style.headerName}></th>
            <th className={Style.headerPhone}>Limited</th>
            <th className={Style.headerCost}>Price</th>
            <th className={Style.headerCost}>Size</th>
            <th className={Style.headerIcon}></th>
          </tr>

          {ArtworkData?.map((Artwork) => (
            <>
              <tr className={Style.tableData_old} key={Artwork.id}>
                <td className={Style.artist_Pic}>
                  <img
                    src={Artwork.img.src}
                    className={Style.imgArtworkModal}
                  />
                </td>
                <td className={Style.nameArtist_2}>
                  <div>{Artwork.name}</div>
                  <div className={Style.ArtistNameTable}>{Artwork.artist}</div>
                </td>
                <td className={Style.PhoneArtist}>{Artwork.limited}</td>
                <td className={Style.emailArtist}>{Artwork.Price}</td>
                <td className={Style.emailArtist}>{Artwork.Medium}</td>

                <td className={Style.emailArtist_1}>
                  <IconButton size="small">
                    <img src={RemoveCircleSvg.src}  />
                  </IconButton>
                </td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </Grid>
  );
}
