import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓

// gm : components ↓

export default function Summary({ HaveItem = false, FulfillBtn, RefundBtn }) {
  // gm : states ↓

  return (
    <Grid item className={Style.Summary}>
      <Grid item className={Style.TitleSummary}>
        Summary
      </Grid>
      <Grid item className={Style.WrapperSummary}>
        {!HaveItem && (
          <>
            <Grid item className={Style.NoItem}>
              No item <span className={Style.TxtSelected}>selected</span>
            </Grid>
            <Grid item className={Style.PaymentText}>
              Selected payments will be archived for this order.
            </Grid>
          </>
        )}
        {HaveItem && (
          <>
            <Grid item className={Style.ItemSummary}>
              Fulfilling from “{" "}
              <span style={{ color: "#242328" }}>Location</span> “
            </Grid>
            <Grid item className={Style.ItemSummary}>
              <span style={{ color: "#242328" }}>1/2 items</span> selected
            </Grid>
            <Grid
              container
              justifyContent="space-between"
              className={Style.ItemSummary_1}
            >
              <Grid item className={Style.Total}>
                Total
              </Grid>
              <Grid item className={Style.TotalPrice}>
                $90.00
              </Grid>
            </Grid>
          </>
        )}
        {false && <Button className={Style.BuyLabel}>Buy Lable</Button>}
        {!HaveItem && !FulfillBtn && false && (
          <Button className={Style.PaymentBtn} disabled>
            Payment
          </Button>
        )}
        {FulfillBtn && <Button className={Style.BuyLabel}>Fulfill</Button>}
        {RefundBtn && <Button className={Style.RefundBtn}>Refund</Button>}
      </Grid>
    </Grid>
  );
}
