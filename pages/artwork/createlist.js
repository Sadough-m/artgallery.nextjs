import React, { useState } from "react";
import Image from "next/image";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// gm : styles ↓
import Style from "../../styles/Contacts.module.css";

// gm : files ↓
import CloseIcon from "../../public/images/icons/Close icon.svg";
import arrowLeft from "../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import HeaderLanding from "../../components/common/header";
import General from "../../components/Screens/ArtWork/CreateList/General";
import GeneralRole from "../../components/Screens/ArtWork/CreateList/GeneralRole";
import CoverPhoto from "../../components/Screens/ArtWork/CreateList/CoverPhoto";

export default function AddArtwork() {
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
          alignItems='center'
          className={Style.mobileNav}
        >
          <Grid item className={Style.textAdd}>
            <IconButton size="small" className={Style.iconBtn}>
              <Image src={arrowLeft} />
            </IconButton>
            Add artwork
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" className={Style.addBtn}>
              Add artwork
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
          Add artwork
          </Grid>
        </Hidden>

        {/* Main */}
        <Grid item className={Style.Middle_Add}>
          {/* <SalesPoint/> */}
          <General />
          <GeneralRole/>
          <CoverPhoto/>
        </Grid>

        {/* right side */}
        <Hidden smDown>
          <Grid item className={Style.rightSide_Add}>
            <Grid item className={Style.p_buttons}>
              <Button
                startIcon={<Image src={CloseIcon} />}
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
                Add Artwork
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>

      {/* end add contact */}
    </Grid>
  );
}
