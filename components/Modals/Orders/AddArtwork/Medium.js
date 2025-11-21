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
import Orderstyle from "../../../../styles/Home.module.css";

// gm : files ↓
import closeIcon from "../../../../public/images/icons/Close12.svg";
import ArrowRightSvg from "../../../../public/images/icons/ArrowRight.svg";
import ArrowLeftSvg from "../../../../public/images/icons/Arrow left -.svg";
import MediumArtworks from "./MediumArtworks";
import Item from "./Item";

// gm : components ↓

export default function Medium({
  handleModal,
  setModalType,
  handleGetModalData,
  ModalData
}) {
  // gm : states ↓
  const [ArtworksMedium, setArtworksMedium] = useState(false)

  return (
    <Grid item>
      {/* title */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className={style.TitleModal}>
          <IconButton className={style.BackIcon} onClick={() => {
            setModalType(0); handleGetModalData(null, null, null, [], false)
          }}>
            <Image src={ArrowLeftSvg} />
          </IconButton>
          {ModalData?.modalTitle}
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
      <Grid style={{ maxHeight: "400px" }} item className={`${style.bodyModal} ${style.P_tableArtists_MobileScroll}`}>
        {/* Item */}
        {
          ModalData?.listMenu && ModalData?.listMenu?.map((item) => (
            <Item
              title={item?.title}
              NumArtwork={item?.count}
              onClick={() => { handleGetModalData(2, item?.id, null, [], false); setArtworksMedium(true) }}
            />
          ))
        }

      </Grid>
      <MediumArtworks open={ArtworksMedium} handleModal={() => setArtworksMedium(false)} />
    </Grid>
  );
}
