import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import PlsuSvg from "../../../../../public/images/icons/Plus Black.svg";

// gm : components ↓
import CustomizeArtwork from "../../common/CustomizeArtwork";
import AddArtWork from "../../../../Modals/Orders/AddArtwork/AddArtwork";
import CustomItem from "../../../../Modals/Orders/CustomItem";

// mrx : api links ↓
import { GET_MODAL_DATA } from "../../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../../pages/api/config";

export default function Artworks({
  handleAddOrder,
  SubTotal,
  setSubTotal,
  TotalAmount,
  AllData,
  setAllData,
  allDataForSelects,
  OrderItems,
  setPayedOutside,
  PayedOutside,
  // ---- discount ------ >
  TotalDiscount,
  setTotalDiscount,
  // ---- End discount ------ >

  // ---- Shipping ------ >
  TotalShipping,
  setTotalShipping,
  // ---- End Shipping ------ >

  // ---- Tax ------ >
  TotalTaxData,
  setTotalTaxData,
  // ---- End Tax ------ >
}) {
  // gm : states ↓
  const [ModalAddArtwork, setModalAddArtwork] = useState(false)
  const [ModalCustomItem, setModalCustomItem] = useState(false)

  const [ModalData, setModalData] = useState([]);
  const [LoadingListData, setLoadingListData] = useState(false);
  const [ModalType, setModalType] = useState(0);

  const handleGetModalData = (
    firstMenuItemSelected = null,
    selectedId = null,
    searchText = null,
    addedArtworks = [],
    isFirst = false,
  ) => {
    setLoadingListData(true);
    localStorage.setItem("Selected-Modal-id", firstMenuItemSelected);
    PostAuthUrl(GET_MODAL_DATA, {
      "firstMenuItemSelected": parseInt(firstMenuItemSelected),
      "selectedId": selectedId,
      "searchText": searchText,
      "addedArtworks": addedArtworks
    }).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            const Data = res.data.data;
            setModalType(Data?.menuStatus)
            setModalData(Data);
            setLoadingListData(false);
          } else {
            toast.error(res?.data?.message);
            setLoadingListData(false);
          }
        } else {
          toast.error("something went wrong !");
          setLoadingListData(false);
        }
      }
    );
  }

  const Modal_id =
    typeof window !== "undefined"
      ? localStorage.getItem("Selected-Modal-id") || ""
      : "";

  // useEffect(() => {
  //   if (ModalType === 0) {
  //     handleGetModalData(null, null, null, [], false)
  //   } else if (ModalType === 1) {
      
  //   }
  // }, [ModalType])

  return (
    <Grid item className={Style.Main_1}>
      <Grid item className={Style.TitleMain}>
        Artworks
      </Grid>
      <Grid container justifyContent="space-between">
        <Grid item className={Style.P_Btn}>
          <Button
            startIcon={<Image src={PlsuSvg} />}
            className={Style.BtnCustom}
            onClick={() => { setModalAddArtwork(true); handleGetModalData(null, null, null, [], false) }}
          >
            Brows Item
          </Button>
        </Grid>
        <Grid item className={Style.P_Btn_1}>
          <Button
            startIcon={<Image src={PlsuSvg} />}
            className={Style.BtnCustom}
            onClick={() => setModalCustomItem(true)}
          >
            Custom Item
          </Button>
        </Grid>
      </Grid>
      <CustomizeArtwork
        SubTotal={SubTotal}
        setSubTotal={setSubTotal}
        TotalAmount={TotalAmount}
        AllData={AllData}
        setAllData={setAllData}
        allDataForSelects={allDataForSelects}
        handleAddOrder={handleAddOrder}
        OrderItems={OrderItems}
        PayedOutside={PayedOutside}
        setPayedOutside={setPayedOutside}
        // ---- discount ------ >
        TotalDiscount={TotalDiscount}
        setTotalDiscount={setTotalDiscount}
        // ---- End discount ------ >

        // ---- Shipping ------ >
        TotalShipping={TotalShipping}
        setTotalShipping={setTotalShipping}
        // ---- End Shipping ------ >

        // ---- Tax ------ >
        TotalTaxData={TotalTaxData}
        setTotalTaxData={setTotalTaxData}
      // ---- End Tax ------ >
      />
      <AddArtWork
        open={ModalAddArtwork}
        handleModal={() => { setModalAddArtwork(false); }}
        AllData={AllData}
        setAllData={setAllData}
        ModalData={ModalData}
        setModalData={setModalData}
        LoadingListData={LoadingListData}
        setLoadingListData={setLoadingListData}
        setModalType={setModalType}
        ModalType={ModalType}
        handleGetModalData={handleGetModalData}
      />
      <CustomItem open={ModalCustomItem} handleModal={() => setModalCustomItem(false)}
        AllData={AllData}
        setAllData={setAllData}
        allDataForSelects={allDataForSelects}
      />

    </Grid>
  );
}
