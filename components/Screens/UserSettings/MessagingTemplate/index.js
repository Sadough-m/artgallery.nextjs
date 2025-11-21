import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/UserSettings.module.css";

// gm : files ↓
import plusCircleSvg from "../../../../public/images/icons/Plus - Circle white.svg";

// gm : components ↓
import Template from "./Template";
import AddTemplate from "../../../Modals/UserSettings/AddTemplate";

export default function MessaginTemplate({isEmpty = false}) {
  // gm : states ↓
  const [ModalAddTemplate, setModalAddTemplate] = useState(false);

  return (
    <Grid item>
      {/* title  */}
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item className="fs16fw500">
        Messaging template
        </Grid>
        <Grid item className={Style.p_btnEmailList}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<Image src={plusCircleSvg} />}
            className={Style.CreateLocation}
            onClick={() => setModalAddTemplate(true)}
          >
            Add Template 
          </Button>
        </Grid>
      </Grid>

      {/* Template List  */}
      <Grid item className={isEmpty ? Style.EmptyLocation : ""}>
        {isEmpty && "No message template added yet"}
        {!isEmpty && (
          <Grid container alignItems="center" justifyContent="space-between">
            <Template />
            <Template />
            <Template />
            <Template />
          </Grid>
        )}
      </Grid>

      {/* modal add new Template */}
      <AddTemplate
        open={ModalAddTemplate}
        handleModal={() => setModalAddTemplate(false)}
      />
    </Grid>
  );
}
