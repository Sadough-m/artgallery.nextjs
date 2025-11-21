import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/Dashboard.module.css";

// mrx : cookies
import Cookies from "js-cookie";

// gm : files ↓
import BlueSquarePng from "../../../public/images/blue square.png";
import useWindowSize from "../../../Hooks/useWindowSize";

// gm : components ↓

export default function WelcomeArea({haveImg = true}) {
  const UserName = Cookies.get("USER_NAME");

  // gm : states ↓
  const [DisplayName, setDisplayName] = useState("")

  // recognize page size
  const [width, height] = useWindowSize()

  useEffect(() => {
    setDisplayName(UserName ? UserName : "Loading ...");
  }, [UserName])

  return (
    <Grid item className={haveImg?Style.welcome_Wrapper:Style.welcome_Wrapper_text}>
      <Grid
        container
        justifyContent="space-between"
        className="w_100"
        alignItems="center"
      >
        <Grid item>
          <Grid container alignItems="center">
            <Grid item className={Style.welcome_Text}>
              {width > 960 ? "Welcome" : "Good Afternoon"}, <span style={{ color: "#242328" }}>{DisplayName}</span>
            </Grid>
            <span className={Style.line_welcome}></span>
            <Grid item className={Style.desk_welcome}>
              Lorem ipsum dolor sit amet, conse tetur apiscing elit. Volt, arcu
              nec risus conseq at urna nunc.
            </Grid>
            <Hidden mdUp>
              <Grid item className={Style.dateText}>Today 27 Feb, 2020</Grid>
            </Hidden>
          </Grid>
        </Grid>
        <Hidden smDown>
          <Grid item>
            {haveImg?(<img src={BlueSquarePng.src} className={Style.img_square} />):<span className={Style.date}>Today 27 Feb, 2020</span>}
            
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
