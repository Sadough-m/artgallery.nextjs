import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Orders.module.css";

// good man : files ↓
import trashSvg from "../../../../public/images/icons/Trash1.svg";
import PdfSvg from "../../../../public/images/icons/PDF.svg";

// good man : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTable";
import RemoveItem from "../../../Modals/Orders/RemoveItem";
import LoadingSpinerSvg from "../../../../public/loading.svg";
import ArchiveItem from "../../../Modals/Orders/ArchiveItem";
import unArchiveIcon from "../../../../public/images/icons/unArchive.svg";
import trashIcon from "../../../../public/images/icons/Trash1.svg";

export default function TableOrders({
  category,
  sortBy,
  ModalArchive,
  setModalArchive,
  tag,
  handleArchiveOrder,
  LoadingData,
  data,
  setOrderList,
  setSelectedDraftID,
  searchTerm,
  TypeFilter,
  SortFilter,
}) {  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [IsArchive, setIsArchive] = useState(false);

  useEffect(() => {
    setArtists(data);
  }, [data]);

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

  const handleRemoveOrder = () => {

  }

  return (
    <Grid item className={Style.p_table_13}>
      <Hidden smDown>
        <table style={{ position: "relative" }} className={Style.tableArtists}>
          <tr className={Style.header_table}>
            <th className={Style.H_Check}>
              {/* check box all select */}
              <CheckBoxTable
                artistId="allSelect"
                handleChange={handleChange}
                artists={artists}
                checked={artists.isChecked}
              />
            </th>

            <th className={Style.H_Channel}>Channels</th>
            <th className={Style.H_Customer}>Customer</th>
            <th className={Style.H_Order}>Order number</th>
            <th className={Style.H_Date}>Date</th>
            <th className={Style.H_Statuse}>Statuse</th>
            <th className={Style.H_Total}>Total</th>
            <th className={Style.H_Delete}></th>
            <th className={Style.H_Pdf}></th>
            <span className={Style.lineTable}></span>
          </tr>
          <div className={Style.MainLoading}>
            {LoadingData ? (
              <img style={{ width: "60px" }} src={LoadingSpinerSvg.src} />
            ) : (
              <></>
            )}
          </div>

          {artists?.map((artist) => (
            <>
              <tr className={Style.tableData} key={artist.id}>
                <td className={Style.B_Check}>
                  <CheckBoxTable
                    artistId={artist.id}
                    handleChange={handleChange}
                    artists={artists}
                    checked={artist.isChecked}
                  />
                </td>

                <td className={Style.B_Channel}>{artist.channelName}</td>

                <td className={Style.B_Customer}>
                  {artist.customerFullName}
                  <span className={Style.TypeArt}>{artist.customerKnownas}</span>
                </td>

                <td className={Style.B_Order}>{artist.orderNumber}</td>
                <td className={Style.B_Date}>{artist.date}</td>
                <td className={Style.B_Statuse}>{artist.orderStatusName}</td>
                <td className={Style.B_Total}>{artist.totalAmount}</td>
                <td className={Style.B_Delete}>
                  <IconButton onClick={() => {
                    setModalArchive(true);
                    localStorage.setItem("removing-item-name", artist?.orderNumber);
                    localStorage.setItem("removing-item-id", artist?.id);
                    setIsArchive(artist?.isArchived);
                  }}>
                    {artist?.isArchived ? (
                      <img src={unArchiveIcon.src} width={21} />
                    ) : (
                      <img
                        src={trashIcon.src}
                        className={Style.TrashIc}
                      />
                    )}
                    <Image src={trashSvg} />
                  </IconButton>
                </td>
                <td className={Style.B_Pdf}>
                  <IconButton>
                    <Image src={PdfSvg} />
                  </IconButton>
                </td>
                <span className={Style.lineTable}></span>
              </tr>
            </>
          ))}
        </table>
      </Hidden>

      <Hidden mdUp>
        <>
          {artists?.map((artist) => (
            <Grid item className={Style.OrdersMobile}>
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Grid item>
                    <Grid container>
                      <Grid item>
                        <CheckBoxTable
                          artistId={artist?.id}
                          handleChange={handleChange}
                          artists={artists}
                          checked={artist?.isChecked}
                        />
                      </Grid>
                      <Grid item className={Style.ChannelMobile}>{artist?.channelName}</Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item>
                  <IconButton size="small" className={Style.PdfMobile}>
                    <img src={PdfSvg.src} />
                  </IconButton>
                  <IconButton size="small" onClick={() => {
                    setModalArchive(true);
                    localStorage.setItem("removing-item-name", artist?.orderNumber);
                    localStorage.setItem("removing-item-id", artist?.id);
                  }}>
                    <img src={trashSvg.src} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item className={Style.InfoMobile}>
                <Grid item className={Style.CustomerMobile}>{artist.customerFullName} <span className={Style.TypeArt}>{artist?.customerKnownas}</span></Grid>
                <Grid item className={Style.OrderNumMobile}>{artist.orderNumber} <span className={Style.DateMobile}>{artist.date}</span></Grid>
                <Grid item className={Style.TotalMobile}>{artist.orderStatusName} <span className={Style.TotalAmount}>{artist.totalAmount}</span></Grid>
              </Grid>
            </Grid>
          ))}
        </>
      </Hidden>
      <ArchiveItem
        IsArchive={IsArchive}
        open={ModalArchive}
        handleModal={() => setModalArchive(false)}
        handleArchiveOrder={handleArchiveOrder}
      />
    </Grid>
  );
}
