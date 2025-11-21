import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Home.module.css";
import ArtistStyle from "../../../../styles/artist.module.css";

// gm : files ↓
import ArtWorksImg from "../../../../public/images/icons/Artworks.svg";
import ArrowDown from "../../../../public/images/icons/Arrow down.svg";
import ArrowUpImg from "../../../../public/images/icons/Arrow Up.svg";

// gm : components ↓

export default function Artwork({
  pageName,
  artworkCount,
  ArtWorksHandle,
  handleTabMobile,
  TabHandlerMobile,
  artWorkOpen,
  TabHandler,
}) {
  // gm : states ↓

  return (
    <>
      <Hidden smDown>
        <Grid item className={Style.tabSideMenu}>
          <Grid container direction="column">
            <Grid
              item
              className={Style.cursor_P}
              onClick={() => ArtWorksHandle()}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                className={ArtistStyle.text_dashboard}
              >
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid
                      item
                      className={`${
                        artWorkOpen
                          ? ArtistStyle.TabSelectedImg
                          : ArtistStyle.imgartwork
                      } ${ArtistStyle.imgartwork1}`}
                    >
                      <Image
                        src={ArtWorksImg}
                        className={
                          artWorkOpen ? ArtistStyle.TabSelectedImg : ""
                        }
                      />
                    </Grid>

                    <Grid
                      item
                      className={artWorkOpen ? ArtistStyle.text_dark : ""}
                    >
                      Artworks
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Arrow_Dashboard}>
                  {!artWorkOpen && (
                    <span className={ArtistStyle.badgeGreen1}>5</span>
                  )}
                  <Image src={artWorkOpen ? ArrowUpImg : ArrowDown} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              className={`${Style.mb_10}  ${ArtistStyle.Tabs} ${TabHandler(
                artWorkOpen
              )}`}
            >
              <Grid
                container
                direction="column"
                spacing={1}
                className={`${ArtistStyle.el_tabs} `}
              >
                <Grid
                  item
                  className={`${Style.w_100} ${ArtistStyle.text_dashboard} `}
                >
                  <Link href="/artwork">
                    <Grid container justifyContent="space-between">
                      <Grid item className={ArtistStyle.El}>
                        <span className={ArtistStyle.design_line_first}></span>
                        <span
                          className={
                            pageName === "All artworks"
                              ? ArtistStyle.text_dark
                              : ""
                          }
                        >
                          All artworks
                        </span>
                      </Grid>
                      <Grid item>
                        <span className={ArtistStyle.badgeOrange}>
                          {artworkCount}
                        </span>
                      </Grid>
                    </Grid>
                  </Link>
                </Grid>
                <Grid item className={`${ArtistStyle.text_dashboard} `}>
                  <Grid container>
                    <Grid item className={ArtistStyle.El}>
                      <span className={ArtistStyle.design_line}></span>
                      On transit
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={`${ArtistStyle.text_dashboard} `}>
                  <Grid container>
                    <Grid item className={ArtistStyle.El}>
                      <span className={ArtistStyle.design_line}></span>
                      Collections
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Link href="/artwork">
          <Grid item>
            <Grid
              container
              alignItems="center"
              className={ArtistStyle.ItemsDash}
              spacing={1}
              onClick={() => handleTabMobile("Artworks")}
            >
              <Grid item className={ArtistStyle.imgItemsMobile}>
                <Image
                  src={ArtWorksImg}
                  className={
                    artWorkOpen || pageName === "artwork"
                      ? ArtistStyle.TabSelectedImg
                      : ArtistStyle.imgartwork
                  }
                />
              </Grid>
              <Grid
                item
                className={` ${TabHandlerMobile(
                  artWorkOpen || pageName === "artwork"
                )}`}
              >
                Artworks
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Hidden>
    </>
  );
}
