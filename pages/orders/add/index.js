import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Joi from "joi";
import { toast } from "react-toastify";

// gm : material ui ↓
import { Button, Grid, Hidden, IconButton } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// gm : styles ↓
import Style from "../../../styles/Orders.module.css";

// gm : files ↓
import CloseIcon from "../../../public/images/icons/Close icon.svg";
import arrowLeft from "../../../public/images/icons/Arrow left -.svg";

// gm : components ↓
import PaymentStatuse from "../../../components/Screens/Orders/Main/PaymentStatuse";
import Note from "../../../components/Screens/Orders/Main/Note";
import Tags from "../../../components/Screens/Orders/Main/Tags";
import SellTo from "../../../components/Screens/Orders/Main/SellTo";
import Artworks from "../../../components/Screens/Orders/Main/Artworks/Artworks";

// mrx : setCookies with this
import Cookies from "js-cookie";

// mrx : api links ↓
import { START_NEW_ORDER, Get_Add_Draft_Order_Data } from "../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../pages/api/config";

// mrx : context ↓
import { Context } from "../../../context/index";
import getCollectionId from "../../../Hooks/getCollectionId";

export default function Add() {
  // mrx : states Start -------------------------------------------------------------------------------- 
  // mrx : context
  const {
    LoadingPage,
    setLoadingPage
  } = useContext(Context);

  const [AllData, setAllData] = useState([]);
  const [OrderID, setOrderID] = useState("");
  const [AddedArtist, setAddedArtist] = useState([]);
  const [OrderItems, setOrderItems] = useState({});
  const [PayedOutside, setPayedOutside] = useState(false);
  const [Notes, setNotes] = useState([]);
  const [TotalAmount, setTotalAmount] = useState("");
  const [SubTotal, setSubTotal] = useState("");

  // ----- discount Data ------->
  const [Discount, setDiscount] = useState({});
  const [TotalDiscount, setTotalDiscount] = useState("");
  // ----- End Data -------->

  // ----- Shipping Data ------->
  const [Shipping, setShipping] = useState({});
  const [TotalShipping, setTotalShipping] = useState("");
  // ----- End Data -------->

  // ----- Tax Data ------->
  const [TaxData, setTaxData] = useState({});
  const [TotalTaxData, setTotalTaxData] = useState("");
  // ----- End Data -------->

  // ----- Note Data ------->
  const [PrivateNoteData, setPrivateNoteData] = useState([]);
  const [publicValueData, setPublicValueData] = useState([]);
  // ----- Note Data -------->

  // ----- draft order data Data -------->
  const [draftOrderData, setDraftOrderData] = useState({});

  // ----- draft order data Data -------->

  // States of the Tags Start ----------------------------------------------------------------------
  const [TagList, setTagList] = useState([]);
  // End -------------------------------------------------------------------------------------------

  // mrx : End -----------------------------------------------------------------------------------------

  // sa: get all currency detail
  const getAllCurrencyDetail = () => {
    GetAuthUrl(Get_Add_Draft_Order_Data(getCollectionId())).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {

            setDraftOrderData(res.data.data)
          } else {
            setSearchResult([]);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  }
  // sa: get all data
  const StartNewDraft = () => {
    GetAuthUrl(START_NEW_ORDER).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            const Data = res.data.data;
            setAllData(Data);
          } else {
            setSearchResult([]);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  }
  useEffect(() => {
    StartNewDraft()
    getAllCurrencyDetail()
  }, [])

  useEffect(() => {
    handleAddOrder(AllData);

  }, [AllData])

  const handleAddOrder = (Data) => {
    setOrderID(Data?.id);
    setPayedOutside(Data?.paidOutSide);
    setOrderItems(Data?.orderItems);
    setAddedArtist(Data?.customerInfo && [{
      id: Data?.customerInfo?.userId,
      name: Data?.customerInfo?.name,
      image: Data?.customerInfo?.image,
    }]);
    // note sTart ============ >
    let prvNote = AllData?.notes?.filter(
      (note) => note?.privacyType === 1
    )[0];
    let pubNote = AllData?.notes?.filter(
      (note) => note?.privacyType === 2
    )[0];
    setPrivateNoteData(prvNote === null ? "" : prvNote);
    setPublicValueData(pubNote === null ? "" : pubNote);
    // note End ============ >
    setTotalAmount(Data?.totalAmount && Data?.totalAmount)
    setSubTotal(Data?.subTotal && Data?.subTotal);

    // ----- disconnect Data ------->
    setTotalDiscount(Data?.totalDiscount && Data?.totalDiscount)
    // ----- End disconnect Data ------->

    // ----- Shipping Data ------->
    setTotalShipping(Data?.totalShipping && Data?.totalShipping)
    // ----- End Shipping Data ------->

    // ----- totalTax Data ------->
    setTaxData(Data?.totalTax && Data?.totalTax)
    // ----- End totalTax Data ------->
  }

  // Notes ------------------------------------------------------------------------------------------------------- >

  return (
    <Grid item>
      {/* mobile navbar */}
      <Hidden mdUp>
        <Grid
          container
          justifyContent="space-between"
          alignItems='center'
          className={Style.mobileNav}
        >
          <Grid item className={Style.textAdd}>
            <IconButton size="small" className={Style.iconBtn}>
              <img src={arrowLeft.src} />
            </IconButton>
            Add draft order
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" className={Style.addBtn}>
              Add Draft Order
            </Button>
          </Grid>
        </Grid>
      </Hidden>

      {/* start add contact */}
      <Grid
        container
        justifyContent="space-between"
        className={Style.wrapper_add}
      >
        {/* left side */}
        <Hidden smDown>
          <Grid item className={Style.leftSide_Add}>
            Add draft order
          </Grid>
        </Hidden>

        {/* Main */}
        <Grid item className={Style.Middle_Add}>
          <PaymentStatuse />
          <SellTo
            AddedArtistList={AddedArtist}
            setAddedArtistList={setAddedArtist}
            handleAddOrder={handleAddOrder}
            AllData={AllData}
          />
          <span id="AddItem"></span>


          <Artworks
            SubTotal={SubTotal}
            setSubTotal={setSubTotal}
            TotalAmount={TotalAmount}
            AllData={AllData}
            setAllData={setAllData}
            DraftOrderData={draftOrderData}
            handleAddOrder={handleAddOrder}
            OrderItems={OrderItems}
            setOrderItems={setOrderItems}
            PayedOutside={PayedOutside}
            setPayedOutside={setPayedOutside}
            // discount ----->
            TotalDiscount={TotalDiscount}
            setTotalDiscount={setTotalDiscount}
            // End discount ----->

            // Shipping ----->
            TotalShipping={TotalShipping}
            setTotalShipping={setTotalShipping}
            // End Shipping ----->

            // Tax ----->
            TotalTaxData={TotalTaxData}
            setTotalTaxData={setTotalTaxData}
          // End Tax ----->

          />
          <Note
            AllData={AllData}
            setPrivateNoteData={setPrivateNoteData}
            PrivateNoteData={PrivateNoteData}
            PublicValueData={publicValueData}
            setPublicValueData={setPublicValueData}
          />
          <Tags
            setTagList={setTagList}
            TagList={TagList}
            AllData={AllData}
          />
        </Grid>

        {/* right side */}
        <Hidden smDown>
          <Grid item className={Style.rightSide_Add}>
            <Grid item className={Style.p_buttons}>
              <Button
                startIcon={<img src={CloseIcon.src} />}
                className={Style.discardBtn}
              >
                Discard
              </Button>
              <Button
                variant="contained"
                color="primary"
                startIcon={<CheckIcon />}
                className={Style.addContact}
              >
                Add Draft Order
              </Button>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>

    </Grid>
  );
}
