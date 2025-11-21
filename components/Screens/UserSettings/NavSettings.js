import React, { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/UserSettings.module.css";


// mrx : context ↓
import { Context } from "../../../context/index";

// gm : files ↓
import closeIcon from "../../../public/images/icons/Close12.svg";
import checkIcon from "../../../public/images/icons/Check White.svg";
import { Height } from "@material-ui/icons";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";
import checkCicle from "../../../public/images/icons/Check - Circle.svg";

// gm : components ↓
import useWindowSize from "../../../Hooks/useWindowSize";

export default function NavSettings({
  haveSaveChange = false,
  save_discard_btn = false,
  handleValidateStep2,
  whereFrom
}) {
  // mrx : context
  const {
    ShowSettingUser,
    setShowSettingUser,
  } = useContext(Context);

  const router = useRouter();

  // gm : states ↓

  const [width, height] = useWindowSize();

  // have Button or not

  return (
    <>
      <Grid item className={Style.navBar}>
        <Grid item className={Style.icon_close}>
          {
            whereFrom === "AddArtWork" ? (
              <IconButton onClick={() => setShowSettingUser(false)}>
                <img src={width > 960 ? closeIcon.src : arrowLeft.src} />
              </IconButton>
            ) : (
              <Link href="/dashboard">
                <IconButton>
                  <img src={width > 960 ? closeIcon.src : arrowLeft.src} />
                </IconButton>
              </Link>
            )
          }

        </Grid>
        <Grid item className={Style.titleNav}>
          Settings
        </Grid>
        <Grid item className={Style.p_SaveChange}>
          {haveSaveChange && (
            <Button
              variant="contained"
              color="primary"
              startIcon={width > 960 ? <Image src={checkIcon} /> : ""}
              className={Style.saveBtn}
            >
              {width > 960 ? "Save Changes" : "Save"}
            </Button>
          )}
        </Grid>
        <Grid item className={Style.p_SaveChange_disacrd}>
          {save_discard_btn && (
            <Grid container alignItems="center">
              <Hidden smDown>
                <Grid item>
                  <Button
                    onClick={() => router.push("/dashboard")}
                    className={Style.discardBtn}
                    startIcon={<Image src={closeIcon} />}
                  >
                    Discard
                  </Button>
                </Grid>
              </Hidden>
              <Grid item>
                <Button
                  color="primary"
                  variant="contained"
                  startIcon={<Image src={checkCicle} />}
                  className={Style.saveButton}
                  onClick={() => handleValidateStep2()}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
    </>
  );
}
