import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { useRouter } from 'next/router';

// good man : material ui ↓
import { Grid } from "@material-ui/core";

// good man : styles ↓
import ArtFlowStyle from "../../../../styles/artworkflow.module.css";

// good man : files ↓
import editionPic from "../../../../public/images/edition.png";
import postPic1 from "../../../../public/images/post pic 1.png";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : context ↓
import { Context } from "../../../../context/index";

// good man : components ↓

// mrx : api links ↓
import {
  BASE_Image_Url
} from "../../../../pages/api/index";

export default function EditionItem({ Data, id_Ed, TypeIDForShowen, setTypeIDForShowen, handleEdition, name, Type, edtion }) {
  // mrx : states ↓
  const router = useRouter();

  // mrx : context Data Start ------------------------------------------------------------------------------------
  const {
    setSignleItemId,
    SignleItemId,
  } = useContext(Context);
  // mrx : End ---------------------------------------------------------------------------------------------------

  const [Image, setImage] = useState("")

  // set style background of edition
  const handleStyleBG = () => {
    if (id_Ed === edtion) {
      return ArtFlowStyle.editionActive
    }
    else return ArtFlowStyle.itemEdition
  }

  // set color font
  const handleColor = () => {
    if (id_Ed === edtion) {
      return 'white'
    }
    else return '#242328'
  }

  const handleChangeItem = () => {
    setSignleItemId(Data?.id);
    setTypeIDForShowen(Data?.subType)
    handleEdition(id_Ed);
  }

  // const checkImage = (url) => {
  //   var request = new XMLHttpRequest();
  //   request.open("GET", url, true);
  //   request.send();
  //   request.onload = function () {
  //     if (request.status == 200) // if(statusText == OK)
  //     {
  //       setImage(BASE_Image_Url + Data?.thumbnailUrl);
  //     } else {
  //       setImage("/images/artwork detail.png");
  //     }
  //   }
  // }

  // useEffect(() => {
  //   checkImage(BASE_Image_Url + Data?.thumbnailUrl);
  // }, [])

  return (
    <Grid item className={ArtFlowStyle.editionItem} onClick={() => handleChangeItem()}>
      <Grid item className={handleStyleBG()}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item className={ArtFlowStyle.P_editionPic}>
                <img
                  style={{
                    width: "60px",
                    height: "55px",
                    borderRadius: "5px"
                  }}
                  src={Data?.thumbnailUrl ? BASE_Image_Url + Data?.thumbnailUrl : Data?.thumbnailUrl} />
              </Grid>
              <Grid item className={ArtFlowStyle.titleEd} style={{ color: handleColor() }}>
                {
                  Type !== "Reproduction" ? (
                    <Grid item className={ArtFlowStyle.numEd}>
                      <span style={{ color: handleColor() }}>Limited Ed</span>
                    </Grid>
                  ) : (
                    <>
                      {name}
                    </>
                  )
                }
              </Grid>
            </Grid>
          </Grid>
          {
            Type !== "Reproduction" && (
              <Grid item className={ArtFlowStyle.numEd}>
                <span style={{ color: handleColor() }}>{name}  </span>
              </Grid>
            )
          }
        </Grid>
      </Grid>
    </Grid>
  );
}
