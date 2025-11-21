import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { ClickAwayListener, Grid, Hidden, styled } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/UserSettings.module.css";

// gm : files ↓
import userSvg from "../../../public/images/icons/User.svg";
import communitySvg from "../../../public/images/icons/Community gray.svg";
import walletSvg from "../../../public/images/icons/Wallet gary.svg";
import emailSvg from "../../../public/images/icons/Email notification gray.svg";
import messageSvg from "../../../public/images/icons/Messages gray.svg";
import cvSvg from "../../../public/images/icons/CV gray.svg";
import arrowDown from "../../../public/images/icons/Arrow down.svg";
import arrowUp from "../../../public/images/icons/Arrow Up.svg";

// gm : components ↓

export default function Menu({ SelectedPage, whereFrom }) {
  // gm : states ↓
  const [openOption, setOpenOption] = useState(false);

  // gm : route pages
  const router = useRouter();

  // Open and close List Of Options for selecting
  const handleOption = () => {
    setOpenOption(!openOption);
  };

  const CloseOption = () => {
    setOpenOption(false);
  };

  // route pages
  const handlePage = (value) => {
    handleOption();
    router.push(`/${value}`);
  };

  // return style of item menu base on current page
  const handleStyleMenu = (value) => {
    if (SelectedPage === value) {
      return Style.MenuItem_active;
    } else return Style.MenuItem;
  };

  // return style img
  const handleStyleImg = (value) => {
    if (SelectedPage === value) {
      return Style.imgMenu_active;
    } else return Style.imgMenu;
  };

  return (
    <>
      {/* for pc */}
      <Hidden smDown>
        <Grid item className={Style.wrapper_menu}>
          <Grid container direction="column">
            <Grid
              item
              className={handleStyleMenu("User settings")}
              onClick={() => handlePage("user")}
            >
              <img
                src={userSvg.src}
                className={handleStyleImg("User settings")}
              />
              User settings
            </Grid>

            <Grid
              item
              className={handleStyleMenu("Community")}
              onClick={() => handlePage("user/community")}
            >
              <img
                src={communitySvg.src}
                className={handleStyleImg("Community")}
              />
              Community
            </Grid>
            <Grid
              item
              className={handleStyleMenu("Wallet & Tax")}
              onClick={() => handlePage("user/walletandtax")}
            >
              <img
                src={walletSvg.src}
                className={handleStyleImg("Wallet & Tax")}
              />
              Wallet & Tax
            </Grid>
            {/* <Grid item className={handleStyleMenu("Email list")} onClick={() => handlePage("user/emaillist")}>
              <img
                src={emailSvg.src}
                className={handleStyleImg("Email list")}
              />
              Email list
            </Grid>
            <Grid item className={handleStyleMenu("Messaging Template")} onClick={() => handlePage("user/messagingtemplate")}>
              <img
                src={messageSvg.src}
                className={handleStyleImg("Messaging Template")}
              />
              Messaging template
            </Grid> */}
            <Grid item className={handleStyleMenu("Creator CV")} onClick={() => handlePage("user/createcv")}>
              <img src={cvSvg.src} className={handleStyleImg("Creator CV")} />
              Creator CV
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      {/* for mobile */}

      <Hidden mdUp>
        <ClickAwayListener onClickAway={CloseOption}>
          <Grid item className={Style.wrapper_menu_mobile}>
            {/* form */}
            <Grid item className="posRel">
              <input
                type="text"
                className={Style.formMenu}
                value={SelectedPage}
              />

              {/* this line is for bug fire fox */}
              <Grid
                item
                className={Style.fixBugFireFox}
                onClick={() => handleOption()}
              ></Grid>

              {/* Arrow */}
              <img src={!openOption ? arrowDown.src : arrowUp.src} className={Style.dropDown} />
            </Grid>

            {/* options */}
            {openOption && (
              <Grid container direction="column" className={Style.P_options}>
                <Grid
                  item
                  className={Style.options}
                  onClick={() => handlePage("user")}
                >
                  User settings
                </Grid>
                <Grid
                  item
                  className={Style.options}
                  onClick={() => handlePage("user/community")}
                >
                  Community
                </Grid>
                <Grid
                  item
                  className={Style.options}
                  onClick={() => handlePage("user/walletandtax")}
                >
                  Wallet & Tax
                </Grid>
                {/* <Grid
                  item
                  className={Style.options}
                  onClick={() => handlePage("user/emaillist")}
                >
                  Email list
                </Grid>
                <Grid
                  item
                  className={Style.options}
                  onClick={() => handlePage("user/messagingtemplate")}
                >
                  Messaging template
                </Grid> */}
                <Grid
                  item
                  className={Style.options}
                  onClick={() => handlePage("user/createcv")}
                >
                  Creator CV
                </Grid>
              </Grid>
            )}
          </Grid>
        </ClickAwayListener>
      </Hidden>
    </>
  );
}
