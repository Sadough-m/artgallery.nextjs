import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PlsuSvg from "../../../../public/images/icons/Plus Black.svg";
import PlsuBlueSvg from "../../../../public/images/icons/Plus - Circle.svg";
import SendSvg from "../../../../public/images/icons/Send.svg";

// gm : components ↓
import Table from "../Main/Artworks/Table";
import SwitchComponent from "../../../common/SwitchComponent";
import AddDiscount from "../../../Modals/Orders/AddDiscount";
import Confirmed from "../../../Modals/Orders/Confirmed";
import AddShippingAmount from "../../../Modals/Orders/AddShippingAmount";
import ItemArtwork from "./ItemArtwork";
import TaxOption from "../../../Modals/Orders/TaxOption";

// mrx : api links ↓
import { TOGGLE_Paied, DELETE_ITEM_ORDER } from "../../../../pages/api/index";

// mrx : api ↓
import {
  PostUrl,
  PostAuthUrl,
  GetUrl,
  GetAuthUrl,
  DeleteAuthUrl,
} from "../../../../pages/api/config";

export default function CustomizeArtwork({
  AllData,
  setAllData,
  allDataForSelects,
  SubTotal,
  setSubTotal,
  TotalAmount,
  OrderItems,
  handleAddOrder,
  EditBtn = false,
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
    // status for determine edit or add
    status='add'
}) {
    // console.log('OrderItems',OrderItems)
  // gm : states ↓
  const [Paid, setPaid] = useState(false);
  const [ModalDicount, setModalDicount] = useState(false);
  const [ModalConfirmed, setModalConfirmed] = useState(false);
  const [ModalShippingAmount, setModalShippingAmount] = useState(false);
  const [ModalTax, setModalTax] = useState(false);

  const [ToggleLoading, setToggleLoading] = useState(false);

  const handleSaveAsPaid = () => {
    setToggleLoading(true);
    GetAuthUrl(TOGGLE_Paied(AllData?.id)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            const Data = res.data.data;
            handleAddOrder(Data);
            setToggleLoading(false);
          } else {
            toast.error(res?.data?.message);
            setToggleLoading(false);
          }
        } else {
          toast.error("something went wrong !");
          setToggleLoading(false);
        }
      }
    );
  }

  const removeItem = (RemoveID) => {
    DeleteAuthUrl(DELETE_ITEM_ORDER(RemoveID)).then(
      (res, err) => {
        if (res && res.status === 200) {
          if (res?.data?.isSuccess) {
            const Data = res.data.data;
            handleAddOrder(Data);
            toast.info("Item removed.");
          } else {
            toast.error(res?.data?.message);
          }
        } else {
          toast.error("something went wrong !");
        }
      }
    );
  }

  return (
    <>
      {!OrderItems?.length && (
        <Grid item className={Style.TextNoArt}>
          No artwork added yet
        </Grid>
      )}

      {/* Artworks */}
      {OrderItems?.length ? <Table removeItem={removeItem} OrderItems={OrderItems} /> : <></>}

      {/* Note: Style of Items is different, we cant turn them to a single component */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_Switch_1}
      >
        <Grid item className={Style.PaidText}>
          {OrderItems?.length ? "Paid outside of artiverse" : "No paid yet"}
        </Grid>
        <Grid item>
          <SwitchComponent
            Switch={PayedOutside}
            setSwitch={handleSaveAsPaid}
            disabled={ToggleLoading}
          />
        </Grid>
      </Grid>

      {/* Items */}
      {!PayedOutside ? (
        <>
          <Grid
            container
            justifyContent="space-between"
            alignItems="center"
            className={Style.P_ArtworkSec_3}
          >
            <Grid item className={Style.ItemTitle}>
              Invoice : <span style={{ color: "black" }}>Not sent</span>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                onClick={() => toast.info("Please add draft order first")}
                startIcon={<Image src={SendSvg} />}
                className={Style.fitBtn}
              >
                Send Invoice
              </Button>
            </Grid>
          </Grid>
        </>
      ) : (<></>)}

      <ItemArtwork
        Total={TotalDiscount}
        setTotal={setTotalDiscount}
        title="Discount"
        HandleModal={() => setModalDicount(true)}
        disabled={!OrderItems?.length}
      />

      {/* Items */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ArtworkSec_1}
      >
        <Grid item className={Style.Discount}>
          Sub-Total
        </Grid>
        <Grid item className={Style.price}>
          {SubTotal == 0 ? "$" + SubTotal : SubTotal}
        </Grid>
      </Grid>

      <ItemArtwork
        title="Shipping"
        TextBtn="Add Shipping"
        HandleModal={() => setModalShippingAmount(true)}
        IsGray={true}
        Total={TotalShipping}
        setTotal={setTotalShipping}
        disabled={!OrderItems?.length}
      />

      <ItemArtwork
        title="Tax"
        TextBtn="Add Tax"
        HandleModal={() => setModalTax(true)}
        Total={TotalTaxData}
        setTotal={setTotalTaxData}
        disabled={!OrderItems?.length}
      />

      {/* Items */}
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_ArtworkSec_2}
      >
        <Grid item className={Style.TotalPaid}>
          Total paid
        </Grid>
        <Grid item className={Style.price_1}>
          {TotalAmount == 0 ? "$" + TotalAmount : TotalAmount}
        </Grid>
      </Grid>
      <AddDiscount
        open={ModalDicount}
        handleModal={() => {
          // OrderItems(AllData.id)
          setModalDicount(false)
        }}
        AllData={AllData}
        setAllData={setAllData}
        allDataForSelects={allDataForSelects}
        handleSaveAsPaid={handleSaveAsPaid}
      />
      <Confirmed
        open={ModalConfirmed}
        handleModal={() => setModalConfirmed(false)}

      />
      <AddShippingAmount
        open={ModalShippingAmount}
        handleModal={() => setModalShippingAmount(false)}
        AllData={AllData}
        setAllData={setAllData}
      />

      <TaxOption AllData={AllData}
        setAllData={setAllData} open={ModalTax} handleModal={() => setModalTax(false)} />
    </>
  );
}
