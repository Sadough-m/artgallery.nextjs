import React, { useState } from "react";

// mrx : material ui ↓
import Grid from "@material-ui/core/Grid";

// mrx : Styles ↓
import ArtWorkFlowStyle from "../../../../../styles/artworkflow.module.css";
import styles from "../../../../../styles/Home.module.css";

// mrx : setCookies with this
import Cookies from "js-cookie";

// rmx : files  ↓

// mrx : components ↓
import AddFileUnique from "../../AddFile/Single/Limited/indexGE";
import useWindowSize from "../../../../../Hooks/useWindowSize";

export default function Media({
  UploadingFileMedia,
  SignleItemId,
  setAllMediaData,
  setUploadingFileMedia
}) {
  // mrx : get collection id from localstorage
  const LocalClassificationID = parseInt(Cookies.get("ClassificationID"));

  // reconizes size of page
  const [width, height] = useWindowSize();

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
        <Grid item className={`${styles.w_100}`}>
          <AddFileUnique
            SignleItemId={SignleItemId}
            setAllMediaData={setAllMediaData}
            setUploadingFileMedia={setUploadingFileMedia}
            UploadingFileMedia={UploadingFileMedia}
          />
        </Grid>
      </Grid>

    </Grid>
  );
}
