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
import Item from "./Item";
import TagsModalArtworks from "./TagsModalArtworks";

// gm : components ↓

export default function TagsModal({ open, handleModal }) {
  // gm : states ↓
  const [ModalTags, setModalTags] = useState(false)

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
                Tags
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
              {/* Item */}

              <Item setModal={setModalTags} title="Tags 001" NumArtwork="25"/>
              <Item setModal={setModalTags} title="Tags 001" NumArtwork="25"/>
              <Item setModal={setModalTags} title="Tags 001" NumArtwork="25"/>
              <Item setModal={setModalTags} title="Tags 001" NumArtwork="25"/>
              <Item setModal={setModalTags} title="Tags 001" NumArtwork="25"/>

              
            </Grid>
          </Grid>
        </Fade>
      </Modal>
      <TagsModalArtworks handleModal={()=>setModalTags(false)} open={ModalTags}/>
    </Grid>
  );
}
