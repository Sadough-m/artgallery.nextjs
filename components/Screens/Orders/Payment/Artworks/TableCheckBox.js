import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// good man : files ↓
import ArtworkPng from "../../../../../public/images/list art.png";

// good man : components ↓
import CheckBoxTable from "../../../../Forms/CheckBoxTable";

// ourData (Artists)
const artistData = [
  {
    id: 0,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    limitted:'Lmtd Ed - 01/12',
    Price: "$1,955.00",
    Count: "×1",
    isChecked: false,
  },
];

export default function TableCheckBox() {
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
      <div className={Style.CC_table}>
      <table className={Style.tableArtists}>
          <tr className={Style.header_table}>
            <th className={Style.header_checkbox}>
              {/* check box all select */}
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
              />
            </th>
            <th className={Style.headerArtist}>Artwork</th>
            <th className={Style.headerName}></th>
            <th className={Style.headerPhone}>Limited</th>
            <th className={Style.headerCost}>Price</th>
            <th className={Style.headerCount}>Count</th>
          </tr>

        {artists?.map((artist) => (
          <>
            <tr className={Style.tableData_old} key={artist.id}>
              <td className={Style.artist_checkBox}>
                <CheckBoxTable
                  artistId={artist.id}
                  handleChange={handleChange}
                  artists={artists}
                  checked={artist.isChecked}
                />
              </td>

              <td className={Style.artist_Pic_5}>
                <img src={artist.img.src} className={Style.imgArtworkModal} />
              </td>

              <td className={Style.nameArtist_5}>
                <div>{artist.name}</div>
                <div className={Style.artistName}>{artist.artist}</div>
              </td>

              <td className={Style.PhoneArtist_5}>{artist.limitted}</td>
              <td className={Style.PhoneArtist_5}>{artist.Price}</td>
              <td className={Style.emailArtist}>{artist.Count}</td>
            </tr>
          </>
        ))}
      </table>
      </div>
    </Grid>
  );
}
