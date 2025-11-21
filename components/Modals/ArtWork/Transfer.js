import React, { useState } from "react";

// Matrial
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import {
  Container,
  IconButton,
  Button,
  Grid,
  Fade,
  Modal,
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

// mrx : Styles ↓
import ArtistStyle from "../../../styles/artist.module.css";
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓

// Component
import InputForm from "../../Forms/InputForm";
import Check_Box from "../../Forms/CheckBox";
import CustomSelect from "../../Forms/CustomSelect";
import CustomCheckBox from "../../Forms/CustomCheckBox";

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
    borderRadius: 8,
  },
});

const OptionList = [
  { id: 1, name: "View all" },
  { id: 2, name: "HIdden all" },
  { id: 3, name: "For owners" },
];

export default function TransferModal({ openModal, handleModal }) {
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Grid item>
          <Modal
            className={ArtistStyle.Modal}
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
              <Grid item className={ArtistStyle.P_Bg_ModalMedia}>
                <Grid item className={ArtistStyle.Bg_ModalWhite}>
                  <Grid item className={ArtistStyle.wrapperModal}>
                    <Grid item>
                      <Grid container direction="column" spacing={3}>
                        <Grid item>
                          <Grid item>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item className={ArtistStyle.Text_AddArtist}>
                                Transfer artwork
                              </Grid>
                              <Grid item>
                                <IconButton
                                  className={ArtistStyle.IconClose}
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
                          <Grid item xs={12}>
                            <CustomSelect
                              label="Transfer type"
                              placeHolder="Choose One"
                              OptionList={OptionList}
                              bgColor="#F7F8FA"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <InputForm
                              type="text"
                              placeHolder="Enter contact email address, phone number or name"
                              label="Email address, Phone number or Name"
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <span className={ArtWorkFlowStyle.line100}></span>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={`${ArtWorkFlowStyle.some_p_r} ${ArtWorkFlowStyle.mt_10}`}
                          >
                            <CustomCheckBox label="This transfer has financial info" />
                          </Grid>
                          <Grid item xs={12}>
                            <Grid
                              container
                              justifyContent="space-between"
                              alignItems="center"
                            >
                              <Grid item className={ArtWorkFlowStyle.form5}>
                                <InputForm
                                  type="number"
                                  placeHolder="Enter a number"
                                  label="Amount"
                                />
                              </Grid>
                              <Grid item className={ArtWorkFlowStyle.form3}>
                                <CustomSelect
                                  label="Unit"
                                  placeHolder="Choose One"
                                  OptionList={OptionList}
                                  bgColor="#F7F8FA"
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={ArtWorkFlowStyle.some_p_r}
                          >
                            <CustomCheckBox label="Recieve payment" />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={ArtWorkFlowStyle.txt_choose}
                          >
                            If you choose to receive payment from transfree,
                            transfree has to make payment before finalzing the
                            transfer.
                          </Grid>
                          <Grid item xs={12}>
                            <span className={ArtWorkFlowStyle.line100}></span>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={`${ArtWorkFlowStyle.some_p_r} ${ArtWorkFlowStyle.mt_10}`}
                          >
                            <CustomCheckBox label="This transfer has shipping" />
                          </Grid>
                          <Grid item xs={12}>
                            <CustomSelect
                              label="Shipping info"
                              placeHolder="Choose One"
                              OptionList={OptionList}
                              bgColor="#F7F8FA"
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            className={`${styles.fs_14} ${styles.mt_10}`}
                          >
                            Self service tracking
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={`${ArtistStyle.Button_Add_Artist1} `}
                          >
                            <span className={ArtistStyle.text_None}>
                              Transfer
                            </span>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Fade>
          </Modal>
        </Grid>
      </Container>
    </ThemeProvider>
  );
}
