import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Router, useRouter } from "next/router";
import Joi from "joi";
import { toast } from "react-toastify";

// gm : material ui ↓
import { Grid, Hidden, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓
import Tags from "../../../../components/Screens/Orders/Saved/Tags";
import Icons from "../../../../components/Screens/Orders/Saved/Icons";
import PaymentStatuse from "../../../../components/Screens/Orders/PaymentStatuse";
import Artworks from "../../../../components/Screens/Orders/Saved/Artworks";
import Note from "../../../../components/Screens/Orders/Saved/Note";
import Profile from "../../../../components/Screens/Orders/Saved/Profile/Profile";
import NavBarMobile from "../../../../components/Screens/Orders/common/NavBarMobile";

// mrx : api links ↓
import {Get_Add_Draft_Order_Data, Get_Order_Data} from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
} from "../../../../pages/api/config";
import getCollectionId from "../../../../Hooks/getCollectionId";

export default function SavedOrder() {
  const router = useRouter();

  // gm : states ↓
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


  // States of the Tags Start ----------------------------------------------------------------------
  const [TagList, setTagList] = useState([]);
  // ----- draft order data Data -------->
  const [draftOrderData, setDraftOrderData] = useState({});
  const [DraftOrderID, setDraftOrderID] = useState("");
  const [allDataForSelect, setAllDataForSelect] = useState("");

  // ----- draft order data Data -------->

  useEffect(() => {
    if (router.asPath !== router.route) {
      const { DraftOrderID } = router.query;
      setDraftOrderID(DraftOrderID);
      getDraftData(DraftOrderID);
      getAllCurrencyDetail()
    }
  }, [router]);

  // sa: get all currency detail
  const getAllCurrencyDetail = () => {
    GetAuthUrl(Get_Add_Draft_Order_Data(getCollectionId())).then(
        (res, err) => {
          if (res && res.status === 200) {
            if (res?.data?.isSuccess) {

              setAllDataForSelect(res.data.data)
            } else {
              // setSearchResult([]);
            }
          } else {
            toast.error("something went wrong !");
          }
        }
    );
  }



  // sa: get all currency detail
  const getDraftData = (OrderID) => {
    GetAuthUrl(Get_Order_Data(OrderID)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            setDraftOrderData(res.data.data);
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  }

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
    setTotalTaxData(Data?.totalTax && Data?.totalTax)
    // ----- End totalTax Data ------->
  }

  useEffect(() => {
    getDraftData()
    getAllCurrencyDetail()

    // console.log('AllDataForSelect',allDataForSelect)
    // console.log('OrderItems',OrderItems)
  }, [])
  useEffect(() => {

    handleAddOrder(draftOrderData);
    // console.log('use effect all data',draftOrderData)

  }, [draftOrderData])
  return (
    <Grid item>

      <Grid container justifyContent="center" className={Style.wrapper_saved}>
        {/* left side */}
        <Grid item className={Style.LeftSide_saved}>
          <NavBarMobile title="order #001" />

          {/* components */}
          <Grid item >
            <Hidden smDown>
              <PaymentStatuse
                status="edit"
                AllData={draftOrderData}
              />
            </Hidden>
            <Artworks
                SubTotal={SubTotal}
                setSubTotal={setSubTotal}
                TotalAmount={TotalAmount}

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

              AllData={draftOrderData}
              setAllData={setDraftOrderData}
                allDataForSelects={allDataForSelect}
              effectedDraftOrderId={DraftOrderID}
            />
            <Hidden mdUp>
              <Tags
                AllData={draftOrderData}
              />
            </Hidden>
            <Note
              AllData={draftOrderData}
            />
          </Grid>

        </Grid>

        {/* right side */}
        <Grid item className={Style.RightSide_saved}>
          <Grid item className={Style.C_RightSide_saved}>
            <Hidden mdUp>
              <PaymentStatuse
                AllData={draftOrderData}
              />
            </Hidden>
            <Hidden smDown>
              <Icons
                AllData={draftOrderData}
              />
            </Hidden>
            <Profile
              AllData={draftOrderData}
            />
            <Hidden smDown>
              <Tags
                AllData={draftOrderData}
              />
            </Hidden>

          </Grid>
        </Grid>
      </Grid>

    </Grid>
  );
}
