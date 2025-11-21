import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid, IconButton,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import testPng from "../../../../../public/images/list art.png";

// gm : components ↓

export default function Artwork() {
    // gm : states ↓

    return (
        <div className={Style.content}>
          <div className={Style.box}>
            <div className={Style.p_imgTable}>
              <img src={testPng.src} className={Style.ImgArtwork}/>
              <div className={Style.p_art_artist}>
                <div className={Style.artworkName}>Black SWAN</div>
                <div className={Style.artistName}>Sohrab Sepehri</div>
              </div>
            </div>

            <div className={Style.webSite}>Lmtd Ed - 01/12</div>
            <div className={Style.data}>$1,955.00</div>
            <div className={Style.Count}>×1</div>
          </div>


          
        </div>
    )
}