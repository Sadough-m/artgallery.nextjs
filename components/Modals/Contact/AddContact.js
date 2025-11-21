import React, { useEffect, useState } from "react";
import Joi from "joi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// MATERIAL UI
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

// components
import ArtistStyle from "../../../styles/artist.module.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import InputForm from "../../Forms/InputForm";
import ModalFoundArtist from "../FoundArtist";
import AddedArtist from "../AddedArtist";
import NotFoundArtist from "../NotFoundArtist";
import loadingPic from "../../../public/images/icons/Loading.svg";
import Image from "next/image";
import styles from "../../../styles/Home.module.css";

import CustomCheckBox from "../../Forms/CustomCheckBox";

// mrx : api links ↓
import {
  SEARCH_CONTACT_FOR_ADD_IN_COLLECTION,
  ADD_ARTIST_WITH_NO_CV,
} from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PutAuthUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

const theme = createTheme({
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  palette: {
    primary: {
      main: "#3772FF",
    },
    secondary: {
      main: "#242328",
    },
    error: {
      main: "#A6E9DE",
    },
  },
  typography: {
    button: {
      fontFamily: "Poppins",
      textTransform: "none",
    },
  },
});

export default function ModalAddArtist({ open, handleModal, onAddArtist }) {
  const router = useRouter();

  const schema = {
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .messages({
        "string.empty": ``,
        "string.email": `Enter a vaild email`,
        "string.base": ``,
      }),
  };

  //rs: states
  const [search, setSearch] = useState("");
  const [addedArtist, setAddArtist] = useState();
  const [ArtistList, setArtistList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foundArtists, setFoundArtists] = useState();
  const [timer, setTimer] = useState();
  const [Searching, setSearching] = useState(false);

  const [IsArtistLive, setIsArtistLive] = useState(true);

  // handle add artist to added artist state - set found to null ---------------------------------------------------------------
  const addArtist = (id) => {
    setAddArtist(() => {
      const artist = foundArtists.filter((artist) => artist.id === id);
      return artist[0];
    });
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : get collection ID frm local -----------------------------------------------------------------------------------------
  const CollectionID =
    typeof window !== "undefined"
      ? localStorage.getItem("collectionId") || ""
      : "";
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : remove artist list --------------------------------------------------------------------------------------------------
  const removeItem = () => {
    setArtistList([]);
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Change is alive ) ---------------------------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("Adding-Artist-CV-Artist-Alive", IsArtistLive);
  }, [IsArtistLive]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : Change is alive ) ---------------------------------------------------------------------------------------------------
  useEffect(() => {
    localStorage.setItem("Adding-Artist-CV-Artist-Alive", true);
  }, []);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : handle earese the search input --------------------------------------------------------------------------------------
  useEffect(() => {
    if (Searching === false) {
      setSearch("");
    }
  }, [Searching]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : tell user what is doing ---------------------------------------------------------------------------------------------
  useEffect(() => {
    if (ArtistList?.length === 1) {
      // toast.info("Artist Added");
    } else {
      localStorage.removeItem("Adding-Artist-email");
      localStorage.removeItem("Adding-Artist-firstName");
      localStorage.removeItem("Adding-Artist-lastName");
      localStorage.removeItem("Adding-Search-UserID");
      localStorage.removeItem("Adding-Artist-HaveEmail");
    }
  }, [ArtistList]);
  // End -----------------------------------------------------------------------------------------------------------------------

  const validateEmail = () => {
    return String(search)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  //rs : search for artist -----------------------------------------------------------------------------------------------------
  const handleSearch = (signal) => {
    setSearching(true);
    if (search)
      GetAuthUrl(
        SEARCH_CONTACT_FOR_ADD_IN_COLLECTION(CollectionID, search)
      ).then((res, err) => {
        setLoading(false);
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setFoundArtists(res?.data?.data);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
        if (err) {
          toast.error("error");
        }
      });
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // abort calling search api if user type continously and if component unmounts -----------------------------------------------
  useEffect(() => {
    setLoading(true);
    setAddArtist();
    const controller = new AbortController();
    const signal = controller.signal;
    if (search.trim()) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        if (validateEmail(search) !== null) {
          handleSearch(signal);
        }
      }, 500);
      setTimer(newTimer);
    } else {
      // setFoundArtists()
    }
    return () => {
      controller.abort();
    };
  }, [search]);
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : add artist with out cv ----------------------------------------------------------------------------------------------
  const handleAddContact = () => {
    router.push("/contact/add");
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid item>
          <Modal
            className={ArtistStyle.Modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleModal}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={open}>
              <Grid item className={ArtistStyle.P_Bg_ModalBio}>
                <Container>
                  <Grid item className={ArtistStyle.Bg_Modal}>
                    <Grid item className={ArtistStyle.wrapperModal}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item className={ArtistStyle.Text_AddArtist}>
                          Add contact
                        </Grid>
                        <Grid item>
                          <IconButton
                            className={ArtistStyle.IconClose}
                            onClick={() => handleModal()}
                          >
                            <CloseIcon color="secondary" fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <div className="posRel">
                        <Grid item xs={12}>
                          <InputForm
                            type="email"
                            placeHolder="Enter contact email address"
                            label="Email address "
                            value={search}
                            setValue={setSearch}
                            schema={schema?.email}
                          >
                            {loading && (
                              <Grid item className={styles.imageInsideForm}>
                                <Image
                                  src={loadingPic}
                                  width={"20px"}
                                  height={"20px"}
                                  className={styles.rotateAnim}
                                />
                              </Grid>
                            )}
                          </InputForm>
                        </Grid>
                        <Grid
                          style={{ marginTop: 10 }}
                          className={
                            Searching
                              ? ArtistStyle.MaiItemInModal
                              : ArtistStyle.MaiItemInModal_2
                          }
                        >
                          {Searching === true &&
                            foundArtists?.map((artist, index) => {
                              if (artist?.email) {
                                return (
                                  <ModalFoundArtist
                                    setSearching={setSearching}
                                    Search={true}
                                    setArtistList={setArtistList}
                                    key={artist.id}
                                    Item={artist}
                                    firstName={artist?.firstName}
                                    lastName={artist?.lastName}
                                    id={artist.id}
                                    email={artist.email}
                                    userArtworkImage={artist.userArtworkImage}
                                    profileImage={artist.displayImage}
                                    onClick={addArtist}
                                  />
                                );
                              } else {
                                return (
                                  <AddedArtist
                                    setSearching={setSearching}
                                    Search={true}
                                    setArtistList={setArtistList}
                                    id={artist.id}
                                    onClick={addArtist}
                                    DisplayImage={artist.displayImage}
                                    firstName={artist?.firstName}
                                    lastName={artist?.lastName}
                                  />
                                );
                              }
                            })}
                          {foundArtists?.length === 0 && !addedArtist && (
                            <NotFoundArtist />
                          )}

                          {ArtistList &&
                            ArtistList?.map((item) => (
                              <Grid item style={{ marginBottom: "20px" }}>
                                <AddedArtist
                                  setSearching={setSearching}
                                  Search={false}
                                  setArtistList={setArtistList}
                                  removeItem={removeItem}
                                  onClick={addArtist}
                                  firstName={item?.firstName}
                                  lastName={item?.lastName}
                                  DisplayImage={item?.displayImage}
                                />
                              </Grid>
                            ))}
                        </Grid>
                      </div>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          className={ArtistStyle.Button_Add_Artist}
                          onClick={() => handleAddContact()}
                        >
                          Add Contact
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </Container>
              </Grid>
            </Fade>
          </Modal>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
