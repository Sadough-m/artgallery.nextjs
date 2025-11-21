import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";


// mrx : setCookies with this
import Cookies from "js-cookie";

// Matrial
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  IconButton,
  Button,
  Container,
  Grid,
  Fade,
  Modal,
  Hidden,
  Slide,
} from "@material-ui/core";

// mrx : Styles ↓
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓
import ImgArtWork from "../../../public/images/image ArtworkModal.png";
import info from "../../../public/images/icons/Info gray.svg";
import check from "../../../public/images/icons/Check - Circle.svg";
import closeIcon from "../../../public/images/icons/Close artwork.svg";
import PicModal from "../../../public/images/pic Modal artwork.png";
import { BASE_Image_Url } from "../../../pages/api";

// mrx : context ↓
import { Context } from "../../../context/index";

// Component
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
  },
  overrides: {
    MuiButton: {
      root: {
        textTransform: "none",
      },
    },
  },
  typography: {
    fontFamily: "Poppins",
    color: "#242328",
  },
  shape: {
    borderRadius: 6,
  },
  spacing: 3,

});

export default function ArtWorkV1({
  // mrx : Props Start -------------------------------------------------------------------------------------------------
  Data,
  openModal,
  handleModal,
  start_minting_active = false,
  haveSeralPages = true,
  //  End -------------------------------------------------------------------------------------------------------------
}) {
  // mrx : context Data Start -----------------------------------------------------------------------------------------
  const {
    setSignleItemId,
    OpenMintingAfterModal,
    setOpenMintingAfterModal,
    SignleItemId,
  } = useContext(Context);
  //  End -------------------------------------------------------------------------------------------------------------

  const handleCloseAndOpenMint = () => {
    handleModal();
    setOpenMintingAfterModal(true)
    localStorage.setItem("OpenMintingAfterModal", true)
  }

  // mrx :States Start ------------------------------------------------------------------------------------------------
  const [buttonSelected, setbuttonSelected] = useState("Limited edition");
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Change Selecte Button Start --------------------------------------------------------------------------------
  const handleButtonSelected = (value) => {
    setbuttonSelected(value);
  };
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : states Start -----------------------------------------------------------------------------------------------
  const [Medias, setMedias] = useState([]);
  const [ShowingImage, setShowingImage] = useState("");
  const [SelectedData, setSelectedData] = useState([]);
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Setting Data Start -----------------------------------------------------------------------------------------
  useEffect(() => {
    setMedias(Data?.editions?.filter((item) => parseInt(item?.editionNumber) === parseInt(0))?.map((item) => item?.artworkMedias));
    setSignleItemId(Data?.editions?.filter((item) => item?.editionNumber === 0)?.map((item) => item?.id));
  }, [Data])
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Change Media and Selected Data after changing id Start ------------------------------------------------------
  useEffect(() => {
    setSelectedData(Data?.editions?.filter((item) => item?.id === SignleItemId));
    setMedias(Data?.editions?.filter((item) => item?.id === SignleItemId)?.map((item) => item?.artworkMedias));
  }, [SignleItemId])
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Set Defult Media Start -------------------------------------------------------------------------------------
  useEffect(() => {
    Medias?.map((item) => (
      item?.map((item) => setShowingImage(BASE_Image_Url + item?.fileUrl))
    ))
  }, [Medias])
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : changing the images Start ---------------------------------------------------------------------------------
  const handleChangeImage = (Image) => {
    setShowingImage(Image);
  }
  //  End -------------------------------------------------------------------------------------------------------------

  // mrx : Set defult value to the original ---------------------------------------------------------------------------
  useEffect(() => {
    handleButtonSelected(0)
  }, [])
  //  End -------------------------------------------------------------------------------------------------------------

  return (
    <ThemeProvider theme={theme}>
      {/* for desktop */}
      <Hidden xsDown>
        <Container>
          <Grid item>
            <Modal
              className={ArtWorkFlowStyle.Modal}
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openModal}
              onClose={handleModal}
              closeAfterTransition
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={openModal}>
                <Grid item className={ArtWorkFlowStyle.P_Bg_ModalArtwork}>
                  <Grid container direction="column">
                    {haveSeralPages && (
                      <Grid item className={ArtWorkFlowStyle.P_buttonsTop}>
                        <Grid container spacing={3}>
                          {
                            Data?.editions?.map((item) => (
                              <Grid item>
                                <Button
                                  variant={
                                    buttonSelected === item?.editionNumber
                                      ? "contained"
                                      : ""
                                  }
                                  color={
                                    buttonSelected === item?.editionNumber
                                      ? "secondary"
                                      : ""
                                  }
                                  className={
                                    buttonSelected !== item?.editionNumber
                                      ? ArtWorkFlowStyle.btnBgwhite
                                      : ArtWorkFlowStyle.btnSelectedTop
                                  }
                                  onClick={() => { handleButtonSelected(item?.editionNumber); setSignleItemId(item?.id) }
                                  }
                                >
                                  {item?.editionNumber === 1 ? " Original" : " Reproduction"}
                                </Button>
                              </Grid>
                            ))
                          }
                        </Grid>
                      </Grid>
                    )}
                    <Grid item className={ArtWorkFlowStyle.Bg_ModalWhite}>
                      <Grid item className={ArtWorkFlowStyle.wrapperModal1}>
                        <Grid item>
                          <Grid container justifyContent="space-between">
                            <Grid
                              item
                              xs={6}
                              className={ArtWorkFlowStyle.bgLeftSide}
                            >
                              <span className={ArtWorkFlowStyle.bg_half}></span>

                              <Grid container direction="column" spacing={9}>
                                <Grid
                                  item
                                  className={ArtWorkFlowStyle.P_button_logo}
                                >
                                  <Button
                                    className={ArtWorkFlowStyle.button_logo}
                                  >
                                    Logo
                                  </Button>
                                </Grid>
                                <Grid item>
                                  <Grid
                                    container
                                    direction="column"
                                    spacing={1}
                                  >
                                    <Grid item>
                                      <img
                                        style={{ width: "100%", height: "210px" }}
                                        src={ShowingImage}
                                        className={ArtWorkFlowStyle.imgModalArt}
                                      />
                                    </Grid>
                                    <Grid item>
                                      <Grid container spacing={3}>
                                        {
                                          Medias &&
                                          Medias[0]?.map((item) => (
                                            <Grid item>
                                              <img
                                                style={{
                                                  cursor: "pointer"
                                                }}
                                                onClick={() => handleChangeImage(BASE_Image_Url + item?.fileUrl)}
                                                src={BASE_Image_Url + item?.fileUrl}
                                                className={
                                                  ArtWorkFlowStyle.imgModalArt
                                                }
                                                width={"50px"}
                                                height={"50px"}
                                              />
                                            </Grid>
                                          ))
                                        }
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid container direction="column">
                                    <Grid
                                      item
                                      className={ArtWorkFlowStyle.P_txtAndBadge}
                                    >
                                      <Grid
                                        container
                                        spacing={2}
                                        alignItems="center"
                                      >
                                        <Grid item>
                                          <span
                                            className={
                                              ArtWorkFlowStyle.badge_green
                                            }
                                          ></span>
                                        </Grid>
                                        <Grid
                                          item
                                          className={` ${ArtWorkFlowStyle.txt_15_500}`}
                                        >
                                          {Data?.availability}
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid
                                      item
                                      className={
                                        ArtWorkFlowStyle.P_txtAndBadge1
                                      }
                                    >
                                      <Grid
                                        container
                                        justifyContent="space-between"
                                        alignItems="center"
                                      >
                                        {/* <Grid item>
                                          <Grid
                                            container
                                            spacing={2}
                                            alignItems="center"
                                          >
                                            <Grid item>
                                              <span
                                                className={
                                                  ArtWorkFlowStyle.badge_green
                                                }
                                              ></span>
                                            </Grid>
                                            <Grid
                                              item
                                              className={` ${ArtWorkFlowStyle.txt_15_500}`}
                                            >
                                              Chain info
                                            </Grid>
                                          </Grid>
                                        </Grid> */}
                                        {/* <Grid
                                          item
                                          className={
                                            ArtWorkFlowStyle.p_iconInfo
                                          }
                                        >
                                          <Image src={info} />
                                        </Grid> */}
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={6}>
                              <Grid container direction="column">
                                <Grid item>
                                  <Grid container justifyContent="flex-end">
                                    <Grid item>
                                      <IconButton
                                        className={ArtWorkFlowStyle.IconClose}
                                        onClick={() => handleModal()}
                                      >
                                        <Image src={closeIcon} />
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid
                                  item
                                  className={ArtWorkFlowStyle.P_Items_artwork}
                                >
                                  <Grid
                                    container
                                    justifyContent="center"
                                    alignItems="center"
                                    direction="column"
                                    spacing={6}
                                  >
                                    <Grid item>
                                      <Image src={ImgArtWork} />
                                    </Grid>
                                    <Grid item className={styles.fw_500}>
                                      Artwork verification
                                    </Grid>
                                    <Grid
                                      item
                                      className={ArtWorkFlowStyle.someTxt}
                                    >
                                      Lorem ipsum dolor sit amet, ctetur
                                      apiscing elit. Volutpat, arcu nec risus
                                      consequat urna nunc elit. Blandit
                                      sollicitudin non augue morbi.
                                    </Grid>

                                    <Grid
                                      item
                                      className={ArtWorkFlowStyle.P_btnartWork}
                                    >
                                      <Button
                                        onClick={() => handleCloseAndOpenMint()}
                                        fullWidth
                                        color={
                                          Data?.isProofNedded === false || Data?.isUserVerified === true
                                            ? "primary"
                                            : "default"
                                        }
                                        variant={
                                          Data?.isProofNedded === false || Data?.isUserVerified === true
                                            ? "contained"
                                            : "text"
                                        }
                                        className={
                                          Data?.isProofNedded === false || Data?.isUserVerified === true
                                            ? ArtWorkFlowStyle.btnArtWork_modal_active
                                            : ArtWorkFlowStyle.btnArtWork_modal
                                        }
                                        disabled={Data?.isProofNedded !== false || Data?.isUserVerified !== true}
                                      >
                                        {
                                          Data?.isDirectMint === false ? (
                                            <> Start Verifying </>
                                          ) : (
                                            <> Start Minting</>
                                          )
                                        }
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    {Data?.isUserVerified === false && (
                      <Grid item className={ArtWorkFlowStyle.messageDown}>
                        <Grid container alignItems="center" spacing={3}>
                          <Grid item xs={8} className={styles.fs_14}>
                            To verify, & Publish your Artwork, you have verify
                            Your identity verification is handled by{" "}
                            <a href="#" className={styles.text__Primary}>
                              Echo
                            </a>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleModal()}
                              startIcon={<Image src={check} />}
                              style={{ width: "100%" }}
                            >
                              Verify Account
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                    {Data?.isProofNedded === true && (
                      <Grid item className={ArtWorkFlowStyle.messageDown}>
                        <Grid container alignItems="center" spacing={3}>
                          <Grid item xs={8} className={styles.fs_14}>
                            since you are the secondry owner, our advisor have to verify your artwrok.{" "}
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              variant="contained"
                              color="secondary"
                              onClick={() => handleModal()}
                              startIcon={<Image src={check} />}
                              style={{ width: "100%" }}
                            >
                              Add Proof
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    )}
                  </Grid>
                </Grid>
              </Fade>
            </Modal>
          </Grid>
        </Container>
      </Hidden>

      {/* for mobile */}

      <Hidden smUp>
        <Modal
          open={openModal}
          onClick={() => handleModal()}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <Fade direction="right" in={openModal} mountOnEnter unmountOnExit>
            <Grid item className={ArtWorkFlowStyle.BoxMenu}>
              <Grid item>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={ArtWorkFlowStyle.posFixed}
                >
                  <span className={ArtWorkFlowStyle.line100_2}></span>
                  <Grid item className={ArtWorkFlowStyle.P_button_logo}>
                    <Button className={ArtWorkFlowStyle.button_logo}>
                      Logo
                    </Button>
                  </Grid>
                  <Grid item>
                    <IconButton
                      onClick={() => handleModal()}
                      className={ArtWorkFlowStyle.border_solid}
                    >
                      <Image src={closeIcon} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Grid item className={ArtWorkFlowStyle.wrapperMobileArtwork}>

                  {
                    Data?.isUserVerified === false && (
                      <Grid item className={ArtWorkFlowStyle.verifyWrapper}>
                        <Grid item className={ArtWorkFlowStyle.text_verify}>
                          To verify, & Publish your Artwork, you have verify
                          Your identity verification is handled by{" "} <a href="#" className={styles.text__Primary}>
                            Echo
                          </a>
                        </Grid>
                        <Button
                          onClick={() => handleModal()}
                          fullWidth
                          color={
                            start_minting_active
                              ? "primary"
                              : "default"
                          }
                          variant={
                            start_minting_active
                              ? "contained"
                              : "text"
                          }
                          className={ArtWorkFlowStyle.vr_button}
                          disabled={!start_minting_active}
                        >
                          Verify Account
                        </Button>
                      </Grid>
                    )
                  }
                  {
                    Data?.isProofNedded === true && (
                      <Grid item className={ArtWorkFlowStyle.verifyWrapper}>
                        <Grid item className={ArtWorkFlowStyle.text_verify}>
                          since you are the secondry owner, our advisor have to verify your artwrok.{" "}
                        </Grid>
                        <Button
                          onClick={() => handleModal()}
                          fullWidth
                          color="secondary"
                          variant="contained"
                          className={ArtWorkFlowStyle.vr_button}
                          startIcon={<img src={check.src} />}
                        >
                          Add Proof
                        </Button>
                      </Grid>
                    )
                  }

                  <Grid item className={ArtWorkFlowStyle.images_art_mobile}>
                    <Grid item className={ArtWorkFlowStyle.C_images_art_mobile}>
                      <img
                        style={{ width: "90%", height: "279px" }}
                        src={ShowingImage}
                        className={ArtWorkFlowStyle.img_artworks}
                      />
                    </Grid>
                    <Grid item className={ArtWorkFlowStyle.p_tinyImages}>
                      <Grid container spacing={3}>
                        {
                          Medias?.map((item) => (
                            <Grid item>
                              <img
                                style={{
                                  cursor: "pointer"
                                }}
                                onClick={() => handleChangeImage(BASE_Image_Url + item?.fileUrl)}
                                src={BASE_Image_Url + item?.fileUrl}
                                className={
                                  ArtWorkFlowStyle.imgModalArt
                                }
                                width={"50px"}
                                height={"50px"}
                              />
                            </Grid>
                          ))
                        }
                      </Grid>
                      <Grid item className={ArtWorkFlowStyle.availableFont}>
                        <span className={ArtWorkFlowStyle.badgeGreen}></span>{" "}
                        Available
                      </Grid>
                      {/* <Grid item className={ArtWorkFlowStyle.availableFont1}>
                        <Grid container justifyContent="space-between">
                          <Grid item>
                            <span
                              className={ArtWorkFlowStyle.badgeGreen}
                            ></span>{" "}
                            Chain info
                          </Grid>
                          <Grid item>
                            <Image src={info} />
                          </Grid>
                        </Grid>
                      </Grid> */}
                    </Grid>
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.p_imgArt}>
                    <Image src={ImgArtWork} />
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.text14}>
                    Artwork verification
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.text15}>
                    Lorem ipsum dolor sit amet, ctetur apiscing elit. Volutpat,
                    arcu nec risus consequat urna nunc elit. Blandit
                    sollicitudin non augue morbi.{" "}
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.posRel}>
                    <span className={ArtWorkFlowStyle.line_mintBtn}></span>
                    <Button
                      fullWidth
                      style={{ marginTop: "25px" }}
                      onClick={() => handleCloseAndOpenMint()}
                      color={
                        Data?.isProofNedded === false || Data?.isUserVerified === true
                          ? "primary"
                          : "default"
                      }
                      variant={
                        Data?.isProofNedded === false || Data?.isUserVerified === true
                          ? "contained"
                          : "text"
                      }
                      className={
                        Data?.isProofNedded === false || Data?.isUserVerified === true
                          ? ArtWorkFlowStyle.btnArtWork_modal_active
                          : ArtWorkFlowStyle.btnArtWork_modal
                      }
                      disabled={Data?.isProofNedded !== false || Data?.isUserVerified !== true}
                    >
                      {
                        Data?.isDirectMint === false ? (
                          <> Start Verifying </>
                        ) : (
                          <> Start Minting</>
                        )
                      }
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Fade>
        </Modal>
      </Hidden>
    </ThemeProvider>
  );
}
