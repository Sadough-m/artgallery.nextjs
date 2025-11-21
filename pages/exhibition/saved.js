import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Exhibition.module.css";

// gm : files ↓
import arrowLeft from "../../public/images/icons/Arrow left -.svg";
import dotsSvg from "../../public/images/icons/MoreBlack.svg";

// gm : components ↓
import useWindowSize from "../../Hooks/useWindowSize";
import Note from "../../components/Screens/Exhibition/Note";
import ArtworkList from "../../components/Screens/Exhibition/ArtworkList/ArtworkList";
import TimeLine from "../../components/Screens/Exhibition/TimeLine/TimeLine";
import Media from "../../components/Screens/Exhibition/Media/Media";
import Icons from "../../components/Screens/Exhibition/Icons";
import Folding from "../../components/Screens/Exhibition/Folding";
import NavBarMobile from "../../components/Screens/Exhibition/NavBarMobile";
import TagsList from "../../components/Screens/Exhibition/TagsList";
import EditInfo from "../../components/Modals/Exhibition/EditInfo";
import EditMedia from "../../components/Modals/Exhibition/EditMedia";

export default function Saved() {
  // gm : states ↓

  const [width, height] = useWindowSize();

  return (
    <Grid item>
      <Hidden smDown>
        <HeaderLanding />
      </Hidden>
      <Grid container justifyContent="center" className={Style.wrapper_saved}>
        {/* left side */}
        <Grid item className={Style.LeftSide_saved}>
          <NavBarMobile />

          {/* components */}
          <Note />
          <ArtworkList />
          <Media />
          <TimeLine />
        </Grid>

        {/* right side */}
        <Grid item className={Style.RightSide_saved}>
          <Grid item>
            <Hidden smDown>
              <Icons />
            </Hidden>
            <Folding />
            <TagsList />
          </Grid>
        </Grid>
      </Grid>
      {/* Modals */}
      {/* <EditMedia open={true}/> */}
    </Grid>
  );
}
