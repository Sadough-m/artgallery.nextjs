import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../styles/Contacts.module.css";

// good man : files ↓
import listArtPng from "../../../public/images/list art.png";
import trashIcon from "../../../public/images/icons/Trash1.svg";
import duplicateSvg from "../../../public/images/icons/Duplicate.svg";
import Consignments from "../../../public/images/icons/Consignments up.svg";
import UnbookMarkIcon from "../../../public/images/icons/UnBookmark.svg";
import ArrowRight from "../../../public/images/icons/Arrow right blue.svg";

// good man : components ↓
import Archive from "../../Modals/Archive";
import CheckBoxTable from "../../Forms/CheckBoxTable";
import useWindowSize from "../../../Hooks/useWindowSize";

// ourData (Artists)
const artistData = [
  {
    id: 0,
    img: listArtPng,
    name: "Black SWAN",
    phone: "Manual",
    email: "12 Artworks",
    icon: trashIcon,
    isChecked: false,
  },
  {
    id: 1,
    img: listArtPng,
    name: "Black SWAN",
    phone: "Manual",
    email: "12 Artworks",
    icon: Consignments,
    isChecked: false,
  },
  {
    id: 2,
    img: listArtPng,
    name: "Black SWAN",
    phone: "Manual",
    email: "12 Artworks",
    icon: trashIcon,
    isChecked: false,
  },
  {
    id: 3,
    img: listArtPng,
    name: "Black SWAN",
    phone: "Manual",
    email: "12 Artworks",
    icon: trashIcon,
    isChecked: false,
  },
  {
    id: 10,
    img: listArtPng,
    name: "Black SWAN",
    phone: "Manual",
    email: "12 Artworks",
    icon: trashIcon,
    isChecked: false,
  },
];

export default function TableList() {
  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [openArchiveMd, setopenArchiveMd] = useState(false);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

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

  // open and close modal archive
  const handleArchiveMd = () => {
    setopenArchiveMd(!openArchiveMd);
  };

  return (
    <Grid item className={Style.p_table}>
      <table className={Style.tableArtists}>
        <Hidden smDown>
          <tr className={Style.header_table}>
            <th className={Style.header_checkbox}>
              {/* check box all select */}
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
              />
            </th>

            <th className={Style.headerArtist}>Collection</th>
            <th className={Style.headerName_1}></th>
            <th className={Style.headerPhone}>Mode</th>
            <th className={Style.headerEmail}>Artworks</th>
            <th className={Style.headerIconTrash_1}></th>
            <th className={Style.headerDuplicate}></th>
            <th className={Style.headerButton_1}></th>
          </tr>
        </Hidden>

        {artists?.map((artist) => (
          <>
            <tr className={Style.tableData} key={artist.id}>
              <td className={Style.artist_checkBox}>
                <CheckBoxTable
                  artistId={artist.id}
                  handleChange={handleChange}
                  artists={artists}
                  checked={artist.isChecked}
                />
              </td>

              <td className={Style.artist_Pic}>
                <Image
                  src={artist.img}
                  width={width > 960 ? "64px" : "45px"}
                  height={width > 960 ? "64px" : "45px"}
                />
              </td>

              <td className={Style.nameArtist}>{artist.name}</td>

              <td className={Style.PhoneArtist}>{artist.phone}</td>
              <td className={Style.emailArtist}>{artist.email}</td>
              <td className={Style.artist_IconTrash}>
                <IconButton onClick={handleArchiveMd}>
                  <Image src={trashIcon} />
                </IconButton>
              </td>

              <td className={Style.artist_unbookMark}>
                <IconButton>
                  <Image src={duplicateSvg} />
                </IconButton>
              </td>

              <Hidden smDown>
                <td className={Style.artist_borderBot1_1}>
                  <Button endIcon={<Image src={ArrowRight} />} color="primary">
                    View Collection
                  </Button>
                </td>
              </Hidden>
              <Hidden mdUp>
                <span className={Style.echoCol}>Echo collection</span>
                <span className={Style.lineTable}></span>
              </Hidden>
            </tr>
          </>
        ))}
      </table>
      <Archive openModal={openArchiveMd} handleArchiveMd={handleArchiveMd} />
    </Grid>
  );
}
