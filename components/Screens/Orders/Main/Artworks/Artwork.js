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
import DeleteSvg from "../../../../../public/images/icons/Remove red.svg";
import { BASE_Image_Url } from '../../../../../pages/api';

// gm : components ↓

export default function Artwork({ Item, removeItem }) {
  // gm : states ↓

  return (
    <>
      {
        parseInt(Item?.type) === 0 ? (
          <div className={Style.content}>
            <div className={Style.box}>
              <div className={Style.p_imgTable}>
                <img src={BASE_Image_Url + Item?.thumbnailUrl} className={Style.ImgArtwork} />
                <div className={Style.p_art_artist}>
                  <div className={Style.artworkName}>{Item?.title}</div>
                  <div className={Style.artistName}>{Item?.artistsNames?.slice(0, 1)?.map((item) => item)}</div>
                </div>
              </div>

              <div className={Style.webSite}>{Item?.classification}</div>
              <div className={Style.data}>{Item?.priceUint}{Item?.price}</div>
              <div className={Style.Count}>
                <span className={Style.C_Count}>×{Item?.quantity}</span>
                <IconButton
                  size="small"
                  className={Style.Rm_btn}
                  onClick={() => removeItem(Item?.id)}
                >
                  <img src={DeleteSvg.src} />
                </IconButton>
              </div>
            </div>
          </div>
        ) : (
          <div className={Style.content_shipping}>
            <div className={Style.box}>
              <div className={Style.p_imgTable}>
                <div className="fw_500">{Item?.title}</div>
                <div className={Style.DateText}>Custom item</div>
              </div>
              <div className={Style.webSite}></div>
              <div className={Style.data}>{Item?.priceUint}{Item?.price}</div>
              <div className={Style.Count}>
                <IconButton onClick={() => removeItem(Item?.id)} className={Style.Icondelete} size="small">
                  <img src={DeleteSvg.src} />
                </IconButton>{" "}
                <span className={Style.NumCount}>×{Item?.quantity}</span>
              </div>
            </div>
          </div>
        )
      }
    </>
  )
}