import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// good man : styles ↓
import styles from "../../../styles/Home.module.css";
import signUpStyle from "../../../styles/signUp.module.css";

// good man : files ↓
import ArrowLeft from "../../../public/images/icons/Arrow left -.svg";

// good man : components ↓

export default function Steps({ step, isCreator, text, link = "" }) {
  // mrx : states ↓

  return (
    <>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={`${signUpStyle.steps__font}`}>
          {link !== "" && (
            <Grid container alignItems="center">
              <Grid item>
                <Link href={link}>
                  <IconButton size="small">
                    <Image src={ArrowLeft} />
                  </IconButton>
                </Link>
              </Grid>
              <Grid item>Back</Grid>
            </Grid>
          )}
        </Grid>
        <Grid
          item
          className={`${styles.text__Primary} ${signUpStyle.steps__font}`}
        >
          {text}
        </Grid>
      </Grid>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={signUpStyle.steps}
      >
        <Grid
          item
          className={`${step >= 1 ? signUpStyle.spanTagActive : signUpStyle.spanTag
            } ${signUpStyle.border_radius_Left}`}
        ></Grid>
        <Grid
          item
          className={`${step >= 2 ? signUpStyle.spanTagActive : signUpStyle.spanTag
            } `}
        ></Grid>
        <Grid
          item
          className={`${step >= 3 ? signUpStyle.spanTagActive : signUpStyle.spanTag
            }`}
        ></Grid>
        {
          isCreator !== true ? (
            <Grid
              item
              className={`${step >= 4 ? signUpStyle.spanTagActive : signUpStyle.spanTag
                } ${signUpStyle.border_radius_Right}`}
            ></Grid>
          ) : (
            <></>
          )
        }
      </Grid>
    </>
  );
}
