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
import StarStyle from "../../../styles/Star.module.css";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import GoldStarSvg from "../../../public/images/icons/GoldStar.svg";

// gm : components ↓

export default function MakePayement({ open, handleModal }) {
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
              Make a Payement
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
              <Grid container className={StarStyle.BgPayement}>
                <Grid item>
                  <img src={GoldStarSvg.src} />
                </Grid>
                <Grid item className={StarStyle.RegisterRightSide}>
                  <Grid item className={StarStyle.HaveAccount1}>
                    Have an account ?{" "}
                  </Grid>
                  <Grid item className={StarStyle.SignInText}>
                    <span className={StarStyle.DarkText}>Sign in</span> to access
                    the offer and manage the transfer on your dashboard. If, not{" "}
                    <span className="link">register</span> to{" "}
                    <span className={StarStyle.DarkText}>
                      <span className={StarStyle.UnderLine}>manage,</span>{" "}
                      <span className={StarStyle.UnderLine}>mint,</span>{" "}
                      <span className={StarStyle.UnderLine}>sell,</span>{" "}
                      <span className={StarStyle.UnderLine}>consign</span> any
                      creation you have for free.{" "}
                    </span>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "32px" }}>
              <Button
                fullWidth
                color="secondary"
                variant="contained"
                className={style.buttonModal}
              >
                Login
              </Button>
              <Button
                fullWidth
                className={style.buttonModalGray}
              >
                Continue as a guest
              </Button>
            </Grid>
          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
