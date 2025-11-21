import React, { useEffect, useState } from "react";
import Joi from "joi";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";

// MATERIAL UI
import Modal from "@material-ui/core/Modal";
import Fade from "@material-ui/core/Fade";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { ClickAwayListener, IconButton } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";

// components
import ArtistStyle from "../../styles/artist.module.css";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import InputForm from "../Forms/InputForm";
import ModalFoundArtist from "./FoundArtist";
import AddedArtist from "./AddedArtist";
import NotFoundArtist from "./NotFoundArtist";
import loadingPic from "../../public/images/icons/Loading.svg";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

import CustomCheckBox from "../Forms/CustomCheckBox";

// mrx : api links ↓
import {
  SEARCH_ARTIST,
  ADD_ARTIST_WITH_NO_CV,
  BASE_Image_Url,
} from "../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PutAuthUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../pages/api/config";



export default function ModalAddArtist({
  openModal,
  handleModal,
  onAddArtist,
}) {
  const router = useRouter();

  //rs: states
  const [search, setSearch] = useState("");
  const [addedArtist, setAddArtist] = useState([]);
  const [ArtistList, setArtistList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [foundArtists, setFoundArtists] = useState();
  const [timer, setTimer] = useState();
  const [Searching, setSearching] = useState(false);
  const [Focus, setFocus] = useState(true);
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
      ? localStorage.getItem("collectionId") || "[]"
      : "[]";
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
      localStorage.removeItem("Adding-Search-UserID");
      localStorage.removeItem("Adding-Artist-lastName");
      localStorage.removeItem("Adding-Artist-HaveEmail");
    }
  }, [ArtistList]);
  // End -----------------------------------------------------------------------------------------------------------------------

  //rs : search for artist -----------------------------------------------------------------------------------------------------
  const handleSearch = (signal) => {
    setSearching(true);
    GetUrl(SEARCH_ARTIST + "/" + search, { signal: signal }).then(
      (res, err) => {
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
      }
    );
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // abort calling search api if user type continously and if component unmounts -----------------------------------------------
  useEffect(() => {
    setLoading(true);
    setAddArtist([]);
    const controller = new AbortController();
    const signal = controller.signal;
    if (search.trim()) {
      clearTimeout(timer);
      const newTimer = setTimeout(() => {
        handleSearch(signal);
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
  const handleAddArtist = () => {
    if (ArtistList?.length < 1) {
      toast.error("First add an artist");
    } else {
      //rs : search for artist -----------------------------------------------------------------------------------------------------
      GetAuthUrl(ADD_ARTIST_WITH_NO_CV(ArtistList[0]?.id, CollectionID)).then(
        (res, err) => {
          setLoading(false);
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {
              if (res?.data?.message === "User already in the collection") {
                toast.warning(res?.data?.message);
              } else {
                location.reload();
              }
            } else {
              toast.error(res?.data?.message);
            }
          } else {
            toast.error("something went wrong !");
          }
          if (err) {
            toast.error("error");
          }
        }
      );
      // End -----------------------------------------------------------------------------------------------------------------------
    }
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  // mrx : add artist with Cv --------------------------------------------------------------------------------------------------
  const CreateCV = () => {
    router.push("/artist/add");
  };
  // End -----------------------------------------------------------------------------------------------------------------------

  return (
      <Container>
        <Grid item>
          <Modal
            className={ArtistStyle.Modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            // onClose={handleModal}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Grid item className={ArtistStyle.P_Bg_ModalBio}>
                <Container>
                  <Grid item className={ArtistStyle.Bg_Modal_3}>
                    <Grid item className={ArtistStyle.wrapperModal}>
                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item className={ArtistStyle.Text_AddArtist}>
                          Add artist
                        </Grid>
                        <Grid item>
                          <IconButton
                            className={ArtistStyle.IconClose}
                            onClick={() => {
                              handleModal();
                              setFoundArtists([]);
                              setAddArtist([]);
                              setArtistList([]);
                              setSearch("");
                            }}
                          >
                            <CloseIcon color="secondary" fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                      <ClickAwayListener onClickAway={() => setFocus(false)}>
                        <div className="posRel">
                          <Grid item xs={12} onClick={() => setFocus(true)}>
                            <InputForm
                              type="text"
                              placeHolder="Enter artist email, phone number or name"
                              label="Name or Email "
                              value={search}
                              setValue={setSearch}
                              schema={Joi.optional()}
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
                            style={{ marginTop: 5 }}
                            className={ArtistStyle.MaiItemInModal_2}
                          >
                            {ArtistList &&
                              ArtistList?.map((item) => (
                                <Grid item style={{ marginBottom: "10px" }}>
                                  <AddedArtist
                                    setSearching={setSearching}
                                    Search={false}
                                    setArtistList={setArtistList}
                                    removeItem={removeItem}
                                    onClick={addArtist}
                                    firstName={item?.firstName}
                                    lastName={item?.lastName}
                                  />
                                </Grid>
                              ))}
                          </Grid>

                          <Grid
                            style={{ marginTop: 11 }}
                            className={ArtistStyle.MaiItemInModal}
                          >
                            {Focus &&
                              Searching === true &&
                              foundArtists?.map((artist, index) => {
                                if (artist?.email) {
                                  return (
                                    <ModalFoundArtist
                                      setSearching={setSearching}
                                      Search={true}
                                      setArtistList={setArtistList}
                                      key={artist.id}
                                      firstName={artist?.firstName}
                                      lastName={artist?.lastName}
                                      id={artist.id}
                                      email={artist.email}
                                      userArtworkImage={artist.userArtworkImage}
                                      profileImage={
                                        BASE_Image_Url + artist.profileImage
                                      }
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
                                      firstName={artist?.firstName}
                                      lastName={artist?.lastName}
                                    />
                                  );
                                }
                              })}
                            {Focus &&
                              foundArtists?.length === 0 &&
                              <NotFoundArtist />}
                          </Grid>

                          
                        </div>
                      </ClickAwayListener>
                      <Grid item style={{ marginTop: "0px" }}>
                        <CustomCheckBox
                          setChecked={setIsArtistLive}
                          checked={IsArtistLive}
                          label="Artist is alive"
                        />
                      </Grid>
                      <Grid item style={{ marginTop: "20px" }}>
                        <Button
                          onClick={() => CreateCV()}
                          className={ArtistStyle.buttonCreateCv}
                        >
                          Create a cv and add to collection
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          className={ArtistStyle.Button_Add_Artist}
                          onClick={() => handleAddArtist()}
                        >
                          Add to collection
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
  );
}
