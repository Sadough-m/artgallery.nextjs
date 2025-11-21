import React, { useState } from "react";

// Matrial
import { Grid, Button, IconButton, Container, Hidden } from "@material-ui/core";

// Style
import ArtWorkFlowStyle from "../../styles/artworkflow.module.css";
import styles from "../../styles/Home.module.css";

// Image
import Image from "next/image";
import arrowLeft from "../../public/images/icons/Arrow left -1.svg";

// Component

import HeaderLanding from "../../components/common/header";
import Media from "../../components/Screens/ArtWork/Main/Media";
import Measurment from "../../components/Screens/ArtWork/Main/Measurment";
import Proof from "../../components/Screens/ArtWork/Main/Proof";
import Availibility from "../../components/Screens/ArtWork/Main/Availibility";
import ArtWorkV1 from "../../components/Modals/ArtWork/ArtWorkV1";
import IconBar from "../../components/Screens/ArtWork/IconBar";
import Minting from "../../components/Screens/ArtWork/Mint/Minting";
import Authenticity from "../../components/Screens/ArtWork/Authenticity";
import PrivacyContainer from "../../components/Screens/ArtWork/PrivacyContainer";
import ArtiverseNetwrok from "../../components/Screens/ArtWork/ArtiverseNetwrok";
import LimittedEditions from "../../components/Screens/ArtWork/LimittedEdition";
import HeaderAddArtMobile from "../../components/Screens/ArtWork/HeaderAddArt_Mobile";
import MobileEdition from "../../components/Screens/ArtWork/LimittedEdition/MobileEdition";

export default function SaveLimitted() {
  const [openModal, setOpenModal] = useState(false);
  const [modal, setModal] = useState(false);

  const handleModal = () => {
    setModal(!modal);
  };
  
  return (
    <>
      <Hidden smDown>
        <HeaderLanding />
      </Hidden>
      <Container className={`${ArtWorkFlowStyle.m__top} ${styles.mb_100}`}>
        <Grid container justifyContent="center">
          <Grid item md={3} sm={12} xs={12}>
            <Grid
              container
              alignItems="flex-start"
              justifyContent="flex-start"
              className={ArtWorkFlowStyle.h100}
            >
              <HeaderAddArtMobile handleModal={handleModal} />
              <MobileEdition />
              <Hidden smDown>
                <Grid item className={ArtWorkFlowStyle.h100}>
                  <Grid
                    container
                    direction="column"
                    justifyContent="flex-start"
                    className={ArtWorkFlowStyle.h100}
                  >
                    <Grid item>
                      <Grid container align="center" spacing={1}>
                        <Grid item className={ArtWorkFlowStyle.iconBack}>
                          <IconButton size="small">
                            <Image src={arrowLeft} />
                          </IconButton>
                        </Grid>
                        <Grid item className={ArtWorkFlowStyle.addArtworkText}>
                          Black Swan - Master
                        </Grid>
                      </Grid>
                    </Grid>

                    {/* desktop */}
                    <LimittedEditions />
                  </Grid>
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
          <Grid item md={5} sm={12} xs={12}>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
            ></Grid>

            {/* ------------------------------ Components ---------------------------------                */}
            <Grid
              container
              spacing={4}
              className={ArtWorkFlowStyle.components1}
              direction="column"
            >
              <Media />
              <Measurment />
              <Proof />
              <Availibility />

              {/* <Grid item>
                <MoreEdition />
              </Grid> */}
            </Grid>
          </Grid>
          <Grid
            item
            md={3}
            sm={12}
            xs={12}
            className={ArtWorkFlowStyle.menu_right}
          >
            <Grid
              container
              direction="column"
              spacing={4}
              className={ArtWorkFlowStyle.h100}
            >
              <IconBar />
              <Grid item>
                <Minting />
              </Grid>
              <Grid item>
                <Authenticity />
              </Grid>
              <Grid item>
                <PrivacyContainer />
              </Grid>
              <Grid item>
                <ArtiverseNetwrok />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <ArtWorkV1 openModal={modal} handleModal={handleModal} />
    </>
  );
}
