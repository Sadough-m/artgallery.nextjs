import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

// mrx : material ui ↓
import { Hidden, Grid, Button } from "@material-ui/core";

// mrx : styles ↓
import ColStyle from "../../styles/Collection.module.css";

// rmx : files  ↓
import checkWhite from "../../public/images/icons/Check White.svg";
import closeIcon from "../../public/images/icons/Close12.svg";
import arrowLeft from "../../public/images/icons/Arrow left -.svg";

// mrx : components ↓
import Header from "../../components/common/header";
import useWindowSize from "../../Hooks/useWindowSize";
import Statuse from "../../components/Screens/Collection/Statuse";
import File from "../../components/Forms/File";
import CustomSelect from "../../components/Forms/CustomSelect";
import Collabrators from "../../components/Screens/Collection/Collabrators";
import Apps from "../../components/Screens/Collection/Apps";

// mrx : Artist List ↓
export default function Setting() {
  // mrx : states ↓

  return (
    <Grid item>
      <Grid
        container
        direction="row"
        justifyContent="center"
        style={{ marginTop: "17px" }}
      >
        {/* left side pc*/}
        <Hidden smDown>
          <Grid item className={ColStyle.side_wrapper}>
            <Grid item className={ColStyle.LeftSide_item}>
              <Grid item className={ColStyle.title}>
                Collection settings
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
        {/* left side mobile*/}
        <Hidden mdUp>
          <Grid item className={ColStyle.headerMobile}>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className="fs16fw500"><img src={arrowLeft.src} className={ColStyle.arrowLeft} />Collection settings</Grid>
              <Grid item>
                <Button color="primary" variant="contained" className={ColStyle.buttonSave}>
                  Save
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>

        {/* start middle */}
        <Grid item className={ColStyle.middle_wrapper}>
          <Grid item>
            <Statuse haveLock={true} />
          </Grid>
          <Grid item className={ColStyle.p_file}>
            <File
              label="Picture"
              placeHolder="Add a picture for the collectionn"
            />
          </Grid>
          <Grid item className="mt_20">
            <CustomSelect label="Collection type" placeHolder="Choose one">
              <p className={ColStyle.offlineText}>
                You’r Offline, that mean is your artworks are hidden
              </p>
            </CustomSelect>
          </Grid>
          <Grid item className="mt_20">
            <CustomSelect label="Medium category" placeHolder="Choose one">
              <p className={ColStyle.offlineText}>
                You’r Offline, that mean is your artworks are hidden
              </p>
            </CustomSelect>
          </Grid>
          <Grid item className="mt_20">
            <CustomSelect
              label="Collection name"
              placeHolder="I am a collection"
            >

            </CustomSelect>
          </Grid>
          <Grid item className="mt_20">
            <Apps isEmpty={false} />
          </Grid>
          <Grid item className="mt_20">
            <Collabrators />
          </Grid>
        </Grid>

        {/* start right side */}
        <Hidden smDown>
          <Grid item className={ColStyle.side_wrapper}>
            <Grid item className={ColStyle.two_button}>
              <Button
                startIcon={<Image src={closeIcon} />}
                className={ColStyle.discard}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<Image src={checkWhite} />}
                className={ColStyle.createButton}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    </Grid>
  );
}
