import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Home.module.css";
import ArtistStyle from "../../../../styles/artist.module.css";

// gm : files ↓
import OrdersImg from "../../../../public/images/icons/Orders.svg";
import ArrowDown from "../../../../public/images/icons/Arrow down.svg";
import ArrowUpImg from "../../../../public/images/icons/Arrow Up.svg";

// gm : components ↓

export default function Orders({
  pageName,
  OrdersOpen,
  OrdersHandle,
  TabHandler,
  TabHandlerMobile,
  handleTabMobile,
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
              onClick={() => OrdersHandle()}
            >
              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
                className={`${ArtistStyle.text_dashboard} `}
              >
                <Grid item>
                  <Grid container alignItems="center" spacing={1}>
                    <Grid item className={ArtistStyle.imgDashboard}>
                      <Image
                        src={OrdersImg}
                        className={OrdersOpen || pageName === "Orders" ? ArtistStyle.TabSelectedImg : ""}
                      />
                    </Grid>
                    <Grid
                      item
                      className={
                        OrdersOpen || pageName === "Orders"
                          ? ArtistStyle.text_dark
                          : ""
                      }
                    >
                      Orders
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={ArtistStyle.Arrow_Dashboard}>
                  {!OrdersOpen && (
                    <span className={ArtistStyle.badgeGreen1}>5</span>
                  )}
                  <Image src={OrdersOpen ? ArrowUpImg : ArrowDown} />
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              className={`${Style.mb_10}  ${ArtistStyle.Tabs} ${TabHandler(
                OrdersOpen || pageName === "Orders"
              )}`}
            >
              <Grid
                container
                direction="column"
                spacing={1}
                className={`${ArtistStyle.el_tabs} `}
              >
                <Link href="/orders">
                  <Grid
                    item
                    className={`${Style.w_100} ${ArtistStyle.text_dashboard} `}
                  >
                    <Grid container justifyContent="space-between">
                      <Grid item className={ArtistStyle.El}>
                        <span className={ArtistStyle.design_line_first}></span>
                        order section 1
                      </Grid>
                      <Grid item>
                        <span className={ArtistStyle.badgeOrange}>5</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Link>
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
        <Grid item>
          <Grid
            container
            alignItems="center"
            className={ArtistStyle.ItemsDash}
            spacing={1}
            onClick={() => handleTabMobile("Orders")}
          >
            <Grid item className={ArtistStyle.imgItemsMobile}>
              <Image
                src={OrdersImg}
                className={
                  OrdersOpen || pageName === "Orders"
                    ? ArtistStyle.TabSelectedImg
                    : ""
                }
              />
            </Grid>
            <Grid
              item
              className={` ${TabHandlerMobile(
                OrdersOpen || pageName === "Orders"
              )}`}
            >
              Orders
            </Grid>
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}
