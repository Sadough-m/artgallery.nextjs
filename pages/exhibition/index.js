import React, { useEffect, useState, useContext } from "react";
import Link from "next/link";

// mrx : material ui ↓
import { Hidden, Button, Grid } from "@material-ui/core";

// mrx : styles ↓
import Style from "../../styles/Exhibition.module.css";

// rmx : files  ↓
import plusCircle from "../../public/images/icons/Plus - Circle white.svg";
import searchImg from "../../public/images/icons/Search.svg";
import imgEmpty from "../../public/images/Mask.png";

// mrx : components ↓
import Header from "../../components/common/header";
import SideMenu from "../../components/Screens/Artist/SideMenu";
import FilterBoxCTS from "../../components/Screens/Orders/common/FilterBoxCTS";
import useWindowSize from "../../Hooks/useWindowSize";
import TopMenuMobile from "../../components/Screens/Orders/common/TopMenuMobile";
import TableExhibition from "../../components/Screens/Exhibition/TableExhibition";
import FilterBox from "../../components/Screens/Exhibition/FilterBox";

export default function Exhibitions() {

  const [width, height] = useWindowSize();

  if (true) {
    return (
      <Grid item>
        <Grid container direction="row">

          <Grid item className={Style.Wrapper}>
            <Grid item className={Style.P_artistNav}>
              <Grid container direction="column">
                <Grid item className={Style.p_contact}>
                  <Grid
                    container
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Grid item className={Style.titleText}>
                      <span className={Style.badgeGreen}></span>Exhibitions
                    </Grid>
                    <Grid item className={Style.P_Create}>
                      <Link href="/exhibition/add">
                        <Button
                          variant="contained"
                          color="primary"
                          startIcon={<img src={plusCircle.src} />}
                          className={Style.Create}
                        >
                          Add Exhibition
                        </Button>
                      </Link>
                    </Grid>
                  </Grid>
                </Grid>

                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  direction="row"
                  className={Style.P_search_Filter}
                >
                  <Grid item className={Style.P_tiny_search}>
                    <input
                      type="search"
                      placeholder="Search exhibition name"
                      className={Style.tiny_search}
                    />
                    <Grid item className={Style.searchImg}>
                      <img src={searchImg.src} />
                    </Grid>
                  </Grid>
                  <FilterBox />
                </Grid>

                <TableExhibition />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  } else {
    return (
      <Grid item>
        <Grid container direction="row">

          {/* start contact area */}
          <Grid item className={Style.Wrapper_Empty}>
            <Hidden smDown>
              <Grid item className={Style.titleText}>
                <span className={Style.badgeGreen}></span>Exhibitions
              </Grid>
            </Hidden>

            {/* empty contacts */}
            <Grid
              container
              alignItems="center"
              direction="column"
              justifyContent="center"
              className={Style.p_empty}
            >
              <Grid item className={Style.img_mask}>
                <img src={imgEmpty.src} />
              </Grid>
              <Grid item className={Style.text_manage_noWidth}>
                Add and manage your exhibitions
              </Grid>
              <Grid item className={Style.text_product}>
                This is where you’ll add products and manage your pricing. You
                can also import and export your product inventory.
              </Grid>

              <Grid item>
                <Link href="/exhibition/add">
                  <Button
                    variant="contained"
                    color="primary"
                    className={Style.addButton}
                  >
                    {width > 960 ? "Add Exhibition" : "Add Exhibition"}
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Grid>
          {/* end contact area */}
        </Grid>
      </Grid>
    );
  }
}
