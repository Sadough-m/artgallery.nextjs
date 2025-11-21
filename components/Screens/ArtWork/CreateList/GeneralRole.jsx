import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Button, Grid, IconButton } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/artworkflow.module.css";

// gm : files ↓
import circleIcon from "../../../../public/images/icons/Plus - Circle.svg";
import trashGraySvg from "../../../../public/images/icons/Trash gray.svg";

// gm : components ↓
import InputForm from "../../../Forms/InputForm";
import CustomSelect from "../../../Forms/CustomSelect";
import Info from "../Info";
import SelectList from "./SelectList";

export default function GeneralRole() {
  // gm : states ↓
  const [Manual, setManual] = useState(false);

  return (
    <Grid item className={Style.wrapper_main}>
      <Grid item className={Style.title_main}>
        General
      </Grid>

      {/* Buttons */}
      <Grid
        container
        justifyContent="space-between"
        style={{ marginTop: "15px" }}
      >
        <Grid item>
          <Button
            color={Manual ? "secondary" : "default"}
            variant={Manual ? "contained" : ""}
            onClick={() => setManual(true)}
            className={Manual ? Style.Btn_manual : Style.Btn_manual_border}
          >
            Manual
          </Button>
          <Button
            color={!Manual ? "secondary" : "default"}
            variant={!Manual ? "contained" : ""}
            onClick={() => setManual(false)}
            className={!Manual ? Style.Btn : Style.Btn_deactive}
          >
            Automation
          </Button>
        </Grid>
        <Grid item>
          <Info>Hello put some text here</Info>
        </Grid>
      </Grid>

      {/* AutoMation area */}
      {Manual && (
        <Grid
          container
          alignItems="center"
          justifyContent="center"
          className={Style.autoMationArea}
        >
          <Grid item className={Style.toggleText}>
            Toggle to set-up automation
          </Grid>
        </Grid>
      )}

      {!Manual && (
        <Grid item className={Style.wrapper_automation}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item className={Style.fs14fw500}>
              Artwork most
            </Grid>
            <Grid item className={Style.addRole}>
              <Button color="primary" startIcon={<Image src={circleIcon} />}>
                Add Rule
              </Button>
            </Grid>
          </Grid>
          <Grid item className={Style.p_selectList}>
            <SelectList />
            <SelectList />
          </Grid>
        </Grid>
      )}
    </Grid>
  );
}
