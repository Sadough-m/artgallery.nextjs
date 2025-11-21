import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Checkbox, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import DeleteSvg from "../../../../public/images/icons/Remove red.svg";

// gm : components ↓
import Artwork from "./Artwork";
import CustomCheckBox from "../../../Forms/CustomCheckBox";

// ourData (Artists)
const artistData = [
  {
    id: 0,
    Artwork: "Black Swan",
    Artist: "Esther Howard",
    Limitted: "Limitted Ed",
    Cost: "$2000",
    Size: "x5",
    isChecked: false,
  },
  {
    id: 1,
    Artwork: "Black Swan",
    Artist: "Esther Howard",
    Limitted: "Limitted Ed",
    Cost: "$2000",
    Size: "x5",
    isChecked: false,
  },
];

export default function Table() {
  // gm : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [Shipping, setShipping] = useState(false)

  useEffect(() => {
    setArtists(artistData);
  }, [artistData]);

  // change status of checkBox
  const handleChange = (artistId) => {
    if (artistId === "allSelect") {
      let tempArtist = artists.map((artist) => {
        return { ...artist, isChecked: !allSelect };
      });
      setAllSelect(!allSelect);
      setArtists(tempArtist);
    } else {
      let tempArtist = artists.map((artist) =>
        artist.id === artistId
          ? { ...artist, isChecked: !artist.isChecked }
          : artist
      );
      setArtists(tempArtist);
    }
  };

  return (
    <Grid item className={Style.p_orders_items}>
      {/* title */}
      <div className={`${Style.box_title} ${Style.p_left}`}>
        <div className={`${Style.p_imgTable} ${Style.TitleFont}`}>Artwork</div>
        <div className={`${Style.webSite} ${Style.TitleFont}`}>
          Classification
        </div>
        <div className={`${Style.data} ${Style.TitleFont1}`}>Price</div>
        <div className={`${Style.Count} ${Style.TitleFont}`}>Count</div>
      </div>

      {/* Artworks */}
      {artists?.map((artist) => (
        <Artwork Data={artist} handleChange={handleChange}/>
      ))}

      <div className={`${Style.content_shipping2}  ${Style.p_left}`}>
        <div className={Style.CheckBox2}>
          <CustomCheckBox checked={Shipping} setChecked={setShipping}/>
        </div>
        <div className={Style.box}>
          <div className={Style.p_imgTable}>
            <div className="fw_500">Shipping</div>
            <div className={Style.DateText}>20 - 04 -2020</div>
          </div>
          <div className={Style.webSite}></div>
          <div className={Style.data}>$1,955.00</div>
          <div className={Style.Count}>
            <IconButton className={Style.Icondelete} size="small">
              <img src={DeleteSvg.src} />
            </IconButton>{" "}
            <span className={Style.NumCount}>×5</span>
          </div>
        </div>
      </div>
    </Grid>
  );
}
