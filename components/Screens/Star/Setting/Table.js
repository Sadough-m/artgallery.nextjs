import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Star.module.css";

// good man : files ↓
import ArtworkPng from "../../../../public/images/list art.png";

// good man : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// ourData (Artists)
const artistData = [
  {
    id: 0,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    cost: "$1,955.00",
    Medium: "Painting Oil on paper",
    isChecked: false,
  },
  {
    id: 1,
    img: ArtworkPng,
    name: "Black Swan",
    artist: "Sohrab Sepehri",
    cost: "$1,955.00",
    Medium: "Painting Oil on paper",
    isChecked: false,
  },
];

export default function TableArtwork() {
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
      <div className={Style.P_tableArtists_MobileScroll}>
        <div className={Style.WidthTable}>
          <table className={Style.tableArtists_MobileScroll}>
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
              <th className={Style.headerPhone}>Artist</th>
              <th className={Style.headerCost}>Year</th>
              <th className={Style.headerPhone}>Medium</th>
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

                  <td className={Style.artist_Pic}>
                    <img
                      src={artist.img.src}
                      className={Style.imgArtworkModal}
                    />
                    <span className={Style.ArtworkN}>{artist.name}</span>
                  </td>

                  <td className={Style.PhoneArtist}>{artist.artist}</td>
                  <td className={Style.emailArtist}>{artist.cost}</td>
                  <td className={Style.emailArtist}>{artist.Medium}</td>
                  <span className={Style.LineHTable}></span>
                </tr>
              </>
            ))}
          </table>
        </div>
      </div>
    </Grid>
  );
}
