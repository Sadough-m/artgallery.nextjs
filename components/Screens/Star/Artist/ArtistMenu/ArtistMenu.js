import React, { useState, useEffect } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓

// gm : components ↓
import Overview from "./Overview";
import Artworks from "./Artworks";
import Cv from "./Cv";
import MenuButtons from "./MenuButtons";
import MenuOnScroll from "./MenuOnScroll";

export default function ArtistMenu() {
  // gm : states ↓
  const [ShowNav, setShowNav] = useState(false);

  // Hide And Show Navbar
  const ControllNavBar = () => {
    if (window.scrollY > 300) {
      setShowNav(true);
    } else {
      setShowNav(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", ControllNavBar);

    return () => {
      window.removeEventListener("scroll", ControllNavBar);
    };
  }, []);

  return (
    <Grid item className={Style.ArtistMenu}>
      <Hidden smDown>
        <MenuOnScroll ShowNav={ShowNav}/>
      </Hidden>
      <MenuButtons ShowNav={ShowNav}/>
      <Overview />

      <Artworks />

      <Cv />
    </Grid>
  );
}
