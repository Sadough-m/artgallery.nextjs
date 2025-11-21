import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, IconButton, ClickAwayListener } from "@material-ui/core";

// good man : styles ↓
import ArtWorkFlowStyle from "../../../../styles/artworkflow.module.css";

// good man : files ↓
import deletIcon from "../../../../public/images/icons/Trash1.svg";
import dot from "../../../../public/images/icons/3dot.svg";
import zoomMobile from "../../../../public/images/icons/Zoom mobile.svg";

// good man : components ↓

export default function OptionsMobile({ handleDeleteItem, handleShowFullScreen, setSelecteditem, ID }) {
  // good man : states ↓
  const [openOption, setOpenOption] = useState(false);

  // handle Open option (for mobile)
  const hanldeOpenOption = () => {
    setOpenOption(!openOption);
  };

  // close option (for mobile)
  const hanldeCloseOption = () => {
    setOpenOption(false);
  };
  return (
    <ClickAwayListener onClickAway={hanldeCloseOption}>
      <Grid item className="posRel">
        <Grid item>
          <IconButton onClick={hanldeOpenOption} size='small'>
            <Image src={dot} />
          </IconButton>
        </Grid>
        {/* option select box for mobile */}
        {openOption && (

          <Grid item className={ArtWorkFlowStyle.P_allOptions}>
            <Grid container direction="column">
              <Grid
                item
                className={ArtWorkFlowStyle.p_option}
                onClick={() => {
                  handleShowFullScreen();
                  setSelecteditem(ID),
                    localStorage.setItem("SelctedMediaID", ID)
                }}
              >
                <Grid container>
                  <Grid item className={ArtWorkFlowStyle.imgZooom}>
                    <Image src={zoomMobile} />
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.text_option}>
                    Full screen
                  </Grid>
                </Grid>
              </Grid>

              <Grid
                item
                className={ArtWorkFlowStyle.p_option}
                onClick={hanldeCloseOption}
              >
                <Grid onClick={() => { handleDeleteItem(); console.log("mamad khobi") }} container>
                  <Grid item className={ArtWorkFlowStyle.imgZooom}>
                    <Image src={deletIcon} />
                  </Grid>
                  <Grid item className={ArtWorkFlowStyle.text_option}>
                    Remove
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

        )}
      </Grid>
    </ClickAwayListener>
  );
}
