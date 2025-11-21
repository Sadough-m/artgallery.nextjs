import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import Joi from "joi";
import { toast } from "react-toastify";

// mrx : material ui ↓
import {
  Hidden,
  Button,
  Badge,
  IconButton,
  Container,
  Avatar,
  Grid,
} from "@material-ui/core";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";

// rmx : files  ↓
import picPerson from "../../public/images/guy.png";
import checkCircle from "../../public/images/icons/Check - Circle.svg";
import ArrowLeft from "../../public/images/icons/Arrow left -.svg";
import More from "../../public/images/icons/More.svg";

// mrx : styles ↓
import savedArtistStyle from "../../styles/savedArtist.module.css";

//rs : set cookies with this
import Cookies from "js-cookie";

// mrx : components ↓
import Header from "../../components/common/header";
import withAuth from "../../components/common/withAuth";
import TextArea from "../../components/Forms/TextArea";
import ContactCreatedList from "../../components/Screens/Artist/ContactCreatedList";
import Info from "../../components/Screens/Artist/Info";
import Note from "../../components/Screens/Artist/Main/Note";

//rs : apis getters
import { GetAuthUrl, GetUrl, PostAuthUrl } from "../api/config";

//rs : api urls
import {
  ARTIST_DETAILS,
  TOGGLE_ARCHIVE_ARTIST,
  TOGGLE_SAVE_ARTIST,
  ARCHIVE_ARTIST,
  UPDATE_NOTE,
  UPDATE_NOTE_REAL,
  ADD_NOTE,
  SAVE_ARTIST,
  BASE_Image_Url
} from "../api";
import useWindowSize from "../../Hooks/useWindowSize";

function SavedArtist() {
  const router = useRouter();

  // mrx : states ↓
  let [collectionId, setCollectionId] = useState("");
  let [artistId, setArtistId] = useState("");
  let [artist, setArtist] = useState({});
  const [showPrivateNote, setShowPrivateNote] = useState(false);
  const [publicValue, setpublicValue] = useState(false);
  const [privateNote, setPrivateNote] = useState();
  const [UserDetail, setUserDetail] = useState([]);
  const [PrivateNoteData, setPrivateNoteData] = useState([]);
  const [publicValueData, setPublicValueData] = useState([]);
  const [timer, setTimer] = useState(0);

  const [NoteData, setNoteData] = useState([]);

  //rs : set artist list in state
  const getArtistDetails = (id) => {
    const collectionId = localStorage.getItem("collectionId");
    GetAuthUrl(ARTIST_DETAILS + `/${id}/${collectionId}`).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          const art = res.data.data;
          setUserDetail(res.data.data);
          let prvNote = art?.artistsNote?.filter(
            (note) => note?.privacyType === 1
          )[0];
          let pubNote = art?.artistsNote?.filter(
            (note) => note?.privacyType === 2
          )[0];
          setPrivateNoteData(prvNote === null ? "" : prvNote);
          setPublicValueData(pubNote === null ? "" : pubNote);
          setPrivateNote(prvNote?.text);
          setpublicValue(pubNote?.text);
          setArtist(art);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  const handleChangeprivateNote = (value) => {
    setPrivateNote(value);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      handleChangeprivateNoteApi(value);
    }, 500);

    setTimer(newTimer);
  };

  const handleChangepublicNote = (value) => {
    setpublicValue(value);

    clearTimeout(timer);
    const newTimer = setTimeout(() => {
      handleChangepublicNoteApi(value);
    }, 500);

    setTimer(newTimer);
  };

  const handleChangepublicNoteApi = (value) => {
    const collectionId = localStorage.getItem("collectionId");
    PostAuthUrl(UPDATE_NOTE_REAL + `?collectionId=${collectionId}`, {
      id: publicValueData?.id,
      text: value,
      relatedId: publicValueData?.relatedId,
      relatedType: publicValueData?.relatedType,
      privacyType: showPrivateNote ? 1 : 2,
      collectionId: publicValueData?.collectionId,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  const handleChangeprivateNoteApi = (value) => {
    const collectionId = localStorage.getItem("collectionId");
    PostAuthUrl(UPDATE_NOTE_REAL + `?collectionId=${collectionId}`, {
      id: PrivateNoteData?.id,
      text: value,
      relatedId: PrivateNoteData?.relatedId,
      relatedType: PrivateNoteData?.relatedType,
      privacyType: showPrivateNote ? 1 : 2,
      collectionId: PrivateNoteData?.collectionId,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  useEffect(() => {
    collectionId = localStorage.getItem("collectionId");
    setCollectionId(collectionId);
  }, []);

  //
  useEffect(() => {
    if (router.asPath !== router.route) {
      const { pid } = router.query;
      setArtistId(pid);
      getArtistDetails(pid);
    }
  }, [router]);

  const PrivateNoteHandler = () => {
    setShowPrivateNote(true);
  };

  const TeamNoteHandler = () => {
    setShowPrivateNote(false);
  };
  // mrx : functions (end) ↓

  // mrx : archive artist
  const handleArchiveArtist = () => {
    GetAuthUrl(ARCHIVE_ARTIST(localStorage.getItem("collectionId"), artistId)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          getArtistDetails(artistId);
          toast.success(`successfully Done`);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }

  // mrx : save artist
  const handleSaveArtist = () => {
    GetAuthUrl(SAVE_ARTIST(localStorage.getItem("collectionId"), artistId)).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          getArtistDetails(artistId);
          toast.success(`successfully Done`);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  }
  const [width, height] = useWindowSize()

  return (
    <Grid item>
        <Grid
          container
          className={savedArtistStyle.mainContainer_1}
          justifyContent={width > 960 ? "space-between" : 'flex-start'}
        >
          <Grid item  className={savedArtistStyle.LeftSide}>
            <Grid container direction="column" spacing={4}>
              <Grid item className={savedArtistStyle.P_Text_easter}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid container spacing={0} alignItems="center">
                      <Grid item className={savedArtistStyle.P_arrowLeft}>
                        <IconButton
                          size="small"
                          onClick={() => router.push("/artist/list")}
                        >
                          <Image src={ArrowLeft} />
                        </IconButton>
                      </Grid>
                      <Grid item className={savedArtistStyle.Text_easter}>
                        {artist.fullName}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Hidden mdUp>
                    <Grid item className={savedArtistStyle.icon_more}>
                      <IconButton>
                        <Image src={More} />
                      </IconButton>
                    </Grid>
                  </Hidden>
                </Grid>
              </Grid>
              <Note
                handleChangepublicNote={handleChangepublicNote}
                handleChangeprivateNote={handleChangeprivateNote}
                showPrivateNote={showPrivateNote}
                privateNote={privateNote}
                setpublicValue={setpublicValue}
                setPrivateNote={setPrivateNote}
                PrivateNoteData={PrivateNoteData}
                publicValue={publicValue}
              />
              {/* 

              </Grid> */}

              <Grid item style={{marginTop:'-15px'}}>
                <Grid container direction="column" >
                  <Grid item className={savedArtistStyle.textNote}>
                    Artworks
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className={savedArtistStyle.Box}
                  >
                    <Grid item className={savedArtistStyle.text_notAdded}>
                      No Artworks added yet
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container direction="column" >
                  <Grid item className={savedArtistStyle.textNote}>
                    Transactions
                  </Grid>
                  <Grid
                    container
                    justifyContent="center"
                    alignItems="center"
                    className={savedArtistStyle.Box}
                  >
                    <Grid item className={savedArtistStyle.text_notAdded}>
                      No transactions added yet
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item>
                <Grid container direction="column" >
                  <Grid item className={savedArtistStyle.textTimeLine}>
                    Timeline
                  </Grid>

                  {
                    artist?.artistTimeLine?.length ? (
                      <>
                        <Grid item className={savedArtistStyle.P_personImg}>
                          <Avatar style={{ height: "60px", width: "60px" }}>
                            <img src={BASE_Image_Url + Cookies.get("USER_PROFILE")} />
                          </Avatar>
                        </Grid>
                        <Grid item className={savedArtistStyle.P_contactCreated}>
                          <Grid container direction="column" spacing={2}>
                            {artist?.artistTimeLine?.map((line) => (
                              <ContactCreatedList data={line} />
                            ))}
                          </Grid>
                        </Grid>
                      </>
                    ) : (
                      <Grid
                        container
                        justifyContent="center"
                        alignItems="center"
                        className={savedArtistStyle.Box}
                      >
                        <Grid item className={savedArtistStyle.text_notAdded}>
                          No timeline available
                        </Grid>
                      </Grid>
                    )
                  }
                </Grid>
              </Grid>

            </Grid>
          </Grid>
          <Info
            Data={UserDetail}
            artist={artist}
            handleSaveArtist={handleSaveArtist}
            handleArchiveArtist={handleArchiveArtist}
          />
        </Grid>
    </Grid >
  );
}

export default withAuth(SavedArtist);

// #eef0f382
