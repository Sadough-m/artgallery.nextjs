import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import PdfSvg from "../../../../public/images/icons/PDF.svg";

// gm : components ↓

export default function Table() {
  // gm : states ↓

  return (
    <Grid item className={Style.TableOrders}>
      {/* Header */}
      <Grid item className={Style.PTable}>
        <Grid container className={Style.TitleTable}>
          <Grid item className={Style.TableTitle_1}>
            Payment
          </Grid>
          <Grid item className={Style.TableTitle_2}>
            Date
          </Grid>
          <Grid item className={Style.TableTitle_3}>
            Cost
          </Grid>
          <Grid item className={Style.TableTitle_4}></Grid>
        </Grid>

        {/* Start Body */}
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={Style.RowTable}
        >
          <Grid item className={Style.TableBody_1}>
            Payment #001
          </Grid>
          <Grid item className={Style.TableBody_2}>
            28/10/2021
          </Grid>
          <Grid item className={Style.TableBody_3}>
            $18.00
          </Grid>
          <Grid item className={Style.TableBody_4}>
            <IconButton>
              <Image src={PdfSvg} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          className={Style.RowTable}
        >
          <Grid item className={Style.TableBody_1}>
            Payment #001
          </Grid>
          <Grid item className={Style.TableBody_2}>
            28/10/2021
          </Grid>
          <Grid item className={Style.TableBody_3}>
            $18.00
          </Grid>
          <Grid item className={Style.TableBody_4}>
            <IconButton>
              <Image src={PdfSvg} />
            </IconButton>
          </Grid>

          <span className={Style.LineBug}></span>
        </Grid>
      </Grid>
      {/* End Body */}
    </Grid>
  );
}
