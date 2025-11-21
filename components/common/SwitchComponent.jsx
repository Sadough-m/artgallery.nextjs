import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { Grid, IconButton, Switch } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

// gm : styles ↓

// gm : files ↓
import lockIcon from "../../public/images/icons/Lock Gray.svg";

// gm : components ↓

// customize switch mui ↓
const AntSwitch = withStyles((theme) => ({
  root: {
    width: 44,
    height: 24,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    padding: '1.5px 1.8px',
    top: 0.28,
    left: 0.2,
    color: theme.palette.common.white,
    "&$checked": {
      transform: "translateX(20.5px)",
      color: theme.palette.common.white,
      "& + $track": {
        opacity: 1,
        backgroundColor: "#3772FF",
        borderColor: theme.palette.primary.main,
      },
    },
  },
  thumb: {
    width: 20,
    height: 20,
    boxShadow: "none",
  },
  track: {
    border: `1px solid ${theme.palette.grey[500]}`,
    borderRadius: 50,
    opacity: 1,
    backgroundColor: "#A8B3BC",
  },
  checked: {},
}))(Switch);

export default function SwitchComponent({ disabled = false, haveLock = false, setSwitch, Switch }) {
  // gm : states ↓

  // change switch
  const handleChange = () => {
    setSwitch(!Switch);
  };

  return (
    <Grid item>
      <Grid container alignItems="center">
        {haveLock && (
          <Grid item>
            <IconButton size="small" style={{ marginRight: "5px" }}>
              <Image src={lockIcon} />
            </IconButton>
          </Grid>
        )}

        <Grid item>
          <AntSwitch disabled={disabled} checked={Switch} onChange={handleChange} />
        </Grid>
      </Grid>
    </Grid>
  );
}
