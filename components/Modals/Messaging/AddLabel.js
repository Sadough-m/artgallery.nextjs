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
import InputForm from "../../Forms/InputForm";
import Colors from "../../Screens/Messaging/Colors";

export default function AddLabel({ open, handleModal }) {
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
              Lable settings
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
              <InputForm label="Title" placeHolder="Enter contact email address"/>
              <Colors/>
            </Grid>

            {/* footer */}
            <Grid item style={{marginTop:32}}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={Style.buttonModal}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
