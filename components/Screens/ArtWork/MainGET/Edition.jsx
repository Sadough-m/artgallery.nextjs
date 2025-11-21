import React, { useState, useEffect, useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { uuid } from 'uuidv4';

// mrx : material ui ↓
import { Button, Grid } from "@material-ui/core";

// mrx : context ↓
import { Context } from "../../../../context/index";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// rmx : files  ↓

// mrx : components ↓
import TableEdition from "../TableEdition";
// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
// import { GET_EDITION_WORKS } from "../../../../pages/api/index";

// mrx : api ↓
// import {
//   PostUrl,
//   PostAuthUrl,
//   GetUrl,
//   GetAuthUrl,
// } from "../../../../pages/api/config";

export default function Edition({
  GetData,
  is_inside = false,
  ShowOriginalAndReproduction,
  setShowOriginalAndReproduction
}) {

  return (
    <Grid item className="w_100">
      <Grid
        container
        alignItems="center"
        direction="column"
        className={
          is_inside ? ArtWorkFlowStyle.titleEditions1 : ArtWorkFlowStyle.box
        }
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="Editions"></span>

        <Grid item className={ArtWorkFlowStyle.titleAndButton}>
          <Grid container justifyContent="space-between">
            <Grid item className={`${ArtWorkFlowStyle.title}`}>
              Editions
            </Grid>
          </Grid>
        </Grid>

        <Grid item className="w_100">
          <TableEdition
            TableData={GetData}
            setShowOriginalAndReproduction={setShowOriginalAndReproduction}
            ShowOriginalAndReproduction={ShowOriginalAndReproduction}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
