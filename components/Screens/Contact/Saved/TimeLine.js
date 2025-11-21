import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, Avatar } from "@material-ui/core";

//rs : set cookies with this
import Cookies from "js-cookie";

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";
import savedArtistStyle from "../../../../styles/savedArtist.module.css";

// gm : files ↓
import guyPng from "../../../../public/images/guy.png";
import ContactCreatedList from "../../Artist/ContactCreatedList";
import LoadingSpinerSvg from "../../../../public/loading.svg";

// gm : components ↓

export default function TimeLine({
  AllLoading,
  Data,
  BASE_Image_Url
}) {
  // gm : states ↓

  return (
    <Grid item style={{ marginTop: "30px" }}>
      <Grid item className={Style.timeLineText}>
        Timeline
      </Grid>
      {
        Data?.artistTimeLine?.length ? (
          <>
            <Grid item className={savedArtistStyle.P_personImg}>
              <Avatar style={{ marginTop: "10px", height: "60px", width: "60px" }}>
                <img src={BASE_Image_Url + Cookies.get("USER_PROFILE")} />
              </Avatar>
            </Grid>
            <Grid item className={savedArtistStyle.P_contactCreated}>
              <Grid container direction="column" spacing={2}>
                {Data?.artistTimeLine?.map((line) => (
                  <ContactCreatedList data={line} />
                ))}
              </Grid>
            </Grid>
          </>
        ) : (
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            className={Style.p_orders}
          >
            <Grid item className={Style.noOrderText}>
              No timeline available
            </Grid>
          </Grid>
        )
      }
    </Grid>
  );
}
