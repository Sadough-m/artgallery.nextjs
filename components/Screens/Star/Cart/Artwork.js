import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import testPng from "../../../../public/images/list art.png";
import DeleteSvg from "../../../../public/images/icons/Remove red.svg";
import CheckBoxTable from "../../../Forms/CheckBoxTable";

// gm : components ↓

export default function Artwork({ Data, handleChange }) {
  // gm : states ↓

  return (
    <div className={Style.content}>
      <div className={Style.CheckBox}>
        <CheckBoxTable
          artistId={Data.id}
          handleChange={handleChange}
          artists={Data}
          checked={Data.isChecked}
        />
      </div>
      <div className={`${Style.box} ${Style.p_left}`}>
        <div className={Style.p_imgTable}>
          <img src={testPng.src} className={Style.ImgArtworkNew} />
          <div className={Style.p_art_artist}>
            <div className={Style.artworkName}>{Data.Artwork}</div>
            <div className={Style.artistName}>{Data.Artist}</div>
          </div>
        </div>

        <div className={Style.webSite}>{Data.Limitted}</div>
        <div className={Style.data}>{Data.Cost}</div>
        <div className={Style.Count}>
          <span className={Style.C_Count}>{Data.Size}</span>
          <IconButton size="small" className={Style.Rm_btn}>
            <img src={DeleteSvg.src} />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
