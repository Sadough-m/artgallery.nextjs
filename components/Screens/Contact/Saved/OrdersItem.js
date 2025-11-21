import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


// gm : material ui ↓
import {
    Grid, IconButton,
} from '@material-ui/core';

// gm : styles ↓
import Style from "../../../../styles/Contacts.module.css";

// gm : files ↓
import testPng from "../../../../public/images/list art.png";
import pdfSvg from "../../../../public/images/icons/PDF.svg";

// gm : components ↓

export default function OrdersItem() {
    // gm : states ↓

    return (
        <div className={Style.content}>
          <div className={Style.box}>
            <div className={Style.p_imgTable}>
              <img src={testPng.src} />
              <div className={Style.p_art_artist}>
                <div className={Style.artworkName}>Black SWAN</div>
                <div className={Style.artistName}>Sohrab Sepehri</div>
              </div>
            </div>

            <div className={Style.webSite}>Website</div>
            <div className={Style.data}>28/10/2021</div>
            <div className={Style.price}>$1,955.00</div>
            <div className={Style.iconPdf}>
              <IconButton>
                <Image src={pdfSvg} />
              </IconButton>
            </div>
          </div>
        </div>
    )
}