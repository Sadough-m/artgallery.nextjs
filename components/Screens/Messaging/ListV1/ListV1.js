import React, { useState, useEffect } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import Guy1Png from "../../../../public/images/guy.png";
import Guy2Png from "../../../../public/images/guy2.png";
import Guy3Png from "../../../../public/images/guy4.png";
import BlackPng from "../../../../public/images/black.png";
import ArtworkImg1 from "../../../../public/images/ArtworkMessaging1.png";
import ArtworkImg2 from "../../../../public/images/ArtworkMessaging2.png";
import SearchSvg from "../../../../public/images/icons/Search.svg";

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
    NumArtworks:2,
    NumPerson:2,
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
    NumArtworks:2,
    NumPerson:2,
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
    NumArtworks:2,
    NumPerson:2,
    isChecked: false,
  },
];
const AdminData = [
  {
    id: 0,
    GuyImg: BlackPng,
    name: "Artiverse",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Customer",
    offerStatus: "",
    time: "10 minutes ago",
    artworkImg: Guy1Png,
    artworkName: "Verification",
    artistName: "Profile",
    isChecked: false,
  },
  {
    id: 1,
    GuyImg: BlackPng,
    name: "Artiverse",
    statuse: "Hi there! Do you have this artwork available?",
    type: "Customer",
    offerStatus: "Minting",
    time: "10 minutes ago",
    artworkImg: ArtworkImg2,
    artworkName: "Artin",
    artistName: "Sohrab Sepehri",
    isChecked: false,
  },
];

// gm : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTable";
import Item from "./Item";
import AdminItem from "./AdminItem";
import ByPiece from "./ByPiece";
import ByPerson from "./ByPerson";

export default function ListV1() {
  // gm : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [ShowType, setShowType] = useState("All");

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
        className={Style.P_InputSearchBtn}
      >
        <Grid item className={Style.P_Input}>
          <Hidden smDown>
            <Grid item className={Style.P_AllSelect}>
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
              />
            </Grid>
          </Hidden>
          <Grid item className={Style.P_InputList}>
            <input
              type="search"
              placeHolder="Search inquiries"
              className={Style.InputList}
            />
            <img src={SearchSvg.src} className={Style.SearchSvg} />
          </Grid>
        </Grid>
        <Grid item>
          <Button
            className={ShowType ==="By Person"? Style.ShowType_Sel:Style.ShowType}
            onClick={() => setShowType("By Person")}
          >
            By Person
          </Button>
          <Button
            className={ShowType ==="By Piece"? Style.ShowType_Sel:Style.ShowType}
            onClick={() => setShowType("By Piece")}
          >
            By Piece
          </Button>
        </Grid>
      </Grid>
      {ShowType === "All" &&
        AdminData?.map((Data) => <AdminItem Data={Data} />)}

      {ShowType === "All" &&
        artists?.map((artist) => (
          <Item artist={artist} artists={artists} handleChange={handleChange} />
        ))}
      {ShowType === "By Person" &&
        artists?.map((artist) => (
          <ByPerson
            artist={artist}
            artists={artists}
            handleChange={handleChange}
          />
        ))}
        {ShowType === "By Piece" &&
        artists?.map((artist) => (
          <ByPiece
            artist={artist}
            artists={artists}
            handleChange={handleChange}
          />
        ))}
    </Grid>
  );
}
