import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Star.module.css";

// gm : files ↓
import PlsuSvg from "../../../../public/images/icons/Plus Black.svg";
import PlsuBlueSvg from "../../../../public/images/icons/Plus - Circle.svg";
import SendSvg from "../../../../public/images/icons/Send.svg";

// gm : components ↓
import Table from "./Table";
import SwitchComponent from "../../../common/SwitchComponent";
import ItemArtwork from "../Invoice/Artworks/ItemArtwork";

export default function CustomizeArtwork({ IsEmpty = false, EditBtn = false }) {
  // gm : states ↓
  const [Paid, setPaid] = useState(false);

  return (
    <>
      {IsEmpty && (
        <Grid item className={Style.TextNoArt}>
          No artwork added yet
        </Grid>
      )}

      {/* Artworks */}
      {!IsEmpty && <Table />}

      {/* Note: Style of Items is different, we cant turn them to a single component */}
      <Grid item className={Style.p_left}>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          className={Style.P_Switch_1}
        >
          <Grid item className={Style.PaidText}>
            {IsEmpty ? "Paid outside of artiverse" : "No paid yet"}
          </Grid>
          <Grid item>
            <SwitchComponent Switch={Paid} setSwitch={setPaid} />
          </Grid>
        </Grid>

        <ItemArtwork title="Discount" />

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
            $36.00
          </Grid>
        </Grid>

        <ItemArtwork title="Shipping" TextBtn="Add Shipping" IsGray={true} />

        <ItemArtwork title="Tax" TextBtn="Add Tax" EditBtn={true} />

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
            $36.00
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
