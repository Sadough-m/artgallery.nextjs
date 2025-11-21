import React, { useState } from "react";

// Matrial
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  IconButton,
  Button,
  Container,
  Grid,
  Fade,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓
import Image from "next/image";
import lock from "../../../public/images/icons/lock with bg.png";
import AudioPic from "../../../public/images/icons/audio png.png";
import Upload from "../../../public/images/icons/upload.svg";
import ImgEmpty from "../../../public/images/icons/img empty.png";

// Component
import Img from "../../Screens/ArtWork/AddFile/Img";

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
    tertiary: {
      main: "#F7F8FA",
    },
  },
  typography: {
    button: {
      fontFamily: "Poppins",
      textTransform: "none",
    },
  },
});

export default function ModalMedia({ openModal, handleModal }) {
  const disabled = true;
  const [selectButton, setSelectButton] = useState("");
  const handleSelectBtn = (value) => {
    setSelectButton(value);
  };
  const SelectedBtn = (value) => {
    if (value !== selectButton) {
      return ArtWorkFlowStyle.btnMediaModal;
    } else return "";
  };
  return (
    <ThemeProvider theme={theme}>
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
              <Grid item className={ArtWorkFlowStyle.P_Bg_ModalMedia1}>
                <Container>
                  <Grid item className={ArtWorkFlowStyle.Bg_ModalWhite}>
                    <Grid item className={ArtWorkFlowStyle.wrapperModal}>
                      <Grid item>
                        <Grid container direction="column" spacing={3}>
                          <Grid item>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid
                                item
                                className={ArtWorkFlowStyle.Text_AddArtist}
                              >
                                Media
                              </Grid>
                              <Grid item>
                                <IconButton
                                  className={ArtWorkFlowStyle.IconClose}
                                  onClick={() => handleModal()}
                                >
                                  <CloseIcon
                                    color="secondary"
                                    fontSize="small"
                                  />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              justifyContent="flex-start"
                              spacing={1}
                            >
                              <Img uploading={true} />
                              <Img />
                              <Img />
                              <Img />
                              <Img />
                              <Img />
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid container justifyContent="center" spacing={1}>
                              <Grid item>
                                <Button
                                  variant={
                                    selectButton === "Marketplace 01"
                                      ? "contained"
                                      : "text"
                                  }
                                  color="secondary"
                                  className={SelectedBtn("Marketplace 01")}
                                  onClick={() =>
                                    handleSelectBtn("Marketplace 01")
                                  }
                                >
                                  <span
                                    className={`${ArtWorkFlowStyle.text_None} ${ArtWorkFlowStyle.fw_400}`}
                                  >
                                    Marketplace 01
                                  </span>
                                </Button>
                              </Grid>
                              <Grid item>
                                <Button
                                  variant={
                                    selectButton === "Marketplace 02"
                                      ? "contained"
                                      : "text"
                                  }
                                  color="secondary"
                                  className={SelectedBtn("Marketplace 02")}
                                  onClick={() =>
                                    handleSelectBtn("Marketplace 02")
                                  }
                                >
                                  <span
                                    className={`${ArtWorkFlowStyle.text_None} ${ArtWorkFlowStyle.fw_400}`}
                                  >
                                    Marketplace 02
                                  </span>
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              justifyContent="center"
                              className={ArtWorkFlowStyle.text_drag}
                            >
                              Drag pictures from &nbsp;
                              <span style={{ color: "#242328" }} y>
                                {" "}
                                Medias{" "}
                              </span>
                              &nbsp; to any of the placement bellow.
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Grid
                              container
                              className={ArtWorkFlowStyle.p_oploadImg}
                              justifyContent="space-between"
                            >
                              <Grid item>
                                <Grid
                                  container
                                  direction="column"
                                  spacing={2}
                                  justifyContent="flex-start"
                                >
                                  <Grid
                                    item
                                    className={ArtWorkFlowStyle.title_img}
                                  >
                                    Thumbnail
                                  </Grid>
                                  <Grid item>
                                    <Grid container spacing={1}>
                                      <Grid
                                        item
                                        className={ArtWorkFlowStyle.ParentUp}
                                      >
                                        <Image src={ImgEmpty} />
                                        <Grid
                                          item
                                          className={ArtWorkFlowStyle.uploadImg}
                                        >
                                          <Image src={Upload} />
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  direction="column"
                                  spacing={2}
                                  justifyContent="flex-start"
                                >
                                  <Grid
                                    item
                                    className={ArtWorkFlowStyle.title_img}
                                  >
                                    Slider
                                  </Grid>
                                  <Grid item>
                                    <Grid container spacing={2}>
                                      <Grid
                                        item
                                        className={ArtWorkFlowStyle.ParentUp}
                                      >
                                        <Image src={ImgEmpty} />
                                        <Grid
                                          item
                                          className={ArtWorkFlowStyle.uploadImg}
                                        >
                                          <Image src={Upload} />
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        className={ArtWorkFlowStyle.ParentUp}
                                      >
                                        <Image src={ImgEmpty} />
                                        <Grid
                                          item
                                          className={ArtWorkFlowStyle.uploadImg}
                                        >
                                          <Image src={Upload} />
                                        </Grid>
                                      </Grid>
                                      <Grid
                                        item
                                        className={ArtWorkFlowStyle.ParentUp}
                                      >
                                        <Img center={true}/>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid
                                  container
                                  direction="column"
                                  spacing={2}
                                  justifyContent="flex-start"
                                >
                                  <Grid
                                    item
                                    className={ArtWorkFlowStyle.title_img}
                                  >
                                    Audio
                                  </Grid>
                                  <Grid item>
                                    <Grid container spacing={1}>
                                      <Grid
                                        item
                                        className={ArtWorkFlowStyle.ParentUp}
                                      >
                                        <Img center={false} />
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid item>
                            <Button
                              fullWidth
                              variant="contained"
                              color="primary"
                              className={
                                !disabled
                                  ? ArtWorkFlowStyle.Button_Add_Artist
                                  : ArtWorkFlowStyle.btnDeactive
                              }
                              disabled={disabled}
                            >
                              Save Changes
                            </Button>
                          </Grid>
                        </Grid>
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
