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
import PlusSvg from "../../../public/images/icons/Plus - Circle.svg";

// gm : components ↓
import CustomSelect from "../../Forms/CustomSelect";
import PhoneNumber from "../../Forms/PhoneNumber";
import Location from "../../Forms/Location";
import InputForm from "../../Forms/InputForm";
import Date from "../../Forms/Date";


export default function EditInfo({ open, handleModal }) {
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
                Edit info
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
            <Grid item className={style.bodyModal_form_noMargin}>
              {/* forms */}
              <InputForm
                type="text"
                placeHolder="Enter exhibition title"
                label="Title"
              />
              <Button color="primary" startIcon={<img src={PlusSvg.src}/>} className={style.FitBtnDesk}>Add Description</Button>
              <Grid container justifyContent="space-between">
                <Grid item className={style.TwoInput}>
                  <CustomSelect label="Exhibition type" />
                </Grid>
                <Grid item className={style.TwoInput}>
                  <Location placeHolder="Choose one" label="Location" />
                </Grid>
              </Grid>

              <Grid container justifyContent="space-between">
                <Grid item className={style.TwoInput}>
                  <Date label="Start date" />
                </Grid>
                <Grid item className={style.TwoInput}>
                  <Date label="End date" />
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
