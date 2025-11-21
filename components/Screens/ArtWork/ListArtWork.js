import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

import { BASE_Image_Url } from "../../../pages/api/index";

// good man : styles ↓
import ArtWorkStyle from "../../../styles/artworkflow.module.css";

// good man : files ↓
import imageArt from "../../../public/images/list art.png";

// good man : components ↓
import CheckBoxTable from "../../Forms/CheckBoxTable";
import useWindowSize from "../../../Hooks/useWindowSize";

export default function ListArtWork({
  menuArtWork,
  dashboardOpen,
  artWorkDetail,
  ArtWorksData,
}) {
  // mrx : states ↓
  const [artworks, setArtworks] = useState([]);
  const [allSelect, setAllSelect] = useState(false);

  useEffect(() => {
    setArtworks(ArtWorksData);
  }, [ArtWorksData]);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  // change status of checkBox
  const handleChange = (artworkId) => {
    if (artworkId === "allSelect") {
      let tempArtist = artworks?.map((artwork) => {
        return { ...artwork, isChecked: !allSelect };
      });
      setAllSelect(!allSelect);
      setArtworks(tempArtist);
    } else {
      // console.log(artworkId)
      let tempArtist = artworks?.map((artwork) =>
        artwork.id === artworkId
          ? { ...artwork, isChecked: !artwork.isChecked }
          : artwork
      );
      setArtworks(tempArtist);
    }
  };

  const getpic = (image) => {
    if (image !== null) {
      return (
        <img
          src={BASE_Image_Url + image} className={ArtWorkStyle.ImgArtworks}
        />
      )
    } else {
      return (
        <img
          src={imageArt.src}
          className={ArtWorkStyle.ImgArtworks}
        />
      )
    }
  }

  return (
    <Grid item className={ArtWorkStyle.P_tableArtwork}>
      <table className={ArtWorkStyle.tableArtists}>
        <Hidden smDown>
          <tr className={ArtWorkStyle.header_table}>
            <th className={ArtWorkStyle.header_checkbox}>
              {/* check box all select */}
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artworks}
              />
            </th>

            <th className={ArtWorkStyle.headerArtwork}>Artwork</th>
            <th className={ArtWorkStyle.headerName}></th>
            <th className={ArtWorkStyle.headerArtistName}>Artist</th>
            <th className={ArtWorkStyle.headerPhone}>Statuse</th>

            {/* Condition for when slide menu is open or artwork detail is close */}
            {((dashboardOpen && !artWorkDetail) ||
              (!dashboardOpen && artWorkDetail) ||
              (!dashboardOpen && !artWorkDetail)) && (
                <>
                  <th className={ArtWorkStyle.headerEmail}>Medium</th>
                  <th className={ArtWorkStyle.headerPrice}>Price</th>
                </>
              )}
          </tr>
        </Hidden>

        {artworks?.map((artwork) => (
          <>
            <tr
              className={ArtWorkStyle.tableData}
              key={artwork.id}
              tabIndex="-1"
              
            >
              <td className={ArtWorkStyle.artist_checkBox}>
                <CheckBoxTable
                  artistId={artwork.id}
                  checked={artwork.isChecked}
                  handleChange={handleChange}
                  artists={artworks}
                />
              </td>

              <td className={ArtWorkStyle.artist_Pic} onClick={() => { menuArtWork(artwork); }}>
                {getpic(artwork?.thumbnailUrl)}
              </td>

              <td className={ArtWorkStyle.nameArtwork}  onClick={() => { menuArtWork(artwork); }}>{artwork.title}</td>
              <td className={ArtWorkStyle.infoArtist}  onClick={() => { menuArtWork(artwork); }}>
                {artwork.artistsNames[0]}
              </td>
              <td className={ArtWorkStyle.artistStatus}  onClick={() => { menuArtWork(artwork); }}>{artwork.statuse}</td>

              {/* Condition for when slide menu is open or detail art work is close */}
              {((dashboardOpen && !artWorkDetail) ||
                (!dashboardOpen && artWorkDetail) ||
                (!dashboardOpen && !artWorkDetail)) && (
                  <>
                    <td className={ArtWorkStyle.artworkMedium}  onClick={() => { menuArtWork(artwork); }}>
                      {artwork.mediumName}
                    </td>
                    <td className={ArtWorkStyle.artworkPrice}  onClick={() => { menuArtWork(artwork); }}>
                      {artwork?.price === -1 || artwork?.price === 0 ? "" : "$" + artwork?.price}
                    </td>
                  </>
                )}
            </tr>

            {/* <Hidden mdUp>
              <span className={ArtWorkStyle.lineTable}></span>
            </Hidden> */}
          </>
        ))}
      </table>
    </Grid>
  );
}
