import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid, IconButton,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../styles/Star.module.css";

// gm : files ↓
import testPng from "../../../../../public/images/list art.png";
import DeleteSvg from "../../../../../public/images/icons/Remove red.svg";

// gm : components ↓

export default function Artwork() {
    // gm : states ↓

    return (
        <div className={Style.content}>
          <div className={Style.box}>
            <div className={Style.p_imgTable}>
              <img src={testPng.src} className={Style.ImgArtworkNew}/>
              <div className={Style.p_art_artist}>
                <div className={Style.artworkName}>Black SWAN</div>
                <div className={Style.artistName}>Sohrab Sepehri</div>
              </div>
            </div>

            <div className={Style.webSite}>Lmtd Ed - 01/12</div>
            <div className={Style.data}>$1,955.00</div>
            <div className={Style.Count}>
              <span className={Style.C_Count}>×1</span>
              <IconButton size="small" className={Style.Rm_btn}>
                <img src={DeleteSvg.src}/>
              </IconButton>
            </div>
          </div>
        </div>
    )
}