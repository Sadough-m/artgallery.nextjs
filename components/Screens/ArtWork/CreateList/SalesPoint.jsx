import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/artworkflow.module.css";

// gm : files ↓
import editSvg from "../../../../public/images/icons/Edit.svg";
import CustomCheckBox from "../../../Forms/CustomCheckBox";

// gm : components ↓

export default function SalesPoint() {
  // gm : states ↓

  return (
    <Grid item className="posRel">
      {/* title */}
      <Grid item className={Style.salesPointText}>
        Sales point
      </Grid>
      <Button
        color="primary"
        startIcon={<Image src={editSvg} />}
        className={Style.editBtn_1}
      >
        Edit
      </Button>

      {/* Sale Points */}
      <Grid item className={Style.wrapper_checkBoxes}>
        <Grid item className={Style.itemCheckBox}>
          <CustomCheckBox label="Marketplace 01" />
        </Grid>
        <Grid item className={Style.itemCheckBox}>
          <CustomCheckBox label="Marketplace 01" />
        </Grid>
        <Grid item className={Style.itemCheckBox}>
          <CustomCheckBox label="Marketplace 01" />
        </Grid>
      </Grid>
    </Grid>
  );
}
