import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// gm : material ui ↓
import { ClickAwayListener, Grid } from "@material-ui/core";

// gm : styles ↓
import Style from "../../../../styles/Orders.module.css";

// gm : files ↓
import ArrowDownSvg from "../../../../public/images/icons/ArrowDown.svg";
import ArrowUpSvg from "../../../../public/images/icons/ArrowUpBlack.svg";

// gm : components ↓

export default function CommentType() {
  // gm : states ↓
  const [OpenOption, setOpenOption] = useState(false);
  const [SelectedOption, setSelectedOption] = useState("Private");

  // Open and close List Of Options for selecting
  const handleOption = () => {
    setOpenOption(!OpenOption);
  };

  const CloseOption = () => {
    setOpenOption(false);
  };

  // select option
  const SelectOption = (value) => {
    setSelectedOption(value);
    CloseOption();
  };

  // return background color
  const StyleBG = () => {
    if (SelectedOption === "Private") {
      return "#A6E9DE";
    } else if (SelectedOption === "Team") {
      return "#FED6CC";
    } else if (SelectedOption === "Shared") {
      return "#EEF0F3";
    } else return "#A6E9DE";
  };
  return (
    <Grid item className={Style.WrapperComment}>
      <Grid
        item
        className={OpenOption ? Style.CommentType_active : Style.CommentType}
        onClick={() => handleOption()}
        style={{ backgroundColor: StyleBG() }}
      >
        {SelectedOption.substring(0, 1)}{" "}
        <img
          src={OpenOption ? ArrowUpSvg.src : ArrowDownSvg.src}
          className={Style.ArrowSvg}
        />
      </Grid>
      {OpenOption && (
        <ClickAwayListener onClickAway={CloseOption}>
          <Grid item className={Style.Options}>
            <Grid
              item
              className={Style.Option}
              onClick={() => SelectOption("Private")}
            >
              <span className={Style.CircleGreen}></span>Private
            </Grid>
            <Grid
              item
              className={Style.Option}
              onClick={() => SelectOption("Team")}
            >
              <span className={Style.CircleOrange}></span>Team
            </Grid>
            <Grid
              item
              className={Style.Option}
              onClick={() => SelectOption("Shared")}
            >
              <span className={Style.CircleGray}></span>Shared
            </Grid>
          </Grid>
        </ClickAwayListener>
      )}
    </Grid>
  );
}
