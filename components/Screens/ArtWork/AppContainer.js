import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import logo from "../../../public/images/app name logo1.png";
import infoIcon from "../../../public/images/icons/Info gray.svg";
import Info from "./Info";

// good man : components ↓

export default function AppContainer({
  title,
  description,
  onClick,
  Item,
  SelectedID,
}) {
  // mrx : states ↓

  const handleShowActiveItem = () => {
    if (Item?.id === SelectedID) {
      return ArtWorkStyle.wrapper_appContainer_active;
    } else {
      return ArtWorkStyle.wrapper_appContainer;
    }
  };

  const ShowToolTip = () => {
    if (Item?.id === 1) {
      return (
        <>
          <Grid item>
            Physical creations include paintings, sculptures, performances, ...
            learn more about{" "}
            <span className={ArtWorkStyle.greenLink}>Physical creation</span> .
            {/* {info} */}
          </Grid>
          <span className={ArtWorkStyle.square_info}></span>
        </>
      );
    } else if (Item?.id === 0) {
      return (
        <>
          <Grid item>
          Digital creations include pxiel art, photography, 3D model , ...
            learn more about{" "}
            <span className={ArtWorkStyle.greenLink}>Digital creation</span> .
            {/* {info} */}
          </Grid>
          <span className={ArtWorkStyle.square_info}></span>
        </>
      );
    } else if (Item?.id === 2) {
      return (
        <>
          <Grid item>
            Bi-medium creations include a physial creation that also have digtal
            version or vice versa. Learn more about{" "}
            <span className={ArtWorkStyle.greenLink}>Bi-medium creation</span> .
            {/* {info} */}
          </Grid>
          <span className={ArtWorkStyle.square_info}></span>
        </>
      );
    }
  };

  return (
    <Grid onClick={() => onClick()} item className={handleShowActiveItem()}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="flex1">
          <Grid container alignItems="center">
            <Grid item className={ArtWorkStyle.P_logo_app}>
              <Image src={logo} />
            </Grid>
            <Grid item className={ArtWorkStyle.widthTextApp}>
              <Grid container direction="column">
                <Grid item className={ArtWorkStyle.titleAppName}>
                  {title}
                </Grid>
                <Grid item className={ArtWorkStyle.fontGray12}>
                  {description}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Info>
          {ShowToolTip()}
        </Info>

      </Grid>
    </Grid>
  );
}
