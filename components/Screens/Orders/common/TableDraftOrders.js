import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import Link from "next/link";

// good man : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";

// good man : styles ↓
import Style from "../../../../styles/Orders.module.css";
import StyleSw2 from "../../../../styles/Contacts.module.css";

// good man : files ↓
import trashSvg from "../../../../public/images/icons/Trash1.svg";
import DuplicateSvg from "../../../../public/images/icons/Duplicate.svg";
import ArrowRightSvg from "../../../../public/images/icons/Arrow right blue.svg";

// good man : components ↓
import CheckBoxTable from "../../../Forms/CheckBoxTable";
import RemoveItem from "../../../Modals/Orders/RemoveItem";
import ArchiveItem from "../../../Modals/Orders/ArchiveItem";
import useWindowSize from "../../../../Hooks/useWindowSize";
import LoadingSpinerSvg from "../../../../public/loading.svg";

import {
  REMOVE_DRAFT_ORDER,
  BASE_Image_Url,
  ARHIVE_CONTACT,
} from "../../../../pages/api/index";

//rs : urls  and api helper methods
import { GetAuthUrl, PostAuthUrl, DeleteAuthUrl, GetUrl } from "../../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../../context/index";

export default function TableDraftOrders({
  category,
  sortBy,
  tag,
  LoadingDraftData,
  handleSaveDraft,
  LoadingData,
  data,
  setDraftOrderList,
  setSelectedDraftID,
  handleArchiveDraftOrder,
  searchTerm,
  TypeFilter,
  SortFilter,
}) {
  // mrx : states ↓
  const router = useRouter();
  // mrx : states ↓
  const [artists, setArtists] = useState([]);
  const [allSelect, setAllSelect] = useState(false);
  const [openArchiveMd, setopenArchiveMd] = useState(false);
  const [FullName, setFullName] = useState("");
  const [ContactID1, setContactID1] = useState("");

  const [ModalRemove, setModalRemove] = useState(false);
  const [ModalArchive, setModalArchive] = useState(false);

  // mrx : recocnize the page size
  const [width, height] = useWindowSize();

  useEffect(() => {
    setArtists(data);
    setFullName(
      (data[0]?.name ? data[0]?.name : "") +
      " " +
      (data[0]?.lastName ? data[0]?.lastName : "")
    );
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
        artist?.artistId === artistId
          ? { ...artist, isChecked: !artist?.isChecked }
          : artist
      );
      setArtists(tempArtist);
    }
  };

  // open and close modal archive
  const handleArchiveMd = () => {
    if (FullName) {
      setopenArchiveMd(true);
      localStorage.setItem("artist-archiving-name", FullName && FullName);
    } else {
      toast.info("Please wait for a moment");
    }
  };

  const handleArchiveMdRightNow = () => {
    handleArchiveContact();
    setopenArchiveMd(!openArchiveMd);
  };

  // mrx : archive contact
  const handleArchiveContact = () => {
    PostAuthUrl(ARHIVE_CONTACT(localStorage.getItem("collectionId")), {
      collectionId: localStorage.getItem("collectionId"),
      contactId: ContactID1,
      saved: saved,
      search: search,
      tag: tag,
      category: category,
      lastActivity: lastActivity,
      sortBy: sortBy,
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(`successfully Done`);
          setDraftOrderList(res.data.data);
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

  // mrx : archive contact
  const handleRemoveDraftOrder = (ContactID, DraftID) => {
    PostAuthUrl(REMOVE_DRAFT_ORDER(localStorage.getItem("collectionId"), DraftID), {
      "search": searchTerm.trim(),
      "type": TypeFilter,
      "sortBy": SortFilter
    }).then((res, err) => {
      if (res && res.status === 200) {
        if (res?.data?.isSuccess) {
          toast.success(`Draft Order Removed successfully`);
          setDraftOrderList(res.data.data);
          setModalRemove(false)
        } else {
          toast.error(res?.data?.message);
        }
      } else {
        toast.error("something went wrong !");
      }
    });
  };

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

            <th className={Style.H_Customer_Draft}>Customer</th>
            <th className={Style.H_Date_Draft}>Date</th>
            <th className={Style.H_Statuse_Draft}>Statuse</th>
            <th className={Style.H_Total_Draft}>Total</th>
            <th className={Style.H_Delete}></th>
            <th className={Style.H_Duplicate_Draft}></th>
            <th className={Style.H_View}></th>
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
              <tr className={Style.tableData_Draft} key={artist?.id}>
                <td className={Style.B_Check}>
                  <CheckBoxTable
                    artistId={artist?.id}
                    handleChange={handleChange}
                    artists={artists}
                    checked={artist?.isChecked}
                  />
                </td>

                <td className={Style.B_Customer_Draft}>
                  {artist.customerFullName}
                  <span className={Style.TypeArt}>{artist?.customerKnownas}</span>
                </td>

                <td className={Style.B_Date_Draft}>{artist?.date}</td>
                <td className={Style.B_Statuse_Draft}>{artist?.orderStatusName}</td>
                <td className={Style.B_Total_Draft}>{artist?.totalAmount}</td>
                <td className={Style.B_Delete_Draft}>
                  <IconButton onClick={() => {
                    setModalRemove(true);
                    localStorage.setItem("removing-item-name", artist?.orderNumber);
                    localStorage.setItem("removing-item-id", artist?.id);
                  }}>
                    <img src={trashSvg.src} />
                  </IconButton>
                </td>
                <td className={Style.B_Duplicate_Draft}>
                  <IconButton onClick={() => setModalArchive(true)}>
                    <img src={DuplicateSvg.src} />
                  </IconButton>
                </td>
                <td className={Style.B_View}>
                  <Button
                    color="primary"
                    className={Style.View}
                    endIcon={<img src={ArrowRightSvg.src} />}
                  >
                    View Order
                  </Button>
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
                      <Grid item className={Style.ChannelMobile2}>
                        {artist?.customerFullName} <span className={Style.TypeArt}>{artist?.customerKnownas}</span>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={Style.P_IconsMobile}>
                  <IconButton size="small" className={Style.PdfMobile} >
                    <img src={DuplicateSvg.src} />
                  </IconButton>
                  <IconButton size="small" onClick={() => {
                    setModalRemove(true);
                    localStorage.setItem("removing-item-name", artist?.orderNumber);
                    localStorage.setItem("removing-item-id", artist?.id);
                  }}>
                    <img src={trashSvg.src} />
                  </IconButton>
                </Grid>
              </Grid>
              <Grid item className={Style.InfoMobile}>
                <Grid item className={Style.CustomerMobile2}>
                  {artist?.date}

                </Grid>

                <Grid item className={Style.TotalMobile}>
                  {artist?.orderStatusName}{" "}
                  <span className={Style.TotalAmount}>{artist?.totalAmount}</span>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </>
      </Hidden>

      <RemoveItem
        hnadleRemove={handleRemoveDraftOrder}
        open={ModalRemove}
        handleModal={() => setModalRemove(false)}
      />
     
    </Grid>
  );
}
