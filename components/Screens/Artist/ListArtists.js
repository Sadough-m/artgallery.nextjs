import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Router, useRouter } from "next/router";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtistStyle from "../../../styles/artist.module.css";

// good man : files ↓
import guy2 from "../../../public/images/icons/pic guy 2.svg";
import guy1 from "../../../public/images/icons/pic guy1.svg";
import guy3 from "../../../public/images/icons/guy3.svg";
import guy4 from "../../../public/images/icons/guy 4.svg";
import guy5 from "../../../public/images/icons/guy5.svg";
import trashIcon from "../../../public/images/icons/Trash1.svg";
import unArchiveIcon from "../../../public/images/icons/unArchive.svg";
import Consignments from "../../../public/images/icons/Consignments up.svg";
import UnbookMarkIcon from "../../../public/images/icons/UnBookmark.svg";
import bookmarkGray from "../../../public/images/icons/book mark gray.svg";
import bookmarkBlack from "../../../public/images/icons/book mark blue.svg";
import bookmarkBlue from "../../../public/images/icons/book mark blue.svg";

import ArrowRight from "../../../public/images/icons/Arrow right blue.svg";

// good man : components ↓
import Archive from "../../Modals/Archive";
import CheckBoxTable from "../../Forms/CheckBoxTable";
import useWindowSize from "../../../Hooks/useWindowSize";
import { BASE_Image_Url } from "../../../pages/api";

export default function ListArtists({
  data,
  saved = false,
  handleSaveArtist,
  handleArchiveArtist,
  setSelectedArtistID,
}) {
  const router = useRouter();
  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [openArchiveMd, setopenArchiveMd] = useState(false);
  const [ISArchived, setISArchived] = useState(false);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    setArtists(data);
  }, [data]);

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
        artist.artistId === artistId
          ? { ...artist, isChecked: !artist.isChecked }
          : artist
      );
      setArtists(tempArtist);
    }
  };

  // open and close modal archive
  const handleArchiveMd = (ID, Fnamem, Lname, Status) => {
    setopenArchiveMd(true);
    setSelectedArtistID(ID);
    setISArchived(Status);
    localStorage.setItem(
      "artist-archiving-name",
      Fnamem && Fnamem + " " + Lname && Lname
    );
  };

  const handleArchiveMdRightNow = () => {
    handleArchiveArtist();
    setopenArchiveMd(!openArchiveMd);
  };

  return (
    <>
      {/* for Desktop */}
      <Hidden smDown>
        <table className={ArtistStyle.tableArtists}>
            <tr className={ArtistStyle.header_table}>
              <th className={ArtistStyle.header_checkbox}>
                {/* check box all select */}
                <CheckBoxTable
                  artistId="allSelect"
                  handleChange={handleChange}
                  artists={artists}
                />
              </th>

              <th className={ArtistStyle.headerArtist}>Artist</th>

              <th className={ArtistStyle.headerWorks}>Works</th>
              <th className={ArtistStyle.headerPhone}>Phone number</th>
              <th className={ArtistStyle.headerEmail}>Email address</th>
              <th className={ArtistStyle.headerButton}></th>
            </tr>

          {artists?.map((artist) => (
            <>
              <tr className={ArtistStyle.tableData} key={artist.artistId}>
                <td className={ArtistStyle.artist_checkBox}>
                  <CheckBoxTable
                    artistId={artist.artistId}
                    handleChange={handleChange}
                    artists={artists}
                    checked={artist.isChecked}
                  />
                </td>

                <td className={ArtistStyle.artist_Pic}>
                  <img
                    className={ArtistStyle.ImgArtistDesk}
                    src={BASE_Image_Url + artist.profileUrl}
                  />
                  <span className={ArtistStyle.NameArtist}>
                    {artist.name + " " + artist.lastName}
                  </span>
                </td>

                  <td className={ArtistStyle.infoArtist}>
                    {artist?.artworkCount + " peices"}
                  </td>

                <td className={ArtistStyle.PhoneArtist}>
                  {artist.phoneNumber}
                </td>
                <td className={ArtistStyle.emailArtist}>
                  <span className={ArtistStyle.Email}>{artist.email}</span>
                  <span className={ArtistStyle.P_TwoIcon}>
                    <span className={ArtistStyle.TableIcons1}>
                      <IconButton
                        onClick={() => {
                          handleArchiveMd(
                            artist?.artistId,
                            artist.name,
                            artist.lastName,
                            artist?.isArchived
                          );
                        }}
                      >
                        {artist?.isArchived ? (
                          <img src={unArchiveIcon.src} width={21}/>
                        ) : (
                          <img
                            src={trashIcon.src}
                            className={ArtistStyle.TrashIc}
                          />
                        )}
                      </IconButton>
                    </span>
                    <span className={ArtistStyle.TableIcons2}>
                      <IconButton
                        onClick={() => {
                          handleSaveArtist(
                            artist?.artistId,
                            artist.name,
                            artist.lastName
                          );
                        }}
                      >
                        {artist?.isSaved === true ? (
                          <img
                            src={bookmarkBlue.src}
                            className={ArtistStyle.BookMarkIcon}
                          />
                        ) : (
                          <img
                            src={UnbookMarkIcon.src}
                            className={ArtistStyle.UnBookMarkIcon}
                          />
                        )}
                      </IconButton>
                    </span>
                  </span>
                </td>

                  <td className={ArtistStyle.artist_borderBot1}>
                    <Button
                      endIcon={<Image src={ArrowRight} />}
                      color="primary"
                      onClick={() => router.push(`/artist/${artist.id}`)}
                      className={ArtistStyle.BtnView}
                    >
                      View Artist
                    </Button>
                  </td>
                <Hidden mdUp>
                  <span className={ArtistStyle.lineTable}></span>
                </Hidden>
              </tr>
            </>
          ))}
        </table>
      </Hidden>

      {/* for Mobile */}
      <Hidden mdUp>
        <div  style={{ marginBottom: 50 }}>
          {artists?.map((artist) => (
            <Grid item className={ArtistStyle.ArtistInMobile} key={artist.artistId}>
              {/* just for Click */}
              <span
                className={ArtistStyle.JustForClick}
                onClick={() => router.push(`/artist/${artist.id}`)}
              ></span>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Grid item>
                  <Grid container>
                    <Grid item className={ArtistStyle.ParentCheckBox}>
                      <CheckBoxTable
                        artistId={artist.artistId}
                        handleChange={handleChange}
                        artists={artists}
                        checked={artist.isChecked}
                      />
                    </Grid>
                    <Grid item>
                      <img
                        src={BASE_Image_Url + artist.profileUrl}
                        className={ArtistStyle.PhotoArtist}
                      />
                    </Grid>
                    <Grid item className={ArtistStyle.NameOfArtist}>
                      {artist.name + " " + artist.lastName}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton
                    size="small"
                    className={ArtistStyle.TrashIcon}
                    onClick={() => {
                      handleArchiveMd(
                        artist?.artistId,
                        artist.name,
                        artist.lastName,
                        artist?.isArchived
                      );
                    }}
                  >
                    {artist?.isArchived ? (
                      <img src={unArchiveIcon.src} />
                    ) : (
                      <img src={trashIcon.src} />
                    )}
                  </IconButton>

                  <IconButton
                    size="small"
                    className={ArtistStyle.BookMarkIconMobile}
                    onClick={() => {
                      handleSaveArtist(
                        artist?.artistId,
                        artist.name,
                        artist.lastName
                      );
                    }}
                  >
                    {artist?.isSaved === true ? (
                      <img
                        src={bookmarkBlue.src}
                        className={ArtistStyle.BookMarkIcon}
                      />
                    ) : (
                      <img src={UnbookMarkIcon.src} />
                    )}
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item className={ArtistStyle.P_EmailArtist}>
                <Grid item className={ArtistStyle.Phone}>
                  {artist.phoneNumber}
                </Grid>
                <Grid item className={ArtistStyle.EmailArtistMobile}>
                  {artist.email}
                </Grid>
              </Grid>
            </Grid>
          ))}
        </div>
      </Hidden>
      <Archive
        ISArchived={ISArchived}
        openModal={openArchiveMd}
        handleArchiveMdRightNow={handleArchiveMdRightNow}
        setopenArchiveMd={setopenArchiveMd}
        handleArchiveMd={handleArchiveMd}
      />
      </>
  );
}
