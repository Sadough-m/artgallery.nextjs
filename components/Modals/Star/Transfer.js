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

export default function Transfer({ open, handleModal }) {
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
          <Grid item className={Style.wrapper_modal440}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={Style.TitleModal}>
                Transfer info
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
              <Grid item className={Style.TrsFrom}>
                Transfered from :
              </Grid>
              <Grid item className="posRel">
                <Grid
                  container
                  justifyContent="space-between"
                  className={Style.P_CodeValue}
                >
                  <Grid item className={Style.Code}>
                    Code
                  </Grid>
                  <Grid item className={Style.ValueCode}>
                    Value is here
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  className={Style.P_CodeValue}
                >
                  <Grid item className={Style.Code}>
                    Date
                  </Grid>
                  <Grid item className={Style.ValueCode}>
                    Value is here
                  </Grid>
                </Grid>
                <Grid
                  container
                  justifyContent="space-between"
                  className={Style.P_CodeValue}
                >
                  <Grid item className={Style.Code}>
                    Transfer type
                  </Grid>
                  <Grid item className={Style.ValueCode}>
                    Value is here
                  </Grid>
                </Grid>
                <span className={Style.LineFake}></span>
              </Grid>

              <Grid item className={Style.TrsFrom_1}>
                Transfered to :
              </Grid>

              <Grid
                container
                justifyContent="space-between"
                className={Style.P_CodeValue_1}
              >
                <Grid item className={Style.Code}>
                  Code
                </Grid>
                <Grid item className={Style.ValueCode}>
                  Value is here
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
