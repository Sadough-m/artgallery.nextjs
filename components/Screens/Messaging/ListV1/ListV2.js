import React, { useState, useEffect } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import Guy1Png from "../../../../public/images/guy.png";
import Guy2Png from "../../../../public/images/guy2.png";
import Guy3Png from "../../../../public/images/guy4.png";
import ArtworkImg1 from "../../../../public/images/ArtworkMessaging1.png";
import ArtworkImg2 from "../../../../public/images/ArtworkMessaging2.png";
import ArrowLeftSvg from "../../../../public/images/icons/Arrow left -.svg";

// gm : Data ↓
const artistData = [
  {
    id: 0,
    GuyImg: Guy1Png,
    name: "Esther Howard",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Customer",
    offerStatus: "OFFER",
    time: "10 minutes ago",
    artworkImg: ArtworkImg1,
    artworkName: "Black SWAN",
    artistName: "Sohrab Sepehri",
    NumArtworks: 2,
    NumPerson: 2,
    isChecked: false,
  },
  {
    id: 2,
    GuyImg: Guy2Png,
    name: "Annette Black",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Customer",
    offerStatus: "Buying",
    time: "10 minutes ago",
    artworkImg: ArtworkImg2,
    artworkName: "Artin",
    artistName: "Sohrab Sepehri",
    NumArtworks: 2,
    NumPerson: 2,
    isChecked: false,
  },
  {
    id: 3,
    GuyImg: Guy3Png,
    name: "Arlene McCoy",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Collector",
    offerStatus: "Inquiry",
    time: "10 minutes ago",
    artworkImg: ArtworkImg2,
    artworkName: "Artin",
    artistName: "Sohrab Sepehri",
    NumArtworks: 2,
    NumPerson: 2,
    isChecked: false,
  },
  {
    id: 4,
    GuyImg: Guy3Png,
    name: "Arlene McCoy",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Collector",
    offerStatus: "Inquiry",
    time: "10 minutes ago",
    artworkImg: ArtworkImg2,
    artworkName: "Artin",
    artistName: "Sohrab Sepehri",
    NumArtworks: 2,
    NumPerson: 2,
    isChecked: false,
  },
  {
    id: 5,
    GuyImg: Guy3Png,
    name: "Arlene McCoy",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Collector",
    offerStatus: "Inquiry",
    time: "10 minutes ago",
    artworkImg: ArtworkImg2,
    artworkName: "Artin",
    artistName: "Sohrab Sepehri",
    NumArtworks: 2,
    NumPerson: 2,
    isChecked: false,
  },
  {
    id: 6,
    GuyImg: Guy3Png,
    name: "Arlene McCoy",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Collector",
    offerStatus: "Inquiry",
    time: "10 minutes ago",
    artworkImg: ArtworkImg2,
    artworkName: "Artin",
    artistName: "Sohrab Sepehri",
    NumArtworks: 2,
    NumPerson: 2,
    isChecked: false,
  },
];

// gm : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTable";
import ByPersonSingle from "./ByPersonSingle";
import ByPieceSingle from "./ByPieceSingle";

export default function ListV2({ ListType = "Person" }) {
  // gm : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);

  // change status of checkBox
  useEffect(() => {
    setArtists(artistData);
  }, [artistData]);

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
    <Grid item>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_PersonAndCheck}
      >
        <Grid item className={Style.P_PersonName}>
          <Hidden smDown>
            <Grid item className={Style.P_AllSelect2}>
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
              />
            </Grid>
          </Hidden>
          <Grid item className={Style.PersonName}>
            <Link href="/messaging">
              <IconButton>
                <img src={ArrowLeftSvg.src} />
              </IconButton>
            </Link>
            {ListType === "Person" ? "Esther Howard" : "Black Swan"}
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={Style.MobileSpace}>
        {ListType === "Person" &&
          artists?.map((artist) => (
            <ByPersonSingle
              artist={artist}
              artists={artists}
              handleChange={handleChange}
            />
          ))}
        {ListType === "Piece" &&
          artists?.map((artist) => (
            <ByPieceSingle
              artist={artist}
              artists={artists}
              handleChange={handleChange}
            />
          ))}
      </Grid>
    </Grid>
  );
}
