import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../styles/Contacts.module.css";
import ArtistStyle from "../../../styles/artist.module.css";

// good man : files ↓
import trashIcon from "../../../public/images/icons/Trash1.svg";
import Consignments from "../../../public/images/icons/Consignments up.svg";
import UnbookMarkIcon from "../../../public/images/icons/UnBookmark.svg";
import ArrowRight from "../../../public/images/icons/Arrow right blue.svg";
import unArchiveIcon from "../../../public/images/icons/unArchive.svg";
import LoadingSpinerSvg from "../../../public/loading.svg";
import bookmarkBlue from "../../../public/images/icons/book mark blue.svg";

import {
  TOGGLE_SAVE_CONTACT,
  BASE_Image_Url,
  ARHIVE_CONTACT,
} from "../../../pages/api/index";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, GetUrl } from "../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../context/index";

// good man : components ↓
import Archive from "../../Modals/Archive";
import CheckBoxTable from "../../Forms/CheckBoxTable";
import useWindowSize from "../../../Hooks/useWindowSize";

export default function TableContacts({
  saved = false,
  data,
  LoadingData,
  setContactList,
  category,
  sortBy,
  lastActivity,
  tag,
  search,
}) {
  const router = useRouter();
  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [openArchiveMd, setopenArchiveMd] = useState(false);
  const [FullName, setFullName] = useState("");
  const [ContactID1, setContactID1] = useState("");

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    setArtists(data);
    setFullName(
      (data[0]?.name ? data[0]?.name : "") +
        " " +
        (data[0]?.lastName ? data[0]?.lastName : "")
    );
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
        artist?.artistId === artistId
          ? { ...artist, isChecked: !artist?.isChecked }
          : artist
      );
      setArtists(tempArtist);
    }
  };

  // open and close modal archive
  const handleArchiveMd = () => {
    if (FullName) {
      setopenArchiveMd(true);
      localStorage.setItem("artist-archiving-name", FullName && FullName);
    } else {
      toast.info("Please wait for a moment");
    }
  };

  const handleArchiveMdRightNow = () => {
    handleArchiveContact();
    setopenArchiveMd(!openArchiveMd);
  };

  // mrx : archive contact
  const handleArchiveContact = () => {
    PostAuthUrl(ARHIVE_CONTACT(localStorage.getItem("collectionId")), {
      collectionId: localStorage.getItem("collectionId"),
      contactId: ContactID1,
      saved: saved,
      search: search,
      tag: tag,
      category: category,
      lastActivity: lastActivity,
      sortBy: sortBy,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(`successfully Done`);
          setContactList(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // mrx : archive contact
  const handleSaveContact = (ContactID) => {
    PostAuthUrl(TOGGLE_SAVE_CONTACT(localStorage.getItem("collectionId")), {
      collectionId: localStorage.getItem("collectionId"),
      contactId: ContactID,
      saved: saved,
      search: search,
      tag: tag,
      category: category,
      lastActivity: lastActivity,
      sortBy: sortBy,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(`successfully Done`);
          setContactList(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  return (
    <Grid item className={Style.p_table}>
      <Hidden smDown>
        <table style={{ position: "relative" }} className={Style.tableArtists}>
          <tr className={Style.header_table}>
            <th className={ArtistStyle.header_checkbox}>
              {/* check box all select */}
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
              />
            </th>

            <th className={ArtistStyle.headerArtist}>Contact</th>

            <th className={ArtistStyle.headerPhone}>Phone number</th>
            <th className={ArtistStyle.headerEmail}>Email address</th>
            <th className={ArtistStyle.headerButton}></th>
          </tr>

          <div className={Style.MainLoading}>
            {LoadingData ? (
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            ) : (
              <></>
            )}
          </div>

          {LoadingData === false ? (
            artists?.map((artist) => (
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
                      src={
                        artist?.profileUrl !== null
                          ? BASE_Image_Url + artist?.profileUrl
                          : "https://backend.artor.net/uploadedfiles/defultUser.png"
                      }
                      className={ArtistStyle.ImgArtistDesk}
                    />
                    <span className={ArtistStyle.NameArtist}>
                      {(artist?.name ? artist?.name : "") +
                        " " +
                        (artist?.lastName ? artist?.lastName : "")}
                    </span>
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
                            handleArchiveMd();
                            setContactID1(artist.id);
                          }}
                        >
                          {artist?.isArchived ? (
                            <img src={unArchiveIcon.src} />
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
                            handleSaveContact(artist?.id);
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
                      onClick={() => router.push(`/contact/${artist.id}`)}
                      className={ArtistStyle.BtnView}
                    >
                      View Contact
                    </Button>
                  </td>
                </tr>
              </>
            ))
          ) : (
            <></>
          )}
        </table>
      </Hidden>

      <Hidden mdUp>
        <>
          {LoadingData === false ? (
            artists?.map((artist) => (
              <Grid
                item
                className={ArtistStyle.ArtistInMobile}
                key={artist.artistId}
              >
                {/* just for Click */}
                <span
                  className={ArtistStyle.JustForClick}
                  onClick={() => router.push(`/contact/${artist.id}`)}
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
                          className={ArtistStyle.PhotoArtist}
                          src={
                            artist?.profileUrl !== null
                              ? BASE_Image_Url + artist?.profileUrl
                              : "https://backend.artor.net/uploadedfiles/defultUser.png"
                          }
                        />
                      </Grid>
                      <Grid item className={ArtistStyle.NameOfArtist}>
                        {(artist?.name ? artist?.name : "") +
                          " " +
                          (artist?.lastName ? artist?.lastName : "")}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => {
                        handleArchiveMd();
                        setContactID1(artist.id);
                      }}
                      size="small"
                      className={ArtistStyle.TrashIcon}
                    >
                      {artist?.isArchived ? (
                        <img src={unArchiveIcon.src} />
                      ) : (
                        <img
                          src={trashIcon.src}
                          className={ArtistStyle.TrashIc}
                        />
                      )}
                    </IconButton>
                    <IconButton
                      size="small"
                      className={ArtistStyle.BookMarkIconMobile}
                      onClick={() => {
                        handleSaveContact(artist?.id);
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
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.P_EmailArtist}>
                  <Grid item className={ArtistStyle.Phone}>{artist.phoneNumber}</Grid>
                  <Grid item className={ArtistStyle.EmailArtistMobile}>{artist.email}</Grid>
                  <Grid item className={ArtistStyle.EchoLab}>Echo collection</Grid>
                </Grid>
              </Grid>
            ))
          ) : (
            <></>
          )}
        </>
      </Hidden>

      <Archive
        setopenArchiveMd={setopenArchiveMd}
        openModal={openArchiveMd}
        handleArchiveMd={handleArchiveMd}
        handleArchiveMdRightNow={handleArchiveMdRightNow}
      />
    </Grid>
  );
}
