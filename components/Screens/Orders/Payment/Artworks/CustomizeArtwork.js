import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../../styles/Orders.module.css";

// gm : files ↓
import PlsuSvg from "../../../../../public/images/icons/Plus Black.svg";
import PlsuBlueSvg from "../../../../../public/images/icons/Plus - Circle.svg";
import SendSvg from "../../../../../public/images/icons/Send.svg";

// gm : components ↓
import Table from "../../Main/Artworks/Table";
import SwitchComponent from "../../../../common/SwitchComponent";
import CustomSelect from "../../../../Forms/CustomSelect";
import ItemInfo from "./ItemInfo";
import TableArtwork from "../../common/TableArtwork";
import TableCheckBox from "./TableCheckBox";

export default function CustomizeArtwork({ IsEmpty = false }) {
  // gm : states ↓
  const [PaidOut, setPaidOut] = useState(false)

  return (
    <>
      {IsEmpty && (
        <Grid item className={Style.TextNoArt}>
          No artwork added yet
        </Grid>
      )}

      {/* Artworks */}
      {!IsEmpty && <TableCheckBox />}

      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        className={Style.P_Switch_2}
      >
        <Grid item className={Style.PaidText}>
           Paid outside of artiverse
        </Grid>
        <Grid item>
          <SwitchComponent Switch={PaidOut} setSwitch={setPaidOut}/>
        </Grid>
      </Grid>

      <Grid item className={Style.PaymentType}>
        <CustomSelect label="Payment type" />
      </Grid>

      <ItemInfo title="Sub-Total" value="$36.00"/>

      <ItemInfo title="Shipping" value="$36.00"/>

      <ItemInfo title="Tax" value="$36.00"/>

      <ItemInfo title="Total paid" value="$36.00" IsBold={true}/>


      
    </>
  );
}
