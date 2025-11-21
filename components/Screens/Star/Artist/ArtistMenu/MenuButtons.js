import React, { useState } from "react";
import Link from "react-scroll/modules/components/Link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";
import useWindowSize from "../../../../../Hooks/useWindowSize";

// gm : files ↓

// gm : components ↓

export default function MenuButtons({ ShowNav }) {
  // gm : states ↓
  const [SwitchMenu, setSwitchMenu] = useState("Overview");

  // page width size
  const [width, height] = useWindowSize();

  return (
    <>
      {/* just for some space */}
      <div item className={ShowNav && width > 960 && Style.SpaceBtn}></div>

      {/* Buttons */}
      <Grid item className={ShowNav && width > 960 && Style.FixedButton}>
        <Grid container justifyContent="center">
          <Link to="Overview" smooth={true} spy={true} duration={1000}>
            <Button
              className={
                SwitchMenu === "Overview"
                  ? Style.ArtistTab_Sel
                  : Style.ArtistTab
              }
              onClick={() => setSwitchMenu("Overview")}
            >
              Overview
            </Button>
          </Link>
          <Link to="Artworks" smooth={true} spy={true} duration={1000}>
            <Button
              className={
                SwitchMenu === "Artworks"
                  ? Style.ArtistTab_Sel
                  : Style.ArtistTab
              }
              onClick={() => setSwitchMenu("Artworks")}
            >
              Artworks
            </Button>
          </Link>
          <Link to="CV" smooth={true} spy={true} duration={1000}>
            <Button
              className={
                SwitchMenu === "CV" ? Style.ArtistTab_Sel : Style.ArtistTab
              }
              onClick={() => setSwitchMenu("CV")}
            >
              CV
            </Button>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
