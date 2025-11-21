import Image from "next/image";
import React from "react";

// mrx : material ui ↓
import { Button, Grid, IconButton, TextField } from "@material-ui/core";

// mrx : styles ↓
import savedArtistStyle from "../../../styles/savedArtist.module.css";

// mrx : files ↓
import elipsPic from "../../../public/images/icons/Ellipse 176.svg";

export default function ContactCreatedList({ data }) {

  return (
    <Grid item>
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item md={9} xs={12}>
              <Grid container spacing={3}>
                <Grid item className={savedArtistStyle.P_contactPic}>
                  <span className={savedArtistStyle.line1}></span>
                  <Image src={elipsPic} />
                </Grid>
                <Grid item className={savedArtistStyle.contactFont}>
                  {data?.title}
                </Grid>
              </Grid>
              <Grid item className={savedArtistStyle.someText_c}>
                {data?.description?.substring(0, 80)}
                {data?.description?.length > 80 ? "..." : ""}
              </Grid>
            </Grid>
            <Grid item md={3} xs={12}>
              <Grid
                container
                spacing={3}
                alignItems="center"
                justifyContent="flex-end"
                className={savedArtistStyle.date}
              >
                <Grid item className={savedArtistStyle.dateFont}>
                  {data?.date}
                </Grid>
                <Grid item>
                  <span className={savedArtistStyle.line}></span>
                </Grid>
                <Grid item className={savedArtistStyle.dateFont}>
                  {data?.time}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
