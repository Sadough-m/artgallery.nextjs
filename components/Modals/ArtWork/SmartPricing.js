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
import styles from "../../../styles/Home.module.css";
import ArtWorkFlowStyle from "../../../styles/artworkflow.module.css";

// rmx : files  ↓

// Component
import Check_Box from "../../Forms/CheckBox";
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

export default function SmartPricingModal({ openModal, handleModal }) {
  // all this 6 state is for check boxes
  const [title1, setTitle1] = useState(false);
  const [title2, setTitle2] = useState(false);
  const [title3, setTitle3] = useState(false);
  const [type, setType] = useState(false);
  const [original1, setOriginal1] = useState(false);
  const [original2, setOriginal2] = useState(false);



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
              <Grid item className={ArtWorkFlowStyle.P_Bg_ModalMedia}>
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
                              Smart pricing
                            </Grid>
                            <Grid item>
                              <IconButton
                                className={ArtWorkFlowStyle.IconClose}
                                onClick={() => handleModal()}
                              >
                                <CloseIcon color="secondary" fontSize="small" />
                              </IconButton>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid
                            container
                            direction="column"
                            className={ArtWorkFlowStyle.P_text_limited}
                            spacing={1}
                          >
                            <Grid item className={ArtWorkFlowStyle.txtLimited}>
                              Limited edition - 10 piece
                            </Grid>
                            <Grid item className={ArtWorkFlowStyle.txtPayment}>
                              If you choose to receive payment from transfree,
                              transfree has to make payment before finalzing the
                              transfer.{" "}
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item>
                              <Grid container direction="column">
                                <Grid item>
                                  <CustomCheckBox label="First title is here" checked={title1} setChecked={setTitle1}/>
                                </Grid>
                                <Grid
                                  item
                                  className={ArtWorkFlowStyle.txtPayment1}
                                >
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nullam nisl molestie morbi
                                  suspendisse elit ut et.
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item>
                              <Grid container direction="column">
                                <Grid item>
                                  <CustomCheckBox label="Second title is here" checked={title2} setChecked={setTitle2} />
                                </Grid>
                                <Grid
                                  item
                                  className={ArtWorkFlowStyle.txtPayment1}
                                >
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nullam nisl molestie morbi
                                  suspendisse elit ut et.
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Grid container direction="column">
                            <Grid item>
                              <Grid container direction="column">
                                <Grid item>
                                  <CustomCheckBox label="Third title is here" checked={title3} setChecked={setTitle3} />
                                </Grid>
                                <Grid
                                  item
                                  className={ArtWorkFlowStyle.txtPayment1}
                                >
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipiscing elit. Nullam nisl molestie morbi
                                  suspendisse elit ut et.
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item>
                          <Button
                            variant="contained"
                            color="secondary"
                            fullWidth
                            className={ArtWorkFlowStyle.generate_Btn}
                          >
                            Generate
                          </Button>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.P_CheckBoxes}>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item xs={10}>
                              <CustomCheckBox label="Type" color="#A8B3BC" checked={type} setChecked={setType} />
                            </Grid>
                            <Grid item className={styles.fontGray} xs={2}>
                              Price
                            </Grid>
                          </Grid>
                          <span className={ArtWorkFlowStyle.borderBot}></span>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.P_CheckBoxes}>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item>
                              <CustomCheckBox label="Original" checked={original1} setChecked={setOriginal1} />
                            </Grid>
                            <Grid item>$650.00</Grid>
                          </Grid>
                          <span className={ArtWorkFlowStyle.borderBot}></span>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.P_CheckBoxes}>
                          <Grid
                            container
                            justifyContent="space-between"
                            alignItems="center"
                          >
                            <Grid item>
                              <CustomCheckBox label="Original" checked={original2} setChecked={setOriginal2} />
                            </Grid>
                            <Grid item>$650.00</Grid>
                          </Grid>
                        </Grid>
                        <Grid item>
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            className={`${ArtWorkFlowStyle.Button_Add_Artist1} `}
                          >
                            Save
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
