import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PlusSvg from "../../../../public/images/icons/Plus - Circle white.svg";
import PaidSvg from "../../../../public/images/icons/Paid.svg";

// gm : components ↓
import useWindowSize from "../../../../Hooks/useWindowSize";
import Table from "./Table";
import Information from "./Infomation";

export default function Payment({
  EmptyPaymentList = false,
  HaveTitle = true,
  HaveList = true,
}) {
  // gm : states ↓

  const [width, height] = useWindowSize()
  return (
    <Grid item className={Style.PaymentPending} style={{display: !HaveTitle && !HaveList   ? 'none':'block' }}>
      {/* title */}
      {HaveTitle && (
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item className={Style.TitlePending}>
            Payment pending
          </Grid>
          <Grid item className={Style.P_MakePayment}>
            <Link href="/orders/createpayment">
              <Button
                variant="contained"
                color="primary"
                startIcon={<Image src={PlusSvg} />}
                className={Style.ButtonPayment}
              >
                Make a Payment
              </Button>
            </Link>
            <Button
              startIcon={<Image src={PaidSvg} />}
              className={Style.ButtonMarkPaid}
            >
              Mark as Paid
            </Button>
          </Grid>
        </Grid>
      )}

      {/* Payment List */}
      {HaveList && (
        <Grid item className={Style.PaymentList}>
          {EmptyPaymentList && (
            <Grid item className={Style.EmptyPaymentList}>
              No payment record for this order.
            </Grid>
          )}
          {!EmptyPaymentList && <Table />}

          {EmptyPaymentList && <Information title="Total paid" value="0.00" />}

          {!EmptyPaymentList && (
            <>
              <Information title="Sub total" value="36.00" />

              <Information title="Shipping" value="36.00" />

              <Information title="Tax" value="36.00" />

              <Information title="Total paid" value="36.00" />

              <Information title="Refunded" value="36.00" />

              <Information title="Net" value="36.00" />

              <Information
                title="Total payment made"
                value="36.00"
                active={true}
              />
            </>
          )}
        </Grid>
      )}
    </Grid>
  );
}
