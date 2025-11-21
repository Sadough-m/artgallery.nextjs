import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Home.module.css";
import ArtistStyle from "../../../../styles/artist.module.css";

// gm : files ↓
import ContactsImg from "../../../../public/images/icons/Contacts.svg";

// gm : components ↓

export default function Contact({
  pageName,
  ContactsOpen,
  handleTabMobile,
  TabHandlerMobile,
  TabHandler,
}) {
  // gm : states ↓

  return (
    <>
      <Hidden smDown>
        <Link href="/contact">
          <Grid item className={Style.tabSideMenu}>
            <Grid container direction="column">
              <Grid item className={Style.cursor_P}>
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
                          src={ContactsImg}
                          className={
                            pageName === "Contact"
                              ? ArtistStyle.TabSelectedImg
                              : ""
                          }
                        />
                      </Grid>
                      <Grid
                        item
                        className={
                          pageName === "Contact" ? ArtistStyle.text_dark : ""
                        }
                      >
                        Contacts
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Hidden>
      <Hidden mdUp>
        <Link href="/contact">
          <Grid item>
            <Grid
              container
              alignItems="center"
              className={ArtistStyle.ItemsDash}
              spacing={1}
              onClick={() => handleTabMobile("Contacts")}
            >
              <Grid item className={ArtistStyle.imgItemsMobile}>
                <Image
                  src={ContactsImg}
                  className={ContactsOpen || pageName === "Contact" ? ArtistStyle.TabSelectedImg : ""}
                />
              </Grid>
              <Grid item className={` ${TabHandlerMobile(ContactsOpen || pageName === "Contact")}`}>
                Contacts
              </Grid>
            </Grid>
          </Grid>
        </Link>
      </Hidden>
    </>
  );
}
