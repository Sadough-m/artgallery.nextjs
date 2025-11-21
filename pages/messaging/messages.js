import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

// mrx : material ui ↓
import { Hidden, Button, Grid, IconButton } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../styles/Messaging.module.css";

// rmx : files  ↓
import ArrowSvg from "../../public/images/icons/Arrow left -.svg";

// mrx : components ↓
import Menu from "../../components/Screens/Messaging/Chat/Menu";
import Icons from "../../components/Screens/Messaging/Chat/Icons";
import MyMessage from "../../components/Screens/Messaging/Chat/MyMessage";
import AudienceMessage from "../../components/Screens/Messaging/Chat/AudienceMessage";
import ChatForm from "../../components/Screens/Messaging/Chat/ChatForm";
import useWindowSize from "../../Hooks/useWindowSize";
import MobileNav from "../../components/Screens/Messaging/Chat/MobileNav";
import MyDocument from "../../components/Screens/Messaging/Chat/MyDocument";
import AudienceDocument from "../../components/Screens/Messaging/Chat/AudienceDocument";

export default function Messages() {
  // gm : States ↓
  const [ShowMenu, setShowMenu] = useState(false);

  const [width, height] = useWindowSize();

  return (
    <Grid item className={Style.MainMessaging}>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.MessageLeftSide}>
          {/* NavBar Mobile */}
          <MobileNav setShowMenu={setShowMenu}/>

          <Hidden smDown>
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              className={Style.P_HeaderMessages}
            >
              <Grid item className={Style.MessageText}>
                <IconButton size="small" className={Style.ArrowLeft}>
                  <img src={ArrowSvg.src} />
                </IconButton>
                Messages
              </Grid>
              <Icons />
            </Grid>
          </Hidden>

          {/* Start Messages */}
          <MyMessage Text="Hey dear, I hope you doing well." />
          <MyMessage
            Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
          />
          <MyDocument/>

          {/* Note : if after MyMessage was AudienceMessage MarginTop must be 24px , Otherwise MarginTop must be 8px */}
          <Grid item style={{ marginTop: 24 }}>
            <AudienceMessage Text="Hey dear, I hope you doing well." />
            <AudienceDocument/>
            <AudienceMessage
              Text="Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
            />
          </Grid>
        </Grid>
        {/* Right Side Menu */}
        {(ShowMenu || width > 960) && <Menu setShowMenu={setShowMenu}/>}
      </Grid>
      {/* Chat Form */}
      <ChatForm />
    </Grid>
  );
}
