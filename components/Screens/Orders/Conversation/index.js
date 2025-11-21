import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import NoMessageSvg from "../../../../public/images/icons/No message.svg";
import NewMessage from "./NewMessage";

// gm : components ↓

export default function Conversation({ HaveNewMessage = true }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Tags}>
      {/* Tags */}
      <Grid item className="posRel">
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.TitleTags}
        >
          <Grid item className={Style.overView}>
            Conversation
          </Grid>
        </Grid>
        {!HaveNewMessage && (
          <Grid
            container
            direction="column"
            alignItems="center"
            className={Style.P_NoMassage}
          >
            <Grid item>
              <Image src={NoMessageSvg} />
            </Grid>
            <Grid item className={Style.NoConversation}>
              No conversation for this cosignment.
            </Grid>
          </Grid>
        )}

        {HaveNewMessage && (
          <NewMessage/>
        )}
       
      </Grid>
    </Grid>
  );
}
