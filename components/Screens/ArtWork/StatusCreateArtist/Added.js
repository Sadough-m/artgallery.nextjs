import React, { useState } from "react";
import Image from "next/image";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import { IconButton } from "@material-ui/core";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓
import pic from "../../../../public/images/icons/pic guy1.svg";
import close from "../../../../public/images/icons/Close dark.svg";
import { BASE_Image_Url } from "../../../../pages/api";

// mrx : components ↓

export default function Added({
  CanRemove,
  locked,
  SelectInputData,
  Item,
  handleRemove
}) {

  return (
    <Grid style={{ cursor: CanRemove === false ? "unset" : "pointer" }} item className={ArtWorkFlowStyle.BG_FindUser1}>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={ArtWorkFlowStyle.bgGray}
      >
        <Grid item>
          <Grid
            container
            className={ArtWorkFlowStyle.wrapper_foundUser}
            alignItems="center"
            spacing={1}
          >
            <Grid item className={ArtWorkFlowStyle.mt_5}>
              <img
                style={{ width: '25px' }}
                src={BASE_Image_Url + Item?.image}
                width="22px"
                height="22px"
                className={ArtWorkFlowStyle.img_circle}
              />
            </Grid>
            <Grid item className={ArtWorkFlowStyle.fs14}>
              {
                Item?.id === SelectInputData?.artistId ? (
                  "Me"
                ) : (
                  Item?.name
                )
              }
            </Grid>
          </Grid>
        </Grid>
        {
          Item?.id !== SelectInputData?.artistId && locked === false && (
            <Grid item className={ArtWorkFlowStyle.close_artist}>
              <IconButton onClick={() => handleRemove(Item?.id)} size="small">
                <Image src={close} />
              </IconButton>
            </Grid>
          )
        }
      </Grid>
    </Grid>
  );
}
