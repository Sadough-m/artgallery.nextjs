import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../styles/artist.module.css";

// gm : files ↓
import ArtWorksImg from "../../../public/images/icons/Artworks.svg";
import ArrowDown from "../../../public/images/icons/Arrow down.svg";
import ArrowUpSvg from "../../../public/images/icons/Arrow Up.svg";

// gm : components ↓

export default function SideMenuItem({
  title,
  icon,
  subMenu,
  pageName,
  Open,
  setOpen,
  link = "/",
  targetPage,
}) {
  // gm : states ↓

  const router = useRouter();

  // change route page of we havent submenu
  const PageHandle = () => {
    if (subMenu) {
      setOpen(!Open);
    } else {
      router.push(link);
    }
  };
  const PageHandleMobile = () => {
    router.push(link);
  };


  // open tab if we are in selected page
  useEffect(() => {
    if (subMenu) {
      subMenu.map((item) => {
        if (item.title === pageName) {
          setOpen(true);
        }
      });
    }

  }, []);

  return (
    <>
      <Hidden smDown>
        <Grid item className={Style.P_TitleSideMenu}>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            onClick={() => PageHandle()}
          >
            <Grid item>
              <img
                src={icon.src}
                className={
                  Open || router.pathname === link
                    ? Style.DarkSvg
                    : Style.DarkSvgClose
                }
              />{" "}
              <span
                className={
                  Open || router.pathname === link
                    ? Style.TitleSideMenuOpen
                    : Style.TitleSideMenu
                }
              >
                {title}
              </span>
            </Grid>
            {subMenu && (
              <Grid item>
                {/* {!Open && <span className={Style.BadgeGreen_3}>4</span>} */}

                <img
                  src={Open ? ArrowUpSvg.src : ArrowDown.src}
                  className={Style.ArrowDark}
                />
              </Grid>
            )}
          </Grid>
          {Open && subMenu && (
            <Grid item className={Style.SubMenu}>
              {/* Sub Menues */}
              {subMenu?.map((menu) => (
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                  className={Style.PTitleSubMenu}
                  onClick={() => router.push(menu.SubLink)}
                >
                  <span className={Style.lineMrx}></span>

                  <Grid
                    item
                    className={
                      menu.SubLink === router.pathname
                        ? Style.TitleSubMenu_active
                        : Style.TitleSubMenu
                    }
                  >
                    {menu.title}
                  </Grid>
                  {
                    menu.count >= 1 && (
                      <Grid item>
                        <span className={Style.BadgeOrange_1}>{menu.count}</span>
                      </Grid>
                    )
                  }
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Hidden>
      <Hidden
        onClick={() => PageHandle()}
        mdUp>
        <Grid item>
          <Grid
            container
            alignItems="center"
            className={Style.ItemsDash}
            spacing={1}
            onClick={() => PageHandleMobile()}
          >
            <Grid item className={Style.imgItemsMobile}>
              <img src={icon.src} className={link === router.pathname ? Style.ImgSideMobile_active : Style.ImgSideMobile} />
            </Grid>
            {link === router.pathname && (
              <Grid item className={Style.FontSideMenuMobile} >
                {title}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
}
