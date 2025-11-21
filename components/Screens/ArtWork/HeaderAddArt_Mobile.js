import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtWorkflowStyle from '../../../styles/artworkflow.module.css'

// good man : files ↓
import arrowLeft from '../../../public/images/icons/Arrow left -.svg'

// good man : components ↓

export default function HeaderAddArtMobile({ editing = false, handleModal, artWorkHandle }) {
  // good man : states ↓
  const router = useRouter();

  return (
    <Hidden mdUp>
      <Grid item className={ArtWorkflowStyle.addArtwork_nav}>
        <span className={ArtWorkflowStyle.line100_1}></span>
        <Grid container justifyContent="space-between">
          <Grid item className={ArtWorkflowStyle.text_add_artwork}>
            <IconButton
              onClick={() => router.back()}
            >
              <Image src={arrowLeft} />
            </IconButton>
            {
              editing === true ? "Edit artwork" : "Add artwork"
            }

          </Grid>
          <Grid item>
            <Button
              onClick={artWorkHandle}
              variant="contained" color="primary" className={ArtWorkflowStyle.add_artWork_btn} onClick={handleModal}>{editing === true ? "Edit artwork" : "Add artwork"}</Button>
          </Grid>
        </Grid>
      </Grid>
    </Hidden>
  );
}
