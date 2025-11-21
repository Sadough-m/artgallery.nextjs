import React, { useState, useEffect } from "react";
import Image from "next/image";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

// gm : Styles ↓
import Style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import ImagePng from "../../../public/images/Proof Img.png";

// gm : components ↓
import ImgProof from "../../Screens/Star/Artwork/ImgProof";
import ImgProofModal from "../../Screens/Star/Artwork/ImgProofModal";

export default function Proof({ open, handleModal }) {
  // gm : states ↓

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={Style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={Style.wrapper_modal460MobileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={Style.TitleModal}>
                Proof
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={Style.border_btn}
                  onClick={handleModal}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
            <Grid item className={Style.bodyModal}>
              <Grid
                container
                justifyContent="space-between"
                className={Style.P_Title}
              >
                <Grid item className={Style.ProofTitle}>
                  Title
                </Grid>
                <Grid item className={Style.ProofDesk}>
                  Proof title is here to see
                </Grid>
              </Grid>
              <Grid
                container
                alignItems="center"
                className={Style.P_Description}
              >
                <Grid item className={Style.Description}>
                  Description
                </Grid>
                <Grid item className={Style.Description_Dummy}>
                  Lorem ipsum dolor sit amet, ctetur apiscing elit. Volutpat,
                  arcu nec risus consequat urna nunc elit. Blandit sollicitudin
                  non augue morbi.{" "}
                </Grid>
              </Grid>
              <Grid container className={Style.P_ProofImages}>
                <ImgProofModal />
                <ImgProofModal />
                <ImgProofModal  NotSuported={true}/>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item >
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={Style.buttonModal}
              >
                Done
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
