import React, { useState, useEffect } from "react";
import Image from "next/image";

// gm : material ui ↓
import {
  Button,
  Fade,
  Grid,
  Hidden,
  IconButton,
  Modal,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";

// gm : styles ↓
import style from "../../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../../public/images/icons/Close12.svg";
import ArrowRightSvg from "../../../../public/images/icons/ArrowRight.svg";
import ArrowLeftSvg from "../../../../public/images/icons/Arrow left -.svg";
import SearchSvg from "../../../../public/images/icons/Search.svg";
import TableArtwork from "../../../Screens/Orders/common/TableArtwork";

// gm : components ↓

export default function TagsModalArtworks({ open, handleModal }) {
  // gm : states ↓

  return (
    <Grid item>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleModal}
        closeAfterTransition
        className={style.newModal}
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Grid item className={style.wrapper_modal750}>
            {/* title */}
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item className={style.TitleModal}>
                <IconButton className={style.BackIcon} onClick={handleModal}>
                  <Image src={ArrowLeftSvg} />
                </IconButton>
                “Tag<Hidden smDown> name</Hidden>” artworks
              </Grid>
              <Grid item>
                <IconButton
                  size="small"
                  className={style.border_btn}
                  onClick={handleModal}
                >
                  <img src={closeIcon.src} />
                </IconButton>
              </Grid>
            </Grid>

            {/* body */}
            <Grid item className={style.bodyModal}>
              <Grid item className="posRel">
                <input
                  type="search"
                  placeholder="Search exhibition name"
                  className={style.inputSearchArtwork}
                />
                <img src={SearchSvg.src} className={style.tinySeachArtwork} />
              </Grid>
              <TableArtwork/>
            </Grid>

            {/* footer */}
            <Grid item style={{ marginTop: "25px" }}>
              <Button
                fullWidth
                color="primary"
                variant="contained"
                className={style.buttonModal}
              >
                Add Selected
              </Button>
            </Grid>

          </Grid>
        </Fade>
      </Modal>
    </Grid>
  );
}
