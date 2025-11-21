import React, { useState } from "react";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";
import styles from "../../../../styles/Home.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// rmx : files  ↓

// mrx : components ↓
import AddFileUnique from "../AddFile/Unique/index";
import AddFileLimited from "../AddFile/Limited/index";
import AddFileReproduction from "../AddFile/Reproduction/index";
import useWindowSize from "../../../../Hooks/useWindowSize";

export default function Media({ setAllMediaLimited, setAllMediaUnique }) {
  // mrx : get collection id from localstorage
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));

  // reconizes size of page
  const [width, height] = useWindowSize()

  const generateAddFile = () => {
    if (LocalClassificationID === 0) {
      return (
        <Grid item className={`${styles.w_100}`}>
          <AddFileUnique
            setAllMediaUnique={setAllMediaUnique}
          />
        </Grid>
      )
    } else if (LocalClassificationID === 1) {
      return (
        <Grid item className={`${styles.w_100}`}>
          <AddFileLimited
            setAllMediaLimited={setAllMediaLimited}
          />
        </Grid>
      )
    } else if (LocalClassificationID === 2) {
      return (
        <Grid item className={`${styles.w_100}`}>
          <AddFileReproduction />
        </Grid>
      )
    } else {
      return (
        <></>
      )
    }
  }

  return (
    <Grid item>
      <Grid
        container
        direction="column"
        className={width > 960 ? ArtWorkFlowStyle.box : ''}
      >
        <span className={ArtWorkFlowStyle.obj_for_id} id="Media"></span>

        <Grid item className={`${ArtWorkFlowStyle.title}`}>
          Media
        </Grid>
        {
          generateAddFile()
        }

      </Grid>
      {/* <DragAndDropCo /> */}

    </Grid>
  );
}
