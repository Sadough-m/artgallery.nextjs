import React, { useState } from "react";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, Hidden } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Exhibition.module.css";

// gm : files ↓
import ImportSvg from "../../../../public/images/icons/importFile.svg";
import ThreeDSvg from "../../../../public/images/icons/3D.svg";
import AddMatterPort from "../../../Modals/Exhibition/AddMatterPort";
import useWindowSize from "../../../../Hooks/useWindowSize";

// gm : components ↓

export default function Media() {
  // gm : states ↓
  const [SelectedNote, setSelectedNote] = useState("Team");
  const [ModalMatterPort, setModalMatterPort] = useState(false);

  const HandleSelectedNote = (value) => {
    if (SelectedNote === value) {
      return true;
    } else return false;
  };

  const [width, height] = useWindowSize();

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Media
      </Grid>
      <Grid
        container
        alignItems="center"
        justifyContent="center"
        className={Style.Media}
        direction={width > 960 ? "column" : "row"}
      >
        <Grid item className={Style.ImgMedia}>
          <img src={ImportSvg.src} />
        </Grid>
        <Grid item className={Style.AddText}>
          Add file
        </Grid>
        <Hidden smDown>
          <Grid item className={Style.DropDownText}>
            Or drop files to upload
          </Grid>
        </Hidden>
      </Grid>
      <Button
        color="primary"
        startIcon={<img src={ThreeDSvg.src} />}
        className={Style.fitBtn_2}
        onClick={() => setModalMatterPort(true)}
      >
        Add 3D Matterport input
      </Button>
      {/* Modal */}
      <AddMatterPort
        open={ModalMatterPort}
        handleModal={() => setModalMatterPort(false)}
      />
    </Grid>
  );
}
