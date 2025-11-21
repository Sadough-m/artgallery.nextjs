import React, { useState, useEffect } from "react";

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

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import InfoSvg from "../../../public/images/icons/Info.svg";

// gm : components ↓

export default function IdentityVerification({ open, handleModal }) {
  // gm : states ↓

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={style.wrapper_modal440}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
              Identity verification
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={style.border_btn}
                  onClick={handleModal}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
            <Grid item className={style.bodyModal}>
              <Grid container alignItems="center" className={style.BG_InfoGray}>
                <Grid item className={style.P_InfoSvg}>
                  <img src={InfoSvg.src} className={style.InfoSvg} />
                </Grid>
                {/* Note: You must change the text , i havent access in figma to copy that */}
                <Grid item className={style.Desk_shipping}>
                  This will create an order. Mark this order as pending payment
                  if you will receive $226.90 outside of Artiverse.
                </Grid>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
              >
                Proceed
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
