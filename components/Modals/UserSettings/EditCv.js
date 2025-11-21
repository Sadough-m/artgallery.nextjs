import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

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
import InputForm from "../../Forms/InputForm";
import Date from "../../Forms/Date";
import Location from "../../Forms/Location";

// gm : components ↓

export default function EditCV({ open, handleModal }) {
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
          <Grid item className={style.wrapper_modal592_mbileScroll}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                Edit CV{" "}
                <span className={style.pfText}>Professional Appointments</span>
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
            <Grid item className={style.bodyModal_form}>
              {/* forms */}
              <Grid container justifyContent="space-between">
                <Grid item className={style.TwoFormNew}>
                  <Date label="From" placeHolder="Choose date" />
                </Grid>
                <Grid item className={style.TwoFormNew}>
                  <Date label="To" placeHolder="Choose date" />
                </Grid>
              </Grid>
              <Grid item className={style.mtn10}>
                <InputForm label="Title" placeHolder="Type here" />
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item className={style.TwoFormNew}>
                  <InputForm label="Instituation" placeHolder="Type here" />
                </Grid>
                <Grid item className={style.TwoFormNew}>
                  <Location label="Location" placeHolder="Choose location" />
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
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
