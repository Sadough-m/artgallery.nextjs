import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import { StylesContext } from "@material-ui/styles";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";

// gm : styles ↓
import style from "../../../styles/Home.module.css";

// gm : files ↓
import archivePng from "../../../public/images/remove img Modal.png";
import closeIcon from "../../../public/images/icons/Close12.svg";

// gm : components ↓


export default function RemoveLocation({ RemoveLocation2, open, handleModal }) {
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
              <Grid item className={style.fitPic}>
                <img src={archivePng.src} />
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
              Are you sure you want to Remove the
              <Hidden xsDown>
                <br />
              </Hidden>{" "}
              location?
            </Grid>

            {/* footer */}
            <Grid item className={style.p_buttonModal}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                onClick={() => RemoveLocation2()}
                className={style.buttonModal}
              >
                Yes, Remove
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
