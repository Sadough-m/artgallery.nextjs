import React, { useState } from "react";
import Image from "next/image";

// good man : styles ↓
import HeaderStyles from "../../../styles/Header.module.css";

// good man : material ui ↓
import { Button, Grid } from "@material-ui/core";

// good man : file ↓
import ImgTest1 from "../../../public/images/collection1.png";
import ImgTest2 from "../../../public/images/col test2.png";
import ImgTest3 from "../../../public/images/col test3.png";
import websiteIcon from "../../../public/images/icons/Website.svg";

import ItemCol from "./ItemCol";

// good man : Components ↓

export default function Collection({ selectCollection, itemCol }) {
  // good man : set which collection selected

  return (
    <Grid item className={HeaderStyles.Bg_Collection}>
      <span className={HeaderStyles.Square}></span>
      <Grid container direction="column" spacing={2} alignItems="center">
        <ItemCol
          itemCol={itemCol}
          id="col1"
          selectCollection={selectCollection}
          title="collection"
          img={ImgTest1}
        />
        <ItemCol
          itemCol={itemCol}
          id="col2"
          selectCollection={selectCollection}
          title="Discvoer"
          img={ImgTest2}
        />
        <ItemCol
          itemCol={itemCol}
          id="col3"
          selectCollection={selectCollection}
          title="Contact instead"
          img={ImgTest3}
        />
      </Grid>{" "}
      <span className={HeaderStyles.line}></span>
      <Grid item className={HeaderStyles.P_button_mainWeb}>
        <Button
          startIcon={<Image src={websiteIcon} />}
          className={HeaderStyles.button_main}
        >
          Main website
        </Button>
      </Grid>
    </Grid>
  );
}
