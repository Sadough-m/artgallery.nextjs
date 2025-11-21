import React, { useState } from "react";
import Joi from "joi";
import { ToastContainer, toast } from "react-toastify";
import Image from "next/image";

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
import CustomSelect from "../../Forms/CustomSelect";
import Date from "../../Forms/Date";
import RemoveImg from "../../../public/images/remove img Modal.png";
import styles from "../../../styles/Home.module.css";

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

export default function RemoveCv({
  openModal,
  handleCloseModal,
  handleDeleteItem,
}) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid item>
          <Modal
            className={ArtistStyle.Modal}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openModal}
            onClose={handleCloseModal}
            closeAfterTransition
            BackdropProps={{
              timeout: 500,
            }}
          >
            <Fade in={openModal}>
              <Grid item className={ArtistStyle.P_Bg_ModalCV}>
                <Container>
                  <Grid
                    item
                    className={`${ArtistStyle.Bg_Modal1} ${ArtistStyle.mtb_10}`}
                  >
                    <Grid item className={ArtistStyle.wrapperModal}>
                      <Grid
                        container
                        justifyContent="space-between"
                        style={{ paddingTop: "7px" }}
                      >
                        <Grid item>
                          <Image src={RemoveImg} />
                        </Grid>
                        <Grid item>
                          <IconButton
                            className={ArtistStyle.IconClose}
                            onClick={() => handleCloseModal()}
                          >
                            <CloseIcon color="secondary" fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>

                      <Grid
                        container
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Grid item className={ArtistStyle.P_title1}>
                          <Grid
                            container
                            alignItems="center"
                            spacing={2}
                            className={ArtistStyle.cv_txt}
                          >
                            <Grid item className={ArtistStyle.Text_titleModal2}>
                              Are you sure you want to remove
                              <br /> this item ?
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid
                        item
                        container
                        align="center"
                        style={{
                          display: "-webkit-box",
                        }}
                      >
                        
                        <Grid item xs={12} className="w_100">
                          <Button
                            onClick={() => handleDeleteItem()}
                            variant="contained"
                            color="primary"
                            className={ArtistStyle.Button_Remove_Modal}
                          >
                            yes
                          </Button>
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
