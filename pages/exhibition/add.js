import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// gm : styles ↓
import Style from "../../styles/Exhibition.module.css";

// gm : files ↓
import CloseIcon from "../../public/images/icons/Close icon.svg";
import arrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import HeaderLanding from "../../components/common/header";

import AddMatterPort from "../../components/Modals/Exhibition/AddMatterPort";
import AddArtwork from "../../components/Modals/Exhibition/AddArtwork";
import General from "../../components/Screens/Exhibition/Main/General";
import Info from "../../components/Screens/Exhibition/Main/Info";
import Artwork from "../../components/Screens/Exhibition/Main/Artwork";
import Media from "../../components/Screens/Exhibition/Main/Media";
import Tags from "../../components/Screens/Exhibition/Main/Tags";
import Note from "../../components/Screens/Exhibition/Main/Note";

export default function List() {
  // gm : states ↓

  return (
    <Grid item>
      <Hidden smDown>
        <HeaderLanding />
      </Hidden>

      {/* mobile navbar */}
      <Hidden mdUp>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.mobileNav}
        >
          <Grid item className={Style.textAdd}>
            <IconButton size="small" className={Style.iconBtn}>
              <img src={arrowLeft.src} />
            </IconButton>
            Add exhibition
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              className={Style.addBtn}
            >
              Add Exhibition
            </Button>
          </Grid>
        </Grid>
      </Hidden>

      {/* start add contact */}
      <Grid
        container
        justifyContent="space-between"
        className={Style.wrapper_add}
      >
        {/* left side */}
        <Hidden smDown>
          <Grid item className={Style.leftSide_Add}>
            Add exhibition
          </Grid>
        </Hidden>

        {/* Main */}
        <Grid item className={Style.Middle_Add}>
          <General />
          <Info/>
          <Artwork/>
          <Media/>
          <Tags />
          <Note />
        </Grid>

        {/* right side */}
        <Hidden smDown>
          <Grid item className={Style.rightSide_Add}>
            <Grid item className={Style.p_buttons}>
              <Button
                startIcon={<img src={CloseIcon.src} />}
                className={Style.discardBtn}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                className={Style.addContact}
              >
                Add Exhibition
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
      {/* <AddArtwork open={true}/> */}
      {/* <AddMatterPort open={true}/> */}
    </Grid>
  );
}
