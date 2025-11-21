import React, { useState, useEffect } from "react";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../styles/Exhibition.module.css";

// good man : files ↓
import trashSvg from "../../../public/images/icons/Trash1.svg";
import DuplicateSvg from "../../../public/images/icons/Duplicate.svg";
import ArrowRightSvg from "../../../public/images/icons/Arrow right blue.svg";
import ExhibitionPng from "../../../public/images/list art.png";

// good man : components ↓
import CheckBoxTable from "../../Forms/CheckBoxTable";
import RemoveItem from "../../Modals/Orders/RemoveItem";
import ArchiveItem from "../../Modals/Orders/ArchiveItem";

// ourData (Artists)
const artistData = [
  {
    id: 0,
    ExhibitionImg: ExhibitionPng,
    Exhibition: "Black SWAN",
    Artist: "Sohrab Sepehri",
    Statuse: "Live",
    Duration: "01 - 01 - 2020",
    Location: "London, UK",
    isChecked: false,
  },
  {
    id: 1,
    ExhibitionImg: ExhibitionPng,
    Exhibition: "Black SWAN",
    Artist: "Sohrab Sepehri",
    Statuse: "Live",
    Duration: "01 - 01 - 2020",
    Location: "London, UK",
    isChecked: false,
  },
  {
    id: 2,
    ExhibitionImg: ExhibitionPng,
    Exhibition: "Black SWAN",
    Artist: "Sohrab Sepehri",
    Statuse: "Live",
    Duration: "01 - 01 - 2020",
    Location: "London, UK",
    isChecked: false,
  },
];

export default function TableDraftOrders() {
  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [ModalRemove, setModalRemove] = useState(false);
  const [ModalArchive, setModalArchive] = useState(false);

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
    <Grid item className={Style.p_table_13}>
      {/* For Desktop */}
      <Hidden smDown>
        <table className={Style.tableArtists}>
          <tr className={Style.header_table}>
            <th className={Style.H_Check}>
              {/* check box all select */}
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
              />
            </th>
            <th className={Style.H_Exhibition}>Exhibition</th>
            <th className={Style.H_Artist}>Artist</th>
            <th className={Style.H_Statuse}>Statuse</th>
            <th className={Style.H_Duration}>Duration</th>
            <th className={Style.H_Location}>Location</th>
            <th className={Style.H_Delete}></th>
            <th className={Style.H_Duplicate}></th>
            <th className={Style.H_View}></th>
            <span className={Style.lineTable}></span>
          </tr>

          {artists?.map((artist) => (
            <>
              <tr className={Style.tableData_Draft} key={artist.id}>
                <td className={Style.B_Check}>
                  <CheckBoxTable
                    artistId={artist.id}
                    handleChange={handleChange}
                    artists={artists}
                    checked={artist.isChecked}
                  />
                </td>
                <td className={Style.B_Exhibition}>
                  <img
                    src={artist.ExhibitionImg.src}
                    className={Style.ImgExhibition}
                  />
                  <span className={Style.ExhobitionName}>
                    {artist.Exhibition}
                  </span>
                </td>

                <td className={Style.B_Artist}>{artist.Artist}</td>
                <td className={Style.B_Statuse}>{artist.Statuse}</td>
                <td className={Style.B_Duration}>
                  <div className={Style.C_B_Duration}>{artist.Duration}</div>
                  <div className={Style.C_B_Duration}>{artist.Duration}</div>
                </td>
                <td className={Style.B_Location}>{artist.Location}</td>
                <td className={Style.B_Delete}>
                  <IconButton onClick={() => setModalRemove(true)}>
                    <img src={trashSvg.src} />
                  </IconButton>
                </td>
                <td className={Style.B_Duplicate}>
                  <IconButton onClick={() => setModalArchive(true)}>
                    <img src={DuplicateSvg.src} />
                  </IconButton>
                </td>
                <td className={Style.B_View}>
                  <Button
                    color="primary"
                    className={Style.View}
                    endIcon={<img src={ArrowRightSvg.src} />}
                  >
                    View Exhibition
                  </Button>
                </td>
                <span className={Style.lineTable}></span>
              </tr>
            </>
          ))}
        </table>
      </Hidden>

      {/* for Mobile */}
      <Hidden mdUp>
        <div style={{ marginBottom: 50 }}>
          {artists?.map((artist) => (
            <Grid item className={Style.ArtistInMobile} key={artist.id}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container>
                    <Grid item className={Style.ParentCheckBox}>
                      <CheckBoxTable
                        artistId={artist.id}
                        handleChange={handleChange}
                        artists={artists}
                        checked={artist.isChecked}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={artist.ExhibitionImg.src}
                        className={Style.PhotoArtist}
                      />
                    </Grid>
                    <Grid item className={Style.NameOfArtist}>
                      <Grid item>{artist.Exhibition}</Grid>
                      <Grid item className={Style.ArtistNameMobile}>{artist.Artist}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton size="small" className={Style.TrashIconMobile} onClick={() => setModalRemove(true)}>
                    <img src={DuplicateSvg.src} />
                  </IconButton>

                  <IconButton size="small" className={Style.BookMarkIconMobile} onClick={() => setModalArchive(true)}>
                    <img src={trashSvg.src} className={Style.BookMarkIcon} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item className={Style.P_EmailArtist}>
                <Grid item className={Style.Phone}>
                  {artist.Statuse}
                  <span className={Style.LocationMobile}>{artist.Location}</span>
                </Grid>
                <Grid item className={Style.EmailArtistMobile}>
                  {artist.Duration} , {artist.Duration}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </div>
      </Hidden>

      <RemoveItem
        open={ModalRemove}
        handleModal={() => setModalRemove(false)}
      />
      <ArchiveItem
        open={ModalArchive}
        handleModal={() => setModalArchive(false)}
      />
    </Grid>
  );
}
