import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Orders.module.css";

// good man : files ↓
import ArtworkPng from "../../../../public/images/list art.png";

// good man : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTableMrx";
import { BASE_Image_Url } from "../../../../pages/api";

export default function TableArtwork({
  ModalData,
  AddedArtworks,
  setAddedArtworks
}) {
  // mrx : states ↓
  const [Artwork, setArtwork] = useState([]);

  useEffect(() => {
    setArtwork(ModalData?.artworks);
  }, [ModalData])

  const handleAddArtwork = (st = false, ID) => {
    if (st == true) {
      if (AddedArtworks?.length === Artwork.length) {
        setAddedArtworks([]);
      } else {
        setAddedArtworks(Artwork?.map((item) => item?.id));
      }
    } else {
      if (AddedArtworks?.filter((item) => item === ID)?.length) {
        setAddedArtworks(AddedArtworks?.filter((item) => item !== ID));
      } else {
        setAddedArtworks((prev) => [...prev, ID]);
      }
    }
  }

  console.log("mamad" + AddedArtworks)

  return (
    <Grid item className={Style.p_table}>
      <div className={Style.P_tableArtists_MobileScroll}>
        <table className={Style.tableArtists_MobileScroll}>
          <tr className={Style.header_table}>
            <th className={Style.header_checkbox}>
              {/* check box all select */}
              <CheckBoxTable
                Data={Artwork}
                AddedArtworks={AddedArtworks}
                setAddedArtworks={setAddedArtworks}
                onClick={() => handleAddArtwork(true, 0)}
                ID={0}
              />
            </th>
            <th className={Style.headerArtist}>Artwork</th>
            <th className={Style.headerName}></th>
            <th className={Style.headerPhone}>Artist</th>
            <th className={Style.headerCost}>Cost</th>
            <th className={Style.headerPhone}>Medium</th>
          </tr>

          {Artwork?.map((item) => (
            <>
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleAddArtwork(false, item?.id)}
                className={Style.tableData_old}
                key={item.id}
              >
                <td className={Style.artist_checkBox}>
                  <CheckBoxTable
                    Data={Artwork}
                    AddedArtworks={AddedArtworks}
                    setAddedArtworks={setAddedArtworks}
                    // onClick={() => handleAddArtwork(false, item?.id)}
                    ID={item?.id}
                  />
                </td>

                <td className={Style.artist_Pic}>
                  <img src={BASE_Image_Url + item.thumbnailUrl} className={Style.imgArtworkModal} />
                </td>

                <td className={Style.nameArtist}>{item.title}</td>

                <td className={Style.PhoneArtist}>{item.artistsNames && item.artistsNames[0]}</td>
                <td className={Style.emailArtist}>{item?.price !== -1 && item?.priceUintName !== null && item?.priceUintName + item?.price}</td>
                <td className={Style.emailArtist}>{item.subMediumName}</td>
              </tr>
            </>
          ))}
        </table>
      </div>
    </Grid>
  );
}
