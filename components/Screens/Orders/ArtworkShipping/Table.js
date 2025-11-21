import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Orders.module.css";

// good man : files ↓
import ArtworkPng from "../../../../public/images/list art.png";

// good man : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTable";
import TrackingInfo from "./TrackingInfo";

// ourData (Artists)
const artistData = [
  {
    id: 0,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limitted: "Lmtd Ed - 01/12",
    Size: "3 × 5 × 2",
    Weight: "110 lbs",
    isChecked: false,
  },
  {
    id: 1,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limitted: "Lmtd Ed - 01/12",
    Size: "3 × 5 × 2",
    Weight: "110 lbs",
    isChecked: false,
  },
];

export default function Table({HaveTracking = true}) {
  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);

  useEffect(() => {
    setArtists(artistData);
  }, [artistData]);

  // change status of checkBox
  const handleChange = (artistId) => {
    if (artistId === "allSelect") {
      let tempArtist = artists.map((artist) => {
        return { ...artist, isChecked: !allSelect };
      });
      setAllSelect(!allSelect);
      setArtists(tempArtist);
    } else {
      let tempArtist = artists.map((artist) =>
        artist.id === artistId
          ? { ...artist, isChecked: !artist.isChecked }
          : artist
      );
      setArtists(tempArtist);
    }
  };

  return (
    <Grid item className={Style.p_table}>
      <div className={Style.Scroll}>
        <div style={{ width: "200px" }}>
          <Grid item className={Style.tableArtists_12}>
            <Grid
              container
              alignItems="center"
              className={Style.header_table_1}
            >
              <Grid item className={Style.header_checkbox}>
                <CheckBoxTable
                  artistId="allSelect"
                  handleChange={handleChange}
                  artists={artists}
                />
              </Grid>
              <Grid item className={Style.headerArtwork_10}>
                Artwork
              </Grid>
              <Grid item className={Style.headerName_1}></Grid>
              <Grid item className={Style.headerLimitted}>
                Limited
              </Grid>
              <Grid item className={Style.headerSize}>
                Size
              </Grid>
              <Grid item className={Style.headerWeight}>
                Weight
              </Grid>
            </Grid>

            {artists?.map((artist) => (
              <>
                <Grid
                  container
                  alignItems="center"
                  className={Style.tableData_new}
                  key={artist.id}
                >
                  <Grid item className={Style.artist_checkBox_Br}>
                    <CheckBoxTable
                      artistId={artist.id}
                      handleChange={handleChange}
                      artists={artists}
                      checked={artist.isChecked}
                    />
                  </Grid>

                  <Grid item className={Style.ArtworkImg}>
                    <img
                      src={artist.img.src}
                      className={Style.imgArtworkModal}
                    />
                  </Grid>

                  <Grid item className={Style.nameArtist_Br_1}>
                    <div>{artist.name}</div>
                    <div className={Style.artistName}>{artist.artist}</div>
                  </Grid>

                  <Grid item className={Style.LimittedSec}>
                    {artist.limitted}
                  </Grid>
                  <Grid item className={Style.SizeSec}>
                    {artist.Size}
                  </Grid>
                  <Grid item className={Style.WeightSec}>
                    {artist.Weight}
                  </Grid>

                  <span className={Style.lineTable_top}></span>
                </Grid>
                {artist.isChecked && HaveTracking && <TrackingInfo />}
              </>
            ))}
          </Grid>
        </div>
      </div>
    </Grid>
  );
}
