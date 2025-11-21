import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Grid, Hidden } from "@material-ui/core";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

//rs : get methods helper
import { BASE_Image_Url } from "../../../pages/api/index";

// good man : files ↓
import picTestArt from "../../../public/images/pic for artwork.png";
import useWindowSize from "../../../Hooks/useWindowSize";

// good man : components ↓
export default function ArtWorks({ item, onClick, menuArtWork }) {
  // mrx : states ↓
  const [Image, setImage] = useState("")

  // recognize the size of page
  const [width, height] = useWindowSize();

  // const checkImage = (url) => {
  //   var request = new XMLHttpRequest();
  //   request.open("GET", url, true);
  //   request.send();
  //   request.onload = function () {
  //     if (request.status == 200) //if(statusText == OK)
  //     {
  //       setImage(BASE_Image_Url + item?.thumbnailUrl)
  //     } else {
  //       setImage("/images/artwork detail.png")
  //     }
  //   }
  // }

  // useEffect(() => {
  //   checkImage(BASE_Image_Url + item?.thumbnailUrl)
  // }, [])

  const getPic = () => {
    if (item?.thumbnailUrl !== null) {
      return (
        <img
          src={BASE_Image_Url + item?.thumbnailUrl}
          // src={Image}
          className={ArtWorkStyle.img_Grid_Artwork}
        />
      );
    } else {
      return <img src={picTestArt} className={ArtWorkStyle.img_Grid_Artwork} />;
    }
  };

  const getPicMobile = () => {
    if (item?.thumbnailUrl !== null) {
      return (
        <img
          src={BASE_Image_Url + item?.thumbnailUrl}
          className={ArtWorkStyle.imgArtworkMobile}
        />
      );
    } else {
      return <img src={picTestArt}
        className={ArtWorkStyle.imgArtworkMobile}
      />;
    }
  };

  return (
    <>
      {width > 960 && (
        <Grid onClick={onClick} style={{ margin: "10px 5px " }} item>
          <Grid container spacing={1}>
            <Grid item className={`${ArtWorkStyle.P_img_Grid_Artwork} `}>
              {getPic()}
              <span className={ArtWorkStyle.type_art1}>{item?.mediumName}</span>
              <span className={ArtWorkStyle.white_nav}></span>
              <span className={ArtWorkStyle.overly_bg}></span>
              <Grid item className={ArtWorkStyle.P_info_artwork}>
                <Grid container direction="column" spacing={2}>
                  <Grid item>
                    <span className={ArtWorkStyle.type_art}>
                      {item?.mediumName}
                    </span>
                  </Grid>

                  <Grid item>
                    <Grid container direction="column" spacing={1}>
                      <Grid item className={ArtWorkStyle.art_desk}>
                        {item?.title}
                      </Grid>
                      <Grid item className={ArtWorkStyle.name_artist}>
                        {item?.artistsNames[0]}
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item className={ArtWorkStyle.price_art}>
                    {item?.price === -1 || item?.price === 0 ? "" : "$" + item?.price}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
      {width < 960 && (
        <Grid item style={{ marginTop: "20px" }} onClick={onClick}>
          <Grid container direction="column">
            <Grid item className={ArtWorkStyle.p_artworkMobile}>
              <Grid container >
                <Grid item style={{marginRight:'14px'}}>
                  {getPicMobile()}
                </Grid>
                <Grid item className="flex1">
                  <Grid container direction="column">
                    <Grid item>
                      <div item className={ArtWorkStyle.type_art_mobile}>
                        {item?.mediumName}
                      </div>
                    </Grid>
                    <Grid item className={ArtWorkStyle.art_desk_mobile}>
                      {item?.title}
                    </Grid>
                    <Grid item className={ArtWorkStyle.name_artist_mobile}>
                      {item?.artistsNames[0]}
                    </Grid>
                    <Grid item className={ArtWorkStyle.price_art_mobile}>
                      {item?.price === -1 || item?.price === 0 ? "" : "$" + item?.price}
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {/* for mobile */}
    </>
  );
}
