import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import AppsPng from "../../../../public/images/AppsPic.png";
import PinSvg from "../../../../public/images/icons/Pin.svg";
import RemoveTemplate from "../../../Modals/UserSettings/RemoveTemplate";

// gm : components ↓

export default function App({ Connected = false }) {
  // gm : states ↓
  const [ShowDisconnect, setShowDisconnect] = useState(false);
  const [ModalRemove, setModalRemove] = useState(false);

  // return button
  const handleButton = () => {
    if (!Connected) {
      return (
        <Link href="/user/apppermission">
          <Button className={Style.BtnConnect}>Connect</Button>
        </Link>
      );
    } else if (ShowDisconnect) {
      return (
        <Button
          className={Style.BtnDisconnect}
          onClick={() => setModalRemove(true)}
        >
          Disconnect
        </Button>
      );
    } else return <Button className={Style.BtnConnected}>Connected</Button>;
  };

  return (
    <Grid
      item
      className={Style.Apps}
      onMouseEnter={() => setShowDisconnect(true)}
      onMouseLeave={() => setShowDisconnect(false)}
    >
      <Grid container alignItems="center">
        <Grid item>
          <Image src={AppsPng} />
        </Grid>
        <Grid item className={Style.SlackText}>
          Slack
        </Grid>
      </Grid>
      <Grid item className={Style.DeskApp}>
        Slack is a digital workplace that connects you{" "}
      </Grid>
      <Grid item>{handleButton()}</Grid>
      {Connected && ShowDisconnect && (
        <Grid item className={Style.PinIcon}>
          <IconButton>
            <Image src={PinSvg} />
          </IconButton>
        </Grid>
      )}

      <Link href="/user/app">
        <span className={Style.ForLink}></span>
      </Link>
      <RemoveTemplate
        open={ModalRemove}
        handleModal={() => setModalRemove(false)}
      />
    </Grid>
  );
}
