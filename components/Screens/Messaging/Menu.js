import React, { useState, useContext } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Messaging.module.css";

// gm : files ↓
import InboxSvg from "../../../public/images/icons/Message - Inbox.svg";
import MessageAllSvg from "../../../public/images/icons/Message - All.svg";
import MessageSavedSvg from "../../../public/images/icons/Message - Saved.svg";
import MessageSentSvg from "../../../public/images/icons/Message - Sent.svg";
import MessageDeletedSvg from "../../../public/images/icons/Message - Deleted.svg";
import PlusCircle from "../../../public/images/icons/Plus - Circle gray.svg";
import CircleBlue from "../../../public/images/icons/CircleBlue.svg";
import CircleOrange from "../../../public/images/icons/CircleOrange.svg";
import CircleGreen from "../../../public/images/icons/CircleGreen.svg";
import CirclePurple from "../../../public/images/icons/CirclePurple.svg";

// gm : components ↓
import { Context } from "../../../context/index";
import Label from "./Label";
import AddLabel from "../../Modals/Messaging/AddLabel";

export default function Menu() {
  // gm : states ↓
  const [ModalAddLabel, setModalAddLabel] = useState(false)
  const { DashboardOpen, setDashboardOpen } = useContext(Context);

  return (
    <>
      <Grid
        item
        className={Style.P_Menu}
        style={{ left: DashboardOpen ? 260 : 0 }}
      >
        {/* Title */}
        <Grid item className={Style.TitleText_Menu}>
          <span className={Style.badgeGreen}></span>Inquries
        </Grid>
        <Grid item className={Style.Menu}>
          <Grid item className={Style.C_Menu}>
            <Grid item className={Style.MenuItem}>
              <img src={InboxSvg.src} className={Style.ImgMenu} /> Inbox
            </Grid>
            <Grid item className={Style.MenuItemNotSel}>
              <img src={MessageAllSvg.src} className={Style.ImgMenu} /> All
            </Grid>
            <Grid item className={Style.MenuItemNotSel}>
              <img src={MessageSavedSvg.src} className={Style.ImgMenu} /> Saved
            </Grid>
            <Grid item className={Style.MenuItemNotSel}>
              <img src={MessageSentSvg.src} className={Style.ImgMenu} /> Sent
            </Grid>
            <Grid item className={Style.MenuItemNotSel}>
              <img src={MessageDeletedSvg.src} className={Style.ImgMenu} />{" "}
              Deleted
            </Grid>
          </Grid>
          <Hidden mdUp>
            <span className={Style.LineLabel}></span>
          </Hidden>

          <Grid item className={Style.Lables}>
            <Hidden smDown>
              <Grid
                container
                justifyContent="space-between"
                className={Style.TitleLabel}
                onClick={()=>setModalAddLabel(true)}
              >
                <Grid item className={Style.Labels}>
                  Lables
                </Grid>
                <Grid item>
                  <img src={PlusCircle.src} className={Style.LbImg}/>
                </Grid>
              </Grid>
            </Hidden>
            <Label Logo={CircleBlue} />
            <Label Logo={CircleOrange} />
            <Label Logo={CircleGreen} />
            <Label Logo={CirclePurple} />
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item style={{ width: 220 }}></Grid>
      </Hidden>
      <AddLabel open={ModalAddLabel} handleModal={()=>setModalAddLabel(false)}/>
    </>
  );
}
