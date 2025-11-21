import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import AddSvg from "../../../../public/images/icons/Plus Black.svg";
import SearchSvg from "../../../../public/images/icons/Search.svg";
import CustomizeArtwork from "../common/CustomizeArtwork";

// gm : components ↓
import AddArtWork from "../../../Modals/Orders/AddArtwork/AddArtwork";
import CustomItem from "../../../Modals/Orders/CustomItem";
import {PostAuthUrl} from "../../../../pages/api/config";
import {GET_MODAL_DATA} from "../../../../pages/api";
import {toast} from "react-toastify";

export default function Artworks({ handleAddOrder,
                                   SubTotal,
                                   setSubTotal,
                                   TotalAmount,
                                   AllData,
                                   setAllData,
                                   DraftOrderData,
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
                                   effectedDraftOrderId,
                                   allDataForSelects})
{
    // console.log('allDataForSelects',allDataForSelects)
    // console.log('OrderItems',OrderItems)

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
  return (
    <Grid item className={Style.Artworks}>
      <Grid item className={Style.TitleArtworks}>
        Artworks
      </Grid>
      <Grid item className={Style.ArtworksContainer}>
        <Grid container justifyContent="space-between">
          <Grid item className={Style.P_Search}>
            <input
              type="search"
              className={Style.SearchInput}
              placeholder="Search contact"
            />
            <img src={SearchSvg.src} className={Style.SearchSvg} />
          </Grid>
          <Grid item className={Style.P_BrowsItem}>
            <Grid container justifyContent="space-between">
              <Grid item className={Style.P_brose}>
                <Button
                  startIcon={<Image src={AddSvg} />}
                  className={Style.BrowsItem}
                  onClick={() => { setModalAddArtwork(true); handleGetModalData(null, null, null, [], false) }}
                >
                  Brows Item
                </Button>
              </Grid>
              <Grid item className={Style.P_brose}>
                <Button
                  startIcon={<Image src={AddSvg} />}
                  className={Style.BrowsItem}
                  onClick={() => setModalCustomItem(true)}
                >
                  Custom Item
                </Button>
              </Grid>
            </Grid>
          </Grid>

          <CustomizeArtwork
              SubTotal={SubTotal}
              setSubTotal={setSubTotal}
              TotalAmount={TotalAmount}
              AllData={AllData}
              setAllData={setAllData}
              allDataForSelects={allDataForSelects}
              status='edit'
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
          />
        </Grid>
      </Grid>
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
      <CustomItem
          open={ModalCustomItem} handleModal={() => setModalCustomItem(false)}
          AllData={AllData}
          setAllData={setAllData}
          allDataForSelects={allDataForSelects}
      />
    </Grid>
  );
}
