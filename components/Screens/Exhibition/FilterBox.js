import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { uuid } from "uuidv4";
import { useRouter } from "next/router";

// good man : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

// good man : styles ↓
import ArtistStyle from "../../../styles/artist.module.css";
import Style from "../../../styles/Home.module.css";

// good man : files ↓
import Filters from "../../../public/images/icons/Filters.svg";

// good man : components ↓
import useWindowSize from "../../../Hooks/useWindowSize";
import CustomFilter from "../Artist/CustomFilter";
import FilterMobile from "./FilterMobile";

export default function FilterBox() {
  // mrx : states ↓

  // good man : recocnize the page size
  const [width, height] = useWindowSize();

  return (
    <Grid item>
      <Grid
        container
        spacing={width > 960 ? 3 : 1}
        alignItems="center"
        className={Style.w_100}
      >
        <Hidden smDown>
          <CustomFilter label="Tagged with" />
          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
          <CustomFilter label="Location" />

          <Grid item>
            <span className={ArtistStyle.line3}></span>
          </Grid>
          <CustomFilter label="Sort by" />
        </Hidden>
        <Hidden mdUp>
          <FilterMobile />
        </Hidden>
      </Grid>
    </Grid>
  );
}
