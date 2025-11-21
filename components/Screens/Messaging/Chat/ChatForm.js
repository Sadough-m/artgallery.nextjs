import React, { useState, useContext } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Messaging.module.css";

// gm : files ↓
import ClipSvg from "../../../../public/images/icons/Clip.svg";
import EmojiSvg from "../../../../public/images/icons/Emoji.svg";

// gm : components ↓
import { Context } from "../../../../context/index";
import QuickMessage from "./QuickMessage";

export default function ChatForm() {
  // gm : states ↓
  const [TypedMessage, setTypedMessage] = useState("");

  const { DashboardOpen, setDashboardOpen } = useContext(Context);

  return (
    <Grid
      item
      className={Style.ChatForm}
      style={{
        width: DashboardOpen ? " calc(100% - 514px)" : " calc(100% - 256px)",
        left: DashboardOpen ? 260 : 0,
      }}
    >
      <QuickMessage />
      <Grid container alignItems="center" className={Style.C_ChatForm}>
        <Grid item className={Style.P_InputChat}>
          <Grid container alignItems="center">
            <Grid item>
              <IconButton>
                <img src={ClipSvg.src} />
              </IconButton>
            </Grid>
            <Grid item className="flex1">
              <input
                type="text"
                placeholder="Write your meassage here"
                className={Style.TypeForm}
                onChange={(e) => setTypedMessage(e.target.value)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton className={Style.Emoji}>
            <img src={EmojiSvg.src} />
          </IconButton>
          <Button
            className={
              TypedMessage === "" ? Style.SendBtn : Style.SendBtn_Active
            }
            disabled={TypedMessage === "" ? true : false}
          >
            Send
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
