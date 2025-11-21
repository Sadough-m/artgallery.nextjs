import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";
import HeaderLanding from "../../components/common/header";

// gm : styles ↓
import Style from "../../styles/Orders.module.css";

// gm : files ↓
import arrowLeft from "../../public/images/icons/Arrow left -.svg";
import dotsSvg from "../../public/images/icons/MoreBlack.svg";

// gm : components ↓
import Tags from "../../components/Screens/Orders/Saved/Tags";
import Icons from "../../components/Screens/Orders/Saved/Icons";
import Note from "../../components/Screens/Orders/Saved/Note";
import Profile from "../../components/Screens/Orders/Saved/Profile/Profile";
import Payment from "../../components/Screens/Orders/Payment";
import Unfulfilled from "../../components/Screens/Orders/Fillment/Unfulfilled";
import Fulfilled from "../../components/Screens/Orders/Fillment/Fulfilled";
import Returned from "../../components/Screens/Orders/Fillment/Returned";
import TimeLine from "../../components/Screens/Orders/TimeLine";
import Conversation from "../../components/Screens/Orders/Conversation";
import NavBarMobile from "../../components/Screens/Orders/common/NavBarMobile";
import useWindowSize from "../../Hooks/useWindowSize";

export default function DraftOrder() {
  // gm : states ↓
  const [width, height] = useWindowSize();

  return (
    <Grid item>
      <Hidden smDown>
        <HeaderLanding />
      </Hidden>
      <Grid container  className={Style.wrapper_saved}>
        {/* left side */}
        <Grid item className={Style.LeftSide_saved}>
          <NavBarMobile title="Draft order #001" HaveButton={true} />

          {/* components */}
          <Payment HaveTitle={width > 960 ? true : false} />
          <Unfulfilled />
          <Fulfilled />
          <Returned />
          <Note />
          <TimeLine />
        </Grid>

        {/* right side */}
        <Grid item className={Style.RightSide_saved}>
          <Grid item>
            <Payment HaveList={false} HaveTitle={width <= 960 ? true : false} />
            <Hidden smDown>
              <Icons PageName="DraftOrder" />
            </Hidden>
            <Profile />
            <Conversation />
            <Tags />
          </Grid>
        </Grid>
      </Grid>
      {/* Modals */}
      {/* <EditEmail open={true}/> */}
    </Grid>
  );
}
